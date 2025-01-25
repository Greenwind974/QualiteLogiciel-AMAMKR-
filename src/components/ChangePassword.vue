<script>
import {getAuth, updatePassword} from "firebase/auth";

export default {
  data() {
    return {
      formData: {
        showPassword: false,
        showPassword2: false,
        newPassword: "",
        confirmPassword: ""
      },
      rules: {
        minLength: (min) => (value) =>
            (value && value.length >= min) || `Minimum ${min} caractères.`,
        minOneUpper: (value) =>
            (value && (value.match(/[A-Z]/g) || []).length >= 1) || "Minimum 1 majuscule",
        minOneLower: (value) =>
            (value && (value.match(/[a-z]/g) || []).length >= 1) || "Minimum 1 minuscule",
        minOneNumber: (value) =>
            (value && (value.match(/[0-9]/g) || []).length >= 1) || "Minimum 1 chiffre",
        minOneSpecialChar: (value) =>
            (value && (value.match(/[@?!#$%^&*()_+\-=[\]{};':"\\|,.<>/]/g) || []).length >= 1) ||
            "Minimum 1 caractère spécial"
      },
      errors: {
        // Error for first field
        allError: null,
        // Error for second field
        allError2: null
      }
    }
  },
  methods: {

    // -------- METHODS FOR FIRST FIELD ---------------

    // Show or hide eye button
    toggleShow() {
      this.formData.showPassword = !this.formData.showPassword;
    },
    minLengthRule() {
      const rule = this.rules.minLength(8);
      const result = rule(this.formData.newPassword);
      return result === true ? null : result;
    },
    minOneUpperRule() {
      const result = this.rules.minOneUpper(this.formData.newPassword);
      return result === true ? null : result;
    },
    minOneLowerRule() {
      const result = this.rules.minOneLower(this.formData.newPassword);
      return result === true ? null : result;
    },
    minOneNumberRule() {
      const result = this.rules.minOneNumber(this.formData.newPassword);
      return result === true ? null : result;
    },
    minOneSpecialCharRule() {
      const result = this.rules.minOneSpecialChar(this.formData.newPassword);
      return result === true ? null : result;
    },
    // Verifying all the rules at the same time
    allRules() {
      // Initialise rules
      const minLengthRule = this.minLengthRule();
      const minOneUpperRule = this.minOneUpperRule();
      const minOneLowerRule = this.minOneLowerRule();
      const minOneNumberRule = this.minOneNumberRule();
      const minOneSpecialCharRule = this.minOneSpecialCharRule();
      // Get rules applied
      const result = minLengthRule || minOneUpperRule || minOneLowerRule || minOneNumberRule || minOneSpecialCharRule;
      this.errors.allError = result === true ? null : result;
    },

    // -------- METHODS FOR SECOND FIELD ---------------

    toggleShow2() {
      this.formData.showPassword2 = !this.formData.showPassword2;
    },
    minLengthRule2() {
      const rule = this.rules.minLength(8);
      const result = rule(this.formData.confirmPassword);
      return result === true ? null : result;
    },
    minOneUpperRule2() {
      const result = this.rules.minOneUpper(this.formData.confirmPassword);
      return result === true ? null : result;
    },
    minOneLowerRule2() {
      const result = this.rules.minOneLower(this.formData.confirmPassword);
      return result === true ? null : result;
    },
    minOneNumberRule2() {
      const result = this.rules.minOneNumber(this.formData.confirmPassword);
      return result === true ? null : result;
    },
    minOneSpecialCharRule2() {
      const result = this.rules.minOneSpecialChar(this.formData.confirmPassword);
      return result === true ? null : result;
    },
    // Verifying all the rules at the same time
    allRules2() {
      // Initialise rules
      const minLengthRule = this.minLengthRule2();
      const minOneUpperRule = this.minOneUpperRule2();
      const minOneLowerRule = this.minOneLowerRule2();
      const minOneNumberRule = this.minOneNumberRule2();
      const minOneSpecialCharRule = this.minOneSpecialCharRule2();
      // Get rules applied
      const result = minLengthRule || minOneUpperRule || minOneLowerRule || minOneNumberRule || minOneSpecialCharRule;
      this.errors.allError2 = result === true ? null : result;
    },

    // -------- METHODS FOR BUTTON ---------------

    // Verifiy the two password entries are the same
    passwordsAreTheSame(newPassword, confirmPassword) {
      return newPassword === confirmPassword;
    },
    // Changes the password
    async changePassword() {
      try {
        // Get current user
        const auth = getAuth();
        const user = auth.currentUser;
        // If the two password entries are the same
        if (this.passwordsAreTheSame(this.formData.newPassword, this.formData.confirmPassword)) {
          console.log("They're the same !");
          // Update password
          await updatePassword(user, this.formData.newPassword).then(() => {
            // Update successful
            alert ("Mot de passe modifié avec succès !");
            // Redirect to home page
            this.$router.push("/profile");
          }).catch((error) => {
            console.error("Erreur lors de la modification du mot de passe:", error);
            alert("Une erreur est survenue. Veuillez réessayer plus tard.");
          });
        // If passwords are not the same
        } else {
          console.log("not the same....");
          alert ("Veuillez entrer le même mot de passe.")
        }
      } catch (error) {
        console.error("Erreur lors de la modification du mot de passe:", error);
        alert("Une erreur est survenue. Veuillez réessayer plus tard.");
      }
    }
  }
}
</script>

<template>
  <div class="change-pswd-page">
    <div>
      <h1>Réinitialisez votre mot de passe</h1>
      <p>
        Pour continuez vers notre site, il vous est d'abord demandé de changer le mot de passe qui vous a été attribué
        par votre propre mot de passe.
      </p>
    </div>
    <br><br>
    <label for="password">Entrez votre nouveau mot de passe : </label>
    <div class="field has-addons">
      <div class="control is-expanded">
        <input v-if="formData.showPassword" type="text" id="password" v-model="formData.newPassword" @input="allRules" required>
        <input v-else-if="!formData.showPassword" type="password" id="password" v-model="formData.newPassword" @input="allRules" required>
        <span v-if="this.errors.allError" style="color: red">{{  this.errors.allError }}</span>
      </div>
      <div class="control">
        <v-btn v-if="formData.showPassword" icon="mdi-eye-outline" class="button" @click="toggleShow" />
        <v-btn v-else icon="mdi-eye-off-outline" class="button" @click="toggleShow" />
      </div>
    </div>
    <br><br>
    <label for="confirm">Confirmez votre nouveau mot de passe : </label>
    <div class="field has-addons">
      <div class="control is-expanded">
        <input v-if="formData.showPassword2" type="text" id="confirm" v-model="formData.confirmPassword"  @input="allRules2" required>
        <input v-else type="password" id="confirm" v-model="formData.confirmPassword"  @input="allRules2" required>
        <span v-if="this.errors.allError2" style="color: red">{{ this.errors.allError2 }}</span>
      </div>
      <div class="control">
        <v-btn v-if="formData.showPassword2" icon="mdi-eye-outline" class="button" @click="toggleShow2" />
        <v-btn v-else icon="mdi-eye-off-outline" class="button" @click="toggleShow2" />
      </div>
    </div>
    <br><br>
    <button type="button" class="btn-submit" v-on:click="changePassword">Valider</button>
  </div>
</template>

<style scoped>
body,
html {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.change-pswd-page {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.change-pswd-page h1 {
  text-align: center;
  color: #0056b3;
  margin-bottom: 20px;
}

p, label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

input, v-btn {
  width: 100%;
  height: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
}



.btn-submit {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #0056b3;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}

.btn-submit:hover {
  background-color: #004080;
}
</style>