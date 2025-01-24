<template >

  <v-container >
    <v-layout row wrap class="mb-2"
              v-for="mat in materiels"
              :key="mat.id">
      <v-row justify="center">
        <v-card variant="flat"
                color="secondary"
                class="carte"
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
              <v-card-text>téléphone : {{mat.num_telephone}}
                <v-spacer></v-spacer>
                référence : {{mat.reference}}</v-card-text>
            </v-container>
            <v-divider vertical></v-divider>
            <v-container>
              <v-layout col wrap class="mb-2">

                <v-col>
                  <v-row justify="space-around">
                    <BookMaterial :materiel=mat></BookMaterial>
                  </v-row>

                </v-col>
              </v-layout>
            </v-container>
          </v-layout>
        </v-card>
      </v-row>

    </v-layout>


  </v-container>
</template>

<script>
import {collection, query, addDoc, getDocs, doc, deleteDoc} from "firebase/firestore";
import {db} from "@/firebase";
import BookMaterial from "@/components/Material/BookMaterial.vue";

export default {
  components: {BookMaterial},
  data(){
    return { materiels:[]}

  },
  methods:{
    async createMaterial(){
      const colMat = collection(db, "MATERIELS")
      const dataObj={
        nom:"ASUS Zenbook",
        num_telephone:"",
        photo:'https://www.accessoires-asus.com/images/articles/126495/276379967742.jpg',
        reference:"AN321",
        version:"V15",
      }
      const docRef = await addDoc(colMat, dataObj)
      console.log('Doc id :', docRef.id)
    },
    async readMaterials(){
      const querySnap=await getDocs(query(collection(db, "MATERIELS")))
      querySnap.forEach((mat)=>{
        this.materiels.push(mat.data())
      })
    },
    async dropMaterial(){
      await deleteDoc(doc(db, 'MATERIELS', 'VJwGVd962wipdRBMRMhD'))
    }

  },
  created(){
    //this.createMaterial()
    this.readMaterials()
    //this.dropMaterial()
  }
}



</script>

<style scoped>
.carte{
  height:180px;
  width:50%;
}
.bouton{
  padding:3px;
  margin-top:30px;
}


</style>
