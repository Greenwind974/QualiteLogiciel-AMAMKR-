

<template>
  <v-dialog persistent max-width="700px" v-model="dialog">

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
                :rules="[rules.required, rules.counterNom]"
            ></v-text-field>

            <v-text-field
                label="Version*"
                hint="Version du matériel (ex: V3.0)"
                v-model="version"
                :rules="[rules.required, rules.counterVersion]"
                required
            ></v-text-field>

            <v-text-field
                label="Réference*"
                hint="Réference du matériel (ex : AN159 pour android, AP951 pour apple...)"
                v-model="reference"
                :rules="[rules.required, rules.alphaNumReference]"
                required
            ></v-text-field>

            <v-text-field
                label="Numéro"
                hint="Numéro de téléphone"
                v-model="num_telephone"
                :rules="[rules.counterTelephone]"
            ></v-text-field>

            <v-text-field
                label="URL Photo"
                hint="URL de la photo du matériel"
                v-model="photo"
                :rules="[rules.urlFormat]"
            ></v-text-field>
            <v-checkbox :disabled="!this.booked"
                   color="warning"
            label="Supprimer la réservation de ce matériel"
            v-model="noBooked"></v-checkbox>

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
import {doc, updateDoc, getDoc } from "firebase/firestore";

export default {

  props:['matId'],
  created() {
    this.getMat()
  },
  data(){
    return{
      dialog:false,
      rules: {
        required: value => !!value || 'Champs requis',
        counterNom: value => (value.length <= 30) || 'Champs invalide',
        counterVersion: value => (value.length <= 15 && value.length >= 3 && (/^V\d*(\.\d+)?$/).test(value)) || 'Champs invalide (ex: V3.0)',
        counterTelephone: value => (value.length === 10) || 'Champs invalide',
        onlyNumbers: value => (value && (/[0-9]/g).test(value)) || "Champs invalide",
        alphaNumReference: value => (value && (/^(AN|AP|XX)\d{3}$/).test(value)) || "Champs invalide (ex : AN159 pour android, AP951 pour apple, XX454 pour autre)",
        urlFormat: value => (value && (/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|bmp)$/i).test(value)) || "Champs invalide"
      },
      id:this.matId,
      nom:"",
      num_telephone: "",
      photo: "",
      reference: "",
      version: "",
      booked:false,
      noBooked:false,
      allIsCorrect: true
    }

  },
  methods: {
    requiredRule(value) {
      const result = this.rules.required(value);
      return result === true ? null : result;
    },
    counterNomRule(value) {
      const result = this.rules.counterNom(value);
      return result === true ? null : result;
    },
    counterVersionRule(value) {
      const result = this.rules.counterVersion(value);
      return result === true ? null : result;
    },
    counterTelRule(value) {
      const result = this.rules.counterTelephone(value);
      return result === true ? null : result;
    },
    onlyNumbersRule(value) {
      const result = this.rules.onlyNumbers(value);
      return result === true ? null : result;
    },
    alphaRefRule(value) {
      const result = this.rules.alphaNumReference(value);
      return result === true ? null : result;
    },
    urlFormatRule(value) {
      const result = this.rules.urlFormat(value);
      return result === true ? null : result;
    },
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
        await this.updateMaterial()
        if (this.allIsCorrect) {
          this.dialog = false
        }
      },

    async updateMaterial() {
      try {
        const docRef = doc(db, "MATERIELS", this.matId);
        const docSnap = await getDoc(docRef);
        this.booked=!this.noBooked;

        if (docSnap.exists() && this.booked) {
          if (this.requiredRule(this.nom) !== null || this.requiredRule(this.version) !== null || this.requiredRule(this.reference) !== null) {
            alert("Les champs requis ne doivent pas être vides.");
            this.allIsCorrect = false;
          } else if (this.counterNomRule(this.nom) !== null) {
            alert("Le nom est invalide.");
            this.allIsCorrect = false;
          } else if (this.counterVersionRule(this.version) !== null) {
            console.log(this.counterVersionRule(this.version));
            alert("La version est invalide.");
            this.allIsCorrect = false;
          } else if (this.alphaRefRule(this.reference) !== null ) {
            alert("La référence est invalide.");
            this.allIsCorrect = false;
          } else if (this.counterTelRule(this.num_telephone) !== null || this.onlyNumbersRule(this.num_telephone) !== null) {
            alert("Le numéro de téléphone est invalide.");
            this.allIsCorrect = false;
          } else if (this.urlFormatRule(this.photo) !== null) {
            alert("L'URL de la photo est invalide.");
            this.allIsCorrect = false;
          } else {
            await updateDoc(docRef, {
              reference: this.reference,
              num_telephone: this.num_telephone,
              photo: this.photo,
              version: this.version,
              nom: this.nom,
            });
            console.log("Document trouvé :", docSnap.data());
            alert("Matériel mis à jour avec succès !");
            this.allIsCorrect = true;
            return docSnap.data();
          }


        }
        else if(docSnap.exists() && !this.booked){
          if (this.requiredRule(this.nom) !== null || this.requiredRule(this.version) !== null || this.requiredRule(this.reference) !== null) {
            alert("Les champs requis ne doivent pas être vides.");
            this.allIsCorrect = false;
          } else if (this.counterNomRule(this.nom) !== null) {
            alert("Le nom est invalide.");
            this.allIsCorrect = false;
          } else if (this.counterVersionRule(this.version) !== null) {
            console.log(this.counterVersionRule(this.version));
            alert("La version est invalide.");
            this.allIsCorrect = false;
          } else if (this.alphaRefRule(this.reference) !== null ) {
            alert("La référence est invalide.");
            this.allIsCorrect = false;
          } else if (this.counterTelRule(this.num_telephone) !== null || this.onlyNumbersRule(this.num_telephone) !== null) {
            alert("Le numéro de téléphone est invalide.");
            this.allIsCorrect = false;
          } else if (this.urlFormatRule(this.photo) !== null) {
            alert("L'URL de la photo est invalide.");
            this.allIsCorrect = false;
          } else {
            await updateDoc(docRef, {
              reference: this.reference,
              num_telephone: this.num_telephone,
              photo: this.photo,
              version: this.version,
              nom: this.nom,
              booked:this.booked,
              dateDebut:"",
              dateFin:"",
              emprunteur:"",
            });
            console.log("Document trouvé :", docSnap.data());
            alert("Matériel créé avec succès !");
            this.allIsCorrect = true;
            return docSnap.data();
          }


        }
        else {
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
.bouton2{
  padding:3px;
  margin-top:20px;
}

.bouton3{
  padding:3px;


}
</style>