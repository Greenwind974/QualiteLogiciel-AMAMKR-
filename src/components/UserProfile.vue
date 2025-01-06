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
      <div class="cover-photo"></div>
      <div class="user-info">
        <div class="text-info">
          <h2>{{ user.FirstName }} {{ user.LastName }}</h2>
          <p>Bonjour {{ user.FirstName }} !</p>
        </div>
      </div>
    </div>

    <!-- Profile Form -->
    <div class="profile-form">
      <h3>Informations personnelles</h3>
      <form>
        <div class="form-group">
          <label for="firstName">Prénom</label>
          <input id="firstName" type="text" v-model="user.FirstName" disabled />
        </div>
        <div class="form-group">
          <label for="lastName">Nom</label>
          <input id="lastName" type="text" v-model="user.LastName" disabled />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" type="email" v-model="user.Email" disabled />
        </div>
        <div class="form-group">
          <label for="department">Département</label>
          <input id="department" type="text" v-model="user.Department" disabled />
        </div>
      </form>

    </div>
    <button @click="logout" class="logout-button">Déconnexion</button>
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

/* Header Section */
.profile-header {
  position: relative;
  height: 300px;
}

.cover-photo {
  height: 200px;
  background: url("https://via.placeholder.com/1440x341") no-repeat center center;
  background-size: cover;
}

.user-info {
  position: absolute;
  bottom: -50px;
  left: 20px;
  display: flex;
  align-items: center;
}

.text-info h2 {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}

.text-info p {
  margin: 5px 0 10px;
  font-size: 18px;
  color: gray;
}

/* Profile Form */
.profile-form {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin: 60px auto;
  padding: 20px;
  max-width: 600px;
}

.profile-form h3 {
  margin-bottom: 20px;
  font-size: 20px;
  color: #0056b3;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
}

.logout-button {
  display: block;
  margin: 20px auto;
  background-color: #d9534f;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #c9302c;
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
