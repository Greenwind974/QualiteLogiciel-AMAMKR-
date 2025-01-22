<template>
  <div>
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
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Mot de passe :</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <div class="form-group">
          <label for="firstName">Prénom :</label>
          <input type="text" id="firstName" v-model="firstName" required />
        </div>
        <div class="form-group">
          <label for="lastName">Nom :</label>
          <input type="text" id="lastName" v-model="lastName" required />
        </div>
        <div class="form-group">
          <label for="department">Département :</label>
          <select id="department" v-model="department" required>
            <option value="Informatique">Informatique</option>
            <option value="Mécanique">Mécanique</option>
            <option value="Manutention">Manutention</option>
          </select>
        </div>
        <div class="form-group">
          <label for="role">Role :</label>
          <input type="text" id="role" v-model="role" value="USER" disabled />
        </div>
<!--        <div class="form-group">-->
<!--          <label for="role">Role :</label>-->
<!--          <input type="text" id="role" v-model="role" required />-->
<!--        </div>-->
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
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      department: "",
      firstConnection: true,
      role: "USER", // Rôle par défaut
    };
  },
  methods: {
    async handleSignup() {
      try {
        const userCredential = await signUp(this.email, this.password, {
          firstName: this.firstName,
          lastName: this.lastName,
          department: this.department,
          firstConnection: this.firstConnection,
          role: this.role,
        });
        const { uid } = userCredential.user;
        await addOrUpdateUser(uid, this.email, {
          firstName: this.firstName,
          lastName: this.lastName,
          department: this.department,
          firstConnection: this.firstConnection,
          role: this.role,
        });
        alert("Utilisateur créé avec succès !");
        this.$router.push("/home");
      } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error);
        alert("Une erreur est survenue. Veuillez réessayer.");
      }
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

/* Signup Form Styles */
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
