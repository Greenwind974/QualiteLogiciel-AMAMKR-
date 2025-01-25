<template>
  <div class="is-centered is-vcentered" style="width: 100%; height: 100%; min-height: 100vh;">
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
    <div class="columns is-centered is-vcentered">
      <div class="column is-narrow">
        <div class="box has-background box-register-page">
          <div class="register-page">
            <h1 class="title has-text-centered">Créer un utilisateur</h1>
            <form @submit.prevent="handleSignup">
              <div class="field">
                <label class="label" for="email">Email :</label>
                <div class="control">
                  <input class="input" type="email" id="email" v-model="email" required />
                </div>
              </div>
              <div class="field">
                <label class="label" for="password">Mot de passe :</label>
                <div class="control">
                  <input class="input" type="password" id="password" v-model="password" required />
                </div>
              </div>
              <div class="field">
                <label class="label" for="firstName">Prénom :</label>
                <div class="control">
                  <input class="input" type="text" id="firstName" v-model="firstName" required />
                </div>
              </div>
              <div class="field">
                <label class="label" for="lastName">Nom :</label>
                <div class="control">
                  <input class="input" type="text" id="lastName" v-model="lastName" required />
                </div>
              </div>
              <div class="field">
                <label class="label" for="department">Département :</label>
                <div class="select">
                  <select id="department" v-model="department" required>
                    <option value="Informatique">Informatique</option>
                    <option value="Mécanique">Mécanique</option>
                    <option value="Manutention">Manutention</option>
                  </select>
                </div>
              </div>
              <div class="field">
                <label class="label" for="role">Role :</label>
                <div class="control">
                  <input class="input" type="text" id="role" v-model="role" required />
                </div>
              </div>
              <div class="control">
                <button type="submit" class="button is-primary is-fullwidth mt-2">Créer l'utilisateur</button>
              </div>
            </form>
          </div>
        </div>
      </div>
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
        });
        const { uid } = userCredential.user;
        await addOrUpdateUser(uid, this.email, {
          firstName: this.firstName,
          lastName: this.lastName,
          department: this.department,
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
.box-register-page{
  max-width: 450px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.register-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
}

/* Navbar Styles */
.navbar {
  display: flex;
  margin-bottom: 1em;
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
</style>
