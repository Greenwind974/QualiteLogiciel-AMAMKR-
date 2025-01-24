<template>
  <!-- Pop Up -->
  <div>
    <div v-if="popup.show" class="popup" :class="popup.color">
      <p>{{ popup.message }}</p>
      <button @click="popup.show = false">Fermer</button>
    </div>

    <!-- Navbar -->
    <nav class="navbar">
      <div class="navbar-left">
        <a href="/home">Accueil</a>
        <a href="/settings">Paramètres</a>
      </div>
      <div class="navbar-right">
        <a href="/profile">Profil</a>
      </div>
    </nav>

    <!-- Signup Form -->
    <div class="signup-user-page">
      <h1>Créer un utilisateur</h1>
      <form @submit.prevent="handleSignup">
        <div class="form-group">
          <label for="email">Email :</label>
          <input type="email" id="email" v-model="formData.email" :class="{ invalid: !rules.email(formData.email) }"
                 required
          />
          <span v-if="!rules.email(formData.email)">Adresse email invalide.</span>
        </div>
        <div class="form-group">
          <label for="password">Mot de passe :</label>
          <input type="password" id="password" v-model="formData.password" :class="{ invalid: !rules.minLength(6)(formData.password) }" required />
          <span v-if="!rules.minLength(6)(formData.password)">Minimum 6 caractères.</span>
        </div>
        <div class="form-group">
          <label for="firstName">Prénom :</label>
          <input type="text" id="firstName" v-model="formData.firstName" :class="{ invalid: !rules.alphaNumeric(formData.firstName) }" required />
          <span v-if="!rules.alphaNumeric(formData.firstName)">Caractères alphanumériques uniquement.</span>
        </div>
        <div class="form-group">
          <label for="lastName">Nom :</label>
          <input type="text" id="lastName" v-model="formData.lastName" :class="{ invalid: !rules.alphaNumeric(formData.lastName) }" required />
          <span v-if="!rules.alphaNumeric(formData.lastName)">Caractères alphanumériques uniquement.</span>
        </div>
        <div class="form-group">
          <label for="department">Département :</label>
          <select id="department" v-model="formData.department" required>
            <option value="Informatique">Informatique</option>
            <option value="Mecanique">Mécanique</option>
            <option value="Manutention">Manutention</option>
          </select>
        </div>
        <div class="form-group">
          <label for="role">Role :</label>
          <input type="text" id="role" v-model="formData.role" value="USER" disabled />
        </div>
        <button type="submit" class="btn-submit">Créer l'utilisateur</button>
      </form>
    </div>
  </div>
</template>

<script>
import { signUp, addOrUpdateUser } from "@/firebase/authService";

export default {
  data() {
    return {
      // Popup
      popup: {
        show: false,
        message: "",
        color: "success",
      },
      isLoading: false, // Indicateur visuel pour les processus
      // Données du formulaire
      formData: {
        firstName: "",
        lastName: "",
        email: "",
        department: "",
        password: "",
        firstConnection: true,
        role: "USER", // Rôle par défaut
      },
      // Règles de validation
      rules: {
        email: (value) => {
          const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
          return regex.test(value) || "Adresse email invalide.";
        },
        alphaNumeric: (value) => {
          const regex = /^[a-zA-Z0-9\s]{1,30}$/;
          return regex.test(value) || "Caractères alphanumériques uniquement.";
        },
        minLength: (min) => (value) =>
            (value && value.length >= min) || `Minimum ${min} caractères.`,
      },
    };
  },
  methods: {
    async handleSignup() {
      this.isLoading = true; // Activer le loader
      try {
        // Validation initiale des champs
        const validationErrors = this.validateForm();
        if (validationErrors) {
          this.showPopup(validationErrors, "error");
          this.isLoading = false;
          return;
        }

        // Inscription
        const userCredential = await signUp(this.formData.email, this.formData.password, {
          firstName: this.formData.firstName,
          lastName: this.formData.lastName,
          department: this.formData.department,
          firstConnection: this.firstConnection,
          role: this.formData.role,
        });

        const { uid } = userCredential.user;
        await addOrUpdateUser(uid, this.formData.email, {
          firstName: this.formData.firstName,
          lastName: this.formData.lastName,
          department: this.formData.department,
          firstConnection: this.firstConnection,
          role: this.formData.role,
        });

        // Succès
        this.showPopup("Utilisateur créé avec succès.", "success");
        this.resetForm();
      } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error);
        // Mauvaise Suprise case :(
        const message = error.message || "Une erreur inattendue est survenue.";
        this.showPopup(message, "error");
      } finally {
        this.isLoading = false; // Désactiver le loader
      }
    },
    // Verification des données du Form
    validateForm() {
      // Valider chaque champ selon les règles
      const errors = [];
      if (!this.rules.alphaNumeric(this.formData.firstName)) {
        errors.push("Prénom invalide.");
      }
      if (!this.rules.alphaNumeric(this.formData.lastName)) {
        errors.push("Nom invalide.");
      }
      if (!this.rules.email(this.formData.email)) {
        errors.push("Adresse email invalide.");
      }
      if (!this.rules.minLength(6)(this.formData.password)) {
        errors.push("Le mot de passe doit contenir au moins 6 caractères.");
      }
      return errors.length > 0 ? errors.join("\n") : null;
    },
    showPopup(message, color) {
      this.popup.message = message;
      this.popup.color = color;
      this.popup.show = true;
    },
    resetForm() {
      this.formData = {
        firstName: "",
        lastName: "",
        email: "",
        department: "",
        password: "",
        role: "USER",
      };
    },
  },
};
</script>


<style scoped>
/* Global Styles */
body,
html {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

/* Navbar Styles */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0056b3;
  color: white;
  padding: 10px 20px;
  height: 60px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.navbar-left,
.navbar-right {
  display: flex;
}

.navbar-left a,
.navbar-right a {
  text-decoration: none;
  color: white;
  margin-right: 20px;
  font-size: 16px;
  font-weight: bold;
}

.navbar-left a:hover,
.navbar-right a:hover {
  color: #ffc107;
}

/* Signup Form */
.signup-user-page {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.signup-user-page h1 {
  text-align: center;
  color: #0056b3;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #0056b3;
  outline: none;
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
