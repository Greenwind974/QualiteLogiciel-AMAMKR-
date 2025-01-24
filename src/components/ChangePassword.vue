<script>
import {getAuth, updatePassword} from "firebase/auth";

export default {
  data() {
    return {
      newPassword: "",
      confirmPassword: ""
    };
  },
  methods: {
    // Verifiy the two password entries are the same
    passwordsAreTheSame(firstPassword, secondPassword) {
      return firstPassword === secondPassword;
    },
    // Changes the password
    async changePassword() {
      try {
        // Get current user
        const auth = getAuth();
        const user = auth.currentUser;
        // If the two password entries are the same
        if (this.passwordsAreTheSame(this.newPassword, this.confirmPassword)) {
          console.log("They're the same !");
          // Update password
          await updatePassword(user, this.newPassword).then(() => {
            // Update successful
            alert ("Mot de passe modifié avec succès !");
            // Redirect to home page
            this.$router.push("/home");
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
    <div>
      <label for="password">Entrez votre nouveau mot de passe : </label>
      <input type="password" id="password" v-model="newPassword" required>
    </div>
    <br><br>
    <div>
      <label for="confirm">Confirmez votre nouveau mot de passe : </label>
      <input type="password" id="confirm" v-model="confirmPassword" required>
      <br><br>
      <button type="button" class="btn-submit" v-on:click="changePassword">Valider</button>
    </div>
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

input {
  width: 100%;
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