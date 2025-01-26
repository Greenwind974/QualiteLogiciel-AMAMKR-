<template>
  <v-dialog persistent max-width="800px" v-model="dialog" scrollable   >

    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
          :disabled="booked"
          class="button is-primary"
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
              v-model="dateDebut"
              :min="new Date()"
          ></v-date-picker>
          <v-spacer></v-spacer>
          <v-date-picker
              v-model="dateFin"
              :min="new Date()"


          ></v-date-picker>
        </v-layout>
      </v-container>
          <v-row>
            <v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn

                    text="Réserver"
                    rounded="lg"  size="regular"  color="primary"
                    class="bouton3"
                    @click="onSaveChanges"
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
import {doc, updateDoc, getDoc} from "firebase/firestore";
import {getAuth} from "firebase/auth";

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

      dateDebut: new Date,
      dateFin:new Date,
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
          this.booked = docSnap.data().booked;
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
      if (this.dateFin === '' || this.dateDebut === '') {
        console.log("no")
      } else {
        await this.reserveMaterial()
        this.dialog = false
      }
    },


    async reserveMaterial() {

      try {
        const docRef = doc(db, "MATERIELS", this.matId);
        const docSnap = await getDoc(docRef);
        this.emprunteur=getAuth().currentUser.email;

        if (docSnap.exists() && !docSnap.data().booked) {
          await updateDoc(docRef, {
            emprunteur: this.emprunteur,
            dateDebut: this.dateDebut.toDateString(),
            dateFin: this.dateFin.toDateString(),
            booked: true,
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

    },
  }}



</script>

<style scoped>

.bouton3{
  padding:3px;
}
</style>