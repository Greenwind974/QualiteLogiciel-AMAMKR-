<template>
  <v-dialog persistent max-width="500px" v-model="dialog">

    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
          rounded="lg"  size="regular"  color="primary"
          class="bouton2"
          prepend-icon="mdi-plus"
          text="Nouveau matériel"
          v-bind="activatorProps"
      ></v-btn>
    </template>

    <v-card
        prepend-icon="mdi-folder-plus"
        title="Nouveau matériel"
    >
      <v-divider></v-divider>

        <v-form>
          <v-text-field
              v-model="nom"
              label="Nom*"
              hint="Nom du matériel"
              id="nom"
              :rules="[rules.required, rules.counterNom]"
              required
              max-width="75%"
              variant="outlined"

          ></v-text-field>
          <v-text-field
              v-model="version"
              label="Version*"
              hint="Version du matériel (ex: V3.0)"
              id="version"
              :rules="[rules.required, rules.counterVersion]"
              required
              max-width="75%"
              variant="outlined"

          ></v-text-field>

          <v-text-field
              v-model="reference"
              label="Réference*"
              hint="Réference du matériel (ex : AN159 pour android, AP951 pour apple, XX454 pour autre)"
              id="reference"
              :rules="[rules.required, rules.alphaNumReference]"
              required
              max-width="75%"
              variant="outlined"

          ></v-text-field>

          <v-text-field
              v-model="num_telephone"
              label="Numéro"
              hint="Numéro de téléphone"
              id="tel"
              :rules="[rules.counterTelephone, rules.onlyNumbers]"
              max-width="75%"
              variant="outlined"

          ></v-text-field>

          <v-text-field
              v-model="photo"
              label="URL Photo"
              hint="URL de la photo du matériel"
              id="photo"
              max-width="75%"
              variant="outlined"

          ></v-text-field>
        </v-form>

        <small class="text-caption text-medium-emphasis">*Champs requis</small>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn

            text="Créer"
            rounded="lg"  size="regular"  color="primary"
            class=" bouton3"
            @click="onSaveChanges"
        ></v-btn>

        <v-btn

            text="Annuler"
            rounded="lg"  size="regular"  color="grey"
            class=" bouton3"
            @click="dialog = false"
        ></v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script>
import {addDoc, collection} from "firebase/firestore";
import {db} from "@/firebase";

export default {
  data(){
    return{
      dialog:false,
      nom:"",
      num_telephone: "",
      photo: "",
      reference: "",
      version: "",
      rules: {
        required: value => !!value || 'Champs requis',
        counterNom: value => (value.length <= 30) || 'Champs invalide',
        counterVersion: value => (value.length <= 15 && value.length>=3 ) || 'Champs invalide',
        counterTelephone: value => (value.length === 10) || 'Champs invalide',
        onlyNumbers: value => (value && value.match(/[0-9]/g)) || "Champs invalide",
        alphaNumReference: value => (value && value.match(/^(AN|AP|XX)\d{3}$/)) || "Champs invalide"

      },
    }

  },
  methods:{
    async onSaveChanges() {
      await this.createMat();
      this.dialog=false;

    },
    async createMat() {
      const colMat = collection(db, "MATERIELS")
      const dataObj = {
        nom: this.nom,
        num_telephone: this.num_telephone,
        photo: this.photo,
        reference: this.reference,
        version: this.version,
      }
      const docRef = await addDoc(colMat, dataObj)
      console.log('Doc id :', docRef.id)
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