<template>
  <v-container>
    <v-layout row wrap class="mb-2"
              v-for="mat in materiels"
              :key="mat.id">
      <v-row justify="center">
        <v-card variant="flat"
                color="secondary"



        >
          <v-layout row>
            <v-container>
              <v-img width="10em"
                     contain
                     :src="mat.photo">
              </v-img>
            </v-container>
            <v-container>
              <v-card-title>{{mat.nom}}</v-card-title>
              <v-card-subtitle>version : {{mat.version}}</v-card-subtitle>
              <v-card-text>numéro : {{mat.num_telephone}}
                référence : {{mat.reference}}</v-card-text>

              <v-btn rounded="lg"  size="regular" block color="accent" >Réserver<v-icon>mdi-arrow-right</v-icon></v-btn>

            </v-container>
          </v-layout>
        </v-card>
      </v-row>

    </v-layout>


  </v-container>
</template>

<script>
export default {
  computed:{
    materiels (){
      return this.$store.getters.loadedMaterials
    }
  }
}



</script>

<style scoped>



</style>
