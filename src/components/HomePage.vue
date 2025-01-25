<template>
<p>home</p>
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

</style>
