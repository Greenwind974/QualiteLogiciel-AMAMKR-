

<template>
  <v-dialog persistent max-width="800px" v-model="dialog" scrollable   >

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
      <v-container>
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
              référence : {{reference}}

            </v-card-text>
          </v-container>

        </v-layout>
      </v-container>
      <v-divider></v-divider>

      <v-container>
        <v-layout row>
          <v-date-picker
              max="2018-03-20"
              min="2016-06-15"
          ></v-date-picker>
          <v-spacer></v-spacer>
          <v-date-picker
              max="2018-03-20"
              min="2016-06-15"
          ></v-date-picker>
        </v-layout>
      </v-container>
            <v-container>

              <v-card-text>
                <v-select
                    :items="['1 semaine', '2 semaines', '3 semaines', '4 semaines']"
                    label="Durée de l'emprunt"
                    required
                ></v-select>
              </v-card-text>

            </v-container>

          <v-row>
            <v-container>
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
            </v-container>
        </v-row>
    </v-card>



  </v-dialog>
</template>

<script>import {db} from "@/firebase";
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
      dateDebut:"",
      dateFin:"",
      emprunteur:"",
      booked:false,
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
          this.booked=docSnap.data().booked;
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