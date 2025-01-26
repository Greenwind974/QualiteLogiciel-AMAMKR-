<template>
  <div class="user-profile" v-if="user">

    <!-- Profile Form -->
    <div class="columns is-centered is-vcentered">
      <div class="column is-narrow">
        <div class="box box-profile-page">
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



.user-info{
  margin: 1em;
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

</style>
