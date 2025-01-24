

<template>
  <v-dialog persistent max-width="700px" v-model="dialog">

    <template v-slot:activator="{ props: activatorProps }">
      <v-btn

          rounded="lg"  size="regular"  color="accent"
          class="bouton2"
          append-icon="mdi-arrow-right"
          text="Réserver"
          v-bind="activatorProps"
      ></v-btn>
    </template>

    <v-card
        prepend-icon="mdi-bookmark"
        title="Réserver un matériel"
    >
      <v-divider></v-divider>
      <v-layout row>
      <v-container>
        <v-img width="10em"
               contain
               :src="photo">
        </v-img>
      </v-container>
      <v-container>
        <v-card-title>{{nom}}</v-card-title>
        <v-card-subtitle>version : {{version}}</v-card-subtitle>
        <v-card-text>téléphone : {{num_telephone}}
          <v-spacer></v-spacer>
          référence : {{reference}}</v-card-text>
        <v-select
            :items="['1 semaine', '2 semaines', '3 semaines', '4 semaines']"
            label="Durée de l'emprunt"
            required
        ></v-select>
      </v-container>




      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn

            text="Réserver"
            rounded="lg"  size="regular"  color="primary"
            class=" bouton3"
            @click="dialog = false"
        ></v-btn>
        <v-btn
            text="Annuler"
            rounded="lg"  size="regular"  color="grey"
            class=" bouton3"
            @click="dialog = false"
        ></v-btn>
      </v-card-actions>
      </v-layout>
    </v-card>

  </v-dialog>
</template>

<script>
export default {
  props:['materiel'],
  data(){
    return{
      dialog:false,
      nom:this.materiel.nom,
      num_telephone: this.materiel.num_telephone,
      photo: this.materiel.photo,
      reference: this.materiel.reference,
      version: this.materiel.version,
    }
  }
}


</script>

<style scoped>
.bouton2{
  padding:3px;
  margin-top:20px;
}

.bouton3{
  padding:3px;


}
</style>