<template>
  <v-app>
    <v-layout>
      <v-app-bar
          color="primary"
      >
        <router-link class="title" :to='"/"'><v-app-bar-title >LocaMat</v-app-bar-title></router-link>
        <template v-slot:append>
          <v-btn icon="mdi-account-circle" :to='"/profile"'></v-btn>
          <v-btn icon="mdi-logout"></v-btn>
        </template>
      </v-app-bar>
      <v-navigation-drawer
          v-model="drawer"
          :rail="rail"
          permanent
          color="primary"
          theme="dark">
        <v-list>
          <v-list-item
              title="LocaMat"
              prepend-icon="mdi-menu"
              @click.stop="rail = !rail"
              nav>
          </v-list-item>
          <v-divider></v-divider>

            <v-list-item prepend-icon="mdi-folder" title="Matériels" value="materiels" to="/material" :disabled="nav"></v-list-item>
            <v-list-item prepend-icon="mdi-folder-edit" title="Gérer les Matériels" value="manage-materiels" to="/manage-materials" :disabled="nav" ></v-list-item>
            <v-list-item prepend-icon="mdi-account-multiple" title="Gérer les Utilisateurs" value="manage-users"  to="/manage-users" :disabled="nav" ></v-list-item>
            <v-list-item prepend-icon="mdi-bookmark-multiple" title="Reservations" value="reservations" to="/reservations" :disabled="nav"></v-list-item>


        </v-list>
      </v-navigation-drawer>
      <v-main v-model="page" scrollable style="height: 100% ">
        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-app>

</template>

<script>

import {getAuth} from "firebase/auth";


export default {
  name : "App",
  components: {
  },
  data () {
    return {
      nav:false,
      drawer: true,
      rail: true,
      user: getAuth().currentUser,
      role : null,
      page: null,

    }
  },
  watch: {
    // whenever question changes, this function will run
    user(newUser) {
      if (newUser!=null) {
        this.nav=true;
      }
    },
async created() {
  try {
    const auth = getAuth();
    this.user = auth.currentUser;
    if (this.user && this.user.Role) {
      this.role = this.user.Role; // Récupérer le rôle depuis Firestore
    } else {
      this.role = "USER"; // Rôle par défaut si aucun n'est défini
    }
    // Vérifier et attribuer le rôle

  } catch (error) {
    console.error("Erreur lors du chargement des données utilisateur :", error);
  }
},}}

</script>

<style>

.title {
  text-decoration: none;
  padding: 0.5em 0.75em 0;

}

</style>
