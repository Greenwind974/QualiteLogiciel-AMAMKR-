

<template>
  <v-dialog persistent max-width="500px" v-model="dialog">

    <template v-slot:activator="{ props: activatorProps }">
      <v-btn

          rounded="lg"  size="regular"  color="warning"
          class="bouton2"
          prepend-icon="mdi-delete"
          text="Supprimer"
          v-bind="activatorProps"
      ></v-btn>
    </template>

    <v-card
        prepend-icon="mdi-delete"
        title="Supprimer un matériel"
    >
      <v-divider></v-divider>
      <v-card-text>
        <v-row dense>
          <v-col

          >
            <v-text-field
                label="Nom"
                hint="Nom du matériel"
                v-model="nom"
                variant="solo"
                readonly
            ></v-text-field>


            <v-text-field
                label="Version"
                hint="Version du matériel (ex: V3.0)"
                v-model="version"
                variant="solo"
                readonly
            ></v-text-field>

            <v-text-field
                label="Réference"
                hint="Réference du matériel (ex : AN159 pour android, AP951 pour apple...)"
                v-model="reference"
                variant="solo"
                readonly
            ></v-text-field>

            <v-text-field
                label="Numéro"
                hint="Numéro de téléphone"
                v-model="num_telephone"
                variant="solo"
                readonly
            ></v-text-field>

            <v-text-field
                label="URL Photo"
                hint="URL de la photo du matériel"
                v-model="photo"
                variant="solo"
                readonly
            ></v-text-field>
          </v-col>

        </v-row>


      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn

            text="Supprimer"
            rounded="lg"  size="regular"  color="warning"
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
    </v-card>

    <!--<v-form fast-fail @submit.prevent>
      <v-text-field
          v-model="firstName"
          :rules="firstNameRules"
          label="First name"
      ></v-text-field>

      <v-text-field
          v-model="lastName"
          :rules="lastNameRules"
          label="Last name"
      ></v-text-field>

      <v-btn class="mt-2" type="submit" block>Submit</v-btn>
    </v-form>-->



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