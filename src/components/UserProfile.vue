<template>
  <div class="user-profile" v-if="user">
    <div class="sidebar">
      <!-- Sidebar -->
      <ul>
        <li v-if="role === 'ADMIN'">
          <a href="/manage-users">Gérer les utilisateurs</a>
        </li>
        <li v-if="role === 'USER' || role === 'ADMIN'">
          <a href="/emprunts">Emprunts</a>
        </li>
        <li v-if="role === 'USER' || role === 'ADMIN'">
          <a href="/retour">Retour</a>
        </li>
      </ul>
    </div>
    <!-- Header Section -->
    <div class="profile-header">
      <figure class="image is-4by3">
        <img src="https://via.placeholder.com/1440x341" />
      </figure>
      <div class="user-info">
        <div class="text-info">
          <h2 class="title has-text-centered">{{ user.FirstName }} {{ user.LastName }}</h2>
          <p class="subtitle">Bonjour {{ user.FirstName }} !</p>
        </div>
      </div>
    </div>

    <!-- Profile Form -->
    <div class="columns is-centered is-vcentered">
      <div class="column is-narrow">
        <div class="box has-background box-profile-page">
          <div class="profile-page">
            <h3 class="title has-text-centered">Informations personnelles</h3>
            <form>
              <div class="field form-group">
                <label class="label" for="firstName">Prénom</label>
                <input class="input" id="firstName" type="text" v-model="user.FirstName" disabled />
              </div>
              <div class="field form-group">
                <label class="label" for="lastName">Nom</label>
                <input class="input" id="lastName" type="text" v-model="user.LastName" disabled />
              </div>
              <div class="field form-group">
                <label class="labe" for="email">Email</label>
                <input class="input" id="email" type="email" v-model="user.Email" disabled />
              </div>
              <div class="field form-group">
                <label class="label" for="department">Département</label>
                <input class="input" id="department" type="text" v-model="user.Department" disabled />
              </div>
            </form>
          </div>
          <button @click="logout" class="button is-danger is-fullwidth mt-2 logout-button">Déconnexion</button>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    <p>Chargement des informations utilisateur...</p>
  </div>
</template>

<script>
import { signOutUser } from "@/firebase/authService";
import { fetchUserData } from "@/firebase/userService";

export default {
  name: "UserProfile",
  data() {
    return {
      user: null,
      role : null,
    };
  },
  async created() {
    try {
      this.user = await fetchUserData();

      // Vérifier et attribuer le rôle
      if (this.user && this.user.Role) {
        this.role = this.user.Role; // Récupérer le rôle depuis Firestore
      } else {
        this.role = "USER"; // Rôle par défaut si aucun n'est défini
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données utilisateur :", error);
    }
  },
  methods: {
    async logout() {
      try {
        await signOutUser();
        this.$router.push("/");
      } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);
      }
    },
  },
};
</script>

<style scoped>
/* General Reset */
body,
html {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}
.box-profile-page{
  max-width: 450px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.profile-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
}

/* Header Section */
.user-info{
  margin: 1em;
}

/* Sidebar */
.sidebar {
  width: 250px;
  height: calc(100vh - 60px);
  background-color: #0056b3;
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px;
  color: white;
}

.sidebar h2 {
  margin-bottom: 20px;
  color: #ffc107;
}

.sidebar ul li {
  list-style: none;
  margin-bottom: 15px;
}

.sidebar ul li a {
  text-decoration: none;
  color: white;
  font-size: 16px;
}

.sidebar ul li a:hover {
  color: #ffc107;
}
</style>
