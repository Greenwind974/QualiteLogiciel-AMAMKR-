<template>
  <v-container>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer><v-spacer></v-spacer>

    <v-layout>
      <v-col>
        <h1>Bienvenue sur LocaMat</h1>
        <h2>Outil de réservation de matériels informatiques </h2>
        <v-btn rounded="lg"  size="regular"  color="accent"
               class="bouton2"
               append-icon="mdi-arrow-right"
               text="Réserver"
               to="/material"></v-btn>
      </v-col>

    </v-layout>
  </v-container>

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
.bouton2{
  padding:3px;
margin-top:50px;
  margin-left: 45%;
}
h1{
  text-align: center;
  font-size: xxx-large;
}
h2{
  text-align: center;
  font-size: larger;
}
</style>
