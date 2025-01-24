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

    <!-- Sidebar -->
    <div class="sidebar">
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
    <div class="main-content">
      <h1>Bienvenue dans votre application</h1>
      <p>Le contenu principal de la page s'affichera ici.</p>
    </div>
  </div>
</template>

<script>
import { fetchUserData } from "@/firebase/userService";

export default {
  data() {
    return {
      role: null, // Stocke le rôle de l'utilisateur
    };
  },
  async created() {
    try {
      const userData = await fetchUserData();
      if (userData) {
        this.role = userData.Role || "USER";
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données utilisateur :", error);
    }
  },
};
</script>

<style scoped>
body,
html {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-left,
.navbar-right {
  display: flex;
  align-items: center;
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

/* Sidebar Styles */
.sidebar {
  width: 250px;
  height: calc(100vh - 60px);
  background-color: #0056b3;
  color: white;
  padding: 20px;
  position: fixed;
  top: 60px;
  left: 0;
  display: flex;
  flex-direction: column;
}

.sidebar h2 {
  margin: 0 0 20px 0;
  font-size: 24px;
  font-weight: bold;
  color: #ffc107;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar ul li {
  margin-bottom: 20px;
}

.sidebar ul li a {
  text-decoration: none;
  color: white;
  font-size: 18px;
  font-weight: bold;
  display: block;
  padding: 10px;
  border-radius: 5px;
}

.sidebar ul li a:hover {
  background-color: #ffc107;
  color: #0056b3;
}

/* Main Content */
.main-content {
  margin-left: 250px;
  margin-top: 60px;
  padding: 20px;
}
</style>
