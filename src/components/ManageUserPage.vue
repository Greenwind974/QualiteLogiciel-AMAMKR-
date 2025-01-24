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
      <h2>Menu</h2>
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

    <!-- Main Content -->
    <div class="main-content">
      <div class="header">
        <h1>Gestion des utilisateurs</h1>
        <button class="button is-primary mt-2" @click="redirectToSignupUser">Créer un utilisateur</button>
      </div>
      <div class="table-container">
        <table>
          <thead>
          <tr>
            <th>Matricule</th>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Département</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="user in users" :key="user.uid">
            <td>{{ user.ID }}</td>
            <td>
              <input
                  type="text"
                  v-model="user.FirstName"
                  @change="updateUser(user.uid, 'FirstName', user.FirstName)"
              />
            </td>
            <td>
              <input
                  type="text"
                  v-model="user.LastName"
                  @change="updateUser(user.uid, 'LastName', user.LastName)"
              />
            </td>
            <td>
              <input
                  type="email"
                  v-model="user.Email"
                  @change="updateUser(user.uid, 'Email', user.Email)"
              />
            </td>
            <td>
              <select
                  v-model="user.Department"
                  @change="updateUser(user.uid, 'Department', user.Department)">
                <option value="Informatique">Informatique</option>
                <option value="Mecanique">Mécanique</option>
                <option value="Manutention">Manutention</option>
              </select>
            </td>
            <td>
              <select
                  v-model="user.Role"
                  @change="updateUser(user.uid, 'Role', user.Role)"
              >
                <option value="USER">Utilisateur</option>
                <option value="ADMIN">Administrateur</option>
              </select>
            </td>
            <td>
              <button @click="deleteUser(user.uid)">Supprimer</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { deleteUser } from "firebase/auth";

export default {
  data() {
    return {
      users: [], // Liste des utilisateurs
      role: "USER", // Définir le rôle par défaut
    };
  },
  methods: {
    redirectToSignupUser() {
      this.$router.push("/signup-user");
    },
    async fetchUsers() {
      try {
        const querySnapshot = await getDocs(collection(db, "UTILISATEURS"));
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push({ uid: doc.id, ...doc.data() });
        });
        this.users = users;
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
      }
    },
    async updateUser(uid, field, value) {
      try {
        const userRef = doc(db, "UTILISATEURS", uid);
        await updateDoc(userRef, { [field]: value });
        alert("Utilisateur mis à jour avec succès !");
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
      }
    },
    async deleteUser(uid) {
      try {
        const userRef = doc(db, "UTILISATEURS", uid);
        await deleteDoc(userRef);

        const userToDelete = auth.currentUser;
        if (userToDelete && userToDelete.uid === uid) {
          await deleteUser(userToDelete);
        }

        this.users = this.users.filter((user) => user.uid !== uid);
        alert("Utilisateur supprimé avec succès !");
      } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur :", error);
      }
    },
  },
  async mounted() {
    await this.fetchUsers();
  },
};
</script>

<style scoped>
/* Global Styling */
body,
html {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0056b3;
  color: white;
  padding: 10px 20px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.navbar a {
  color: white;
  text-decoration: none;
  margin-right: 15px;
  font-weight: bold;
}

.navbar a:hover {
  color: #ffc107;
}

/* Sidebar */
.sidebar {
  width: 250px;
  height: calc(100vh - 60px);
  background-color: #0056b3;
  position: fixed;
  top: 60px;
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

/* Main Content */
.main-content {
  margin-left: 270px;
  margin-top: 70px;
  padding: 20px;
}

/* Table Styling */
.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

th,
td {
  text-align: left;
  border: 1px solid #ddd;
  padding: 10px;
}

th {
  background-color: #0056b3;
  color: white;
}

td input,
td select {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: darkred;
}
</style>
