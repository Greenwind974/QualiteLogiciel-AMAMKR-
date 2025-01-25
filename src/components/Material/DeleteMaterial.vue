

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
        </v-container>
      </v-layout>
      <v-divider  ></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn

            text="Supprimer"
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
import {db} from "@/firebase";
import {doc, getDoc, deleteDoc} from "firebase/firestore";

export default {
  props:['matId'],
  created() {
    this.getMat()
  },
  data(){
    return{
      dialog:false,
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
        await this.deleteMaterial()
        this.dialog = false

    },

    async deleteMaterial() {

      try {
        const docRef = doc(db, "MATERIELS", this.matId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          await deleteDoc(docRef)
          console.log("Document supprimé");
        } else {
          console.log("Aucun document trouvé avec cet ID !");
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