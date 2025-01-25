<template>
  <div>


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
          <tr v-for="(user, index) in users" :key="user.uid">
            <td>{{ user.ID }}</td>
            <td>
              <input
                  type="text"
                  v-model="user.FirstName"
                  @change="updateUser(user.uid, 'FirstName', user.FirstName, index)"
              />
            </td>
            <td>
              <input
                  type="text"
                  v-model="user.LastName"
                  @change="updateUser(user.uid, 'LastName', user.LastName, index)"
              />
            </td>
            <td>
              <input
                  type="email"
                  v-model="user.Email"
                  @change="updateUser(user.uid, 'Email', user.Email, index)"
              />
            </td>
            <td>
              <select
                  v-model="user.Department"
                  @change="updateUser(user.uid, 'Department', user.Department, index)">
                <option value="Informatique">Informatique</option>
                <option value="Mecanique">Mécanique</option>
                <option value="Manutention">Manutention</option>
              </select>
            </td>
            <td>
              <select
                  v-model="user.Role"
                  @change="updateUser(user.uid, 'Role', user.Role, index)"
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
      nameError: null,
      rules: {
        email: (value) => {
          const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
          return regex.test(value) || "Adresse email invalide.";
        }
      }
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
    async updateUser(uid, field, value, index) {
      try {
        const firstName = this.users[index].FirstName;
        const lastName = this.users[index].LastName;
        const email = this.users[index].Email;
        const regex = /^[A-Za-z]{1,30}$/;
        const userRef = doc(db, "UTILISATEURS", uid);
        if (!this.rules.email(email)) {
          alert("Le format du mail est incorrect");
        } else if (firstName === '' || lastName === '' || email === '') {
          alert("Le champ ne doit pas être vide");
        } else if (!regex.test(firstName) || !regex.test(lastName)) {
          alert("Le nom et le prénom ne doivent pas dépasser 30 caractères ni contenir de nombre ou caractères spéciaux.");
        } else {
          await updateDoc(userRef, { [field]: value });
          alert("Utilisateur mis à jour avec succès !");
        }
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


/* Main Content */
.main-content {
  margin:5%;
width:75%;
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
