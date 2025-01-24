

<template>
  <v-dialog persistent max-width="500px" v-model="dialog">

    <template v-slot:activator="{ props: activatorProps }">
      <v-btn

          rounded="lg"  size="regular"  color="primary"
          class="bouton2"
          prepend-icon="mdi-pencil"
          text="Modifier"
          v-bind="activatorProps"
      ></v-btn>
    </template>

    <v-card
        prepend-icon="mdi-folder"
        title="Modifier un matériel"
    >
      <v-divider></v-divider>
      <v-card-text>
        <v-row dense>
          <v-col

          >
            <v-text-field
                label="Nom*"
                hint="Nom du matériel"
                v-model="nom"
                required
                :rules="[rules.required]"
            ></v-text-field>

            <v-text-field
                label="Version*"
                hint="Version du matériel (ex: V3.0)"
                v-model="version"
                :rules="[rules.required]"
                required
            ></v-text-field>

            <v-text-field
                label="Réference*"
                hint="Réference du matériel (ex : AN159 pour android, AP951 pour apple...)"
                v-model="reference"
                :rules="[rules.required]"
                required
            ></v-text-field>

            <v-text-field
                label="Numéro"
                hint="Numéro de téléphone"
                v-model="num_telephone"
            ></v-text-field>

            <v-text-field
                label="URL Photo"
                hint="URL de la photo du matériel"
                v-model="photo"
            ></v-text-field>
          </v-col>
        </v-row>

        <small class="text-caption text-medium-emphasis">*Champs requis</small>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn

            text="Mettre à jour"
            rounded="lg"  size="regular"  color="warning"
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
import {db} from "@/firebase";
import { doc,updateDoc, getDoc} from "firebase/firestore";

export default {

  props:['matId'],
  created() {
    this.getMat()
  },
  data(){
    return{
      dialog:false,
      rules: {
        required: value => !!value || 'Field is required',
      },
      id:this.matId,
      nom:"",
      num_telephone: "",
      photo: "",
      reference: "",
      version: "",

    }

  },
  methods: {
    async getMat() {
      try {
        const docRef = doc(db, "MATERIELS", this.matId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          this.nom = docSnap.data().nom;
          this.num_telephone = docSnap.data().num_telephone;
          this.photo = docSnap.data().photo;
          this.reference = docSnap.data().reference;
          this.version = docSnap.data().version;
          //console.log("Document trouvé :", docSnap.data());
          return docSnap.data();
        } else {

          console.log("Aucun document trouvé avec cet ID !");
          return null
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du document :", error);
      }


    },
    async onSaveChanges() {
      if (this.nom.trim() === '' || this.version.trim() === '' || this.reference.trim() === '') {
        console.log("no")
      }
      else{
        await this.updateMaterial()
        this.dialog = false
        }
    },

    async updateMaterial() {

      try {
        const docRef = doc(db, "MATERIELS", this.matId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          await updateDoc(docRef, {
            reference: this.reference,
            num_telephone: this.num_telephone,
            photo: this.photo,
            version: this.version,
            nom: this.nom,
          });
          console.log("Document trouvé :", docSnap.data());
          return docSnap.data();
        } else {
          console.log("Aucun document trouvé avec cet ID !");
          return null
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du document :", error);
      }

    }}}


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