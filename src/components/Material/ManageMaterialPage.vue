<template >
  <v-container >
    <v-layout col>

      <v-col>
        filter
      </v-col>
      <v-col>
        <template v-if="true"><CreateMaterial></CreateMaterial></template>
      </v-col>
    </v-layout>
  </v-container>

  <v-divider></v-divider>
  <v-container >
      <v-layout row wrap class="mb-2"
                v-for="mat in materiels.keys()"
                :key="mat">
        <v-row justify="center">
          <v-card variant="flat"
                  color="secondary"
                  class="carte"
          >
            <v-layout row>
              <v-container>
                <v-img width="10em"
                       contain
                       :src="this.materiels.get(mat).photo">
                </v-img>
              </v-container>
              <v-container>
                <v-card-title>{{this.materiels.get(mat).nom}}</v-card-title>
                <v-card-subtitle>version : {{this.materiels.get(mat).version}}</v-card-subtitle>
                <v-card-text>téléphone : {{this.materiels.get(mat).num_telephone}}
                  <v-spacer></v-spacer>
                  référence : {{this.materiels.get(mat).reference}}</v-card-text>
              </v-container>
              <v-divider vertical></v-divider>
              <v-container>
                <v-layout col wrap class="mb-2">

                  <v-col>
                    <v-row justify="space-around">
                      <UpdateMaterial :mat-id=mat></UpdateMaterial>
                    </v-row>

                   <v-row justify="space-around">
                     <DeleteMaterial :mat-id=mat></DeleteMaterial>
                     </v-row>

                    <v-card-text v-if="this.materiels.get(mat).booked">
                      Indisponible
                    </v-card-text>
                    <v-card-text v-if="!this.materiels.get(mat).booked">
                      Disponible
                    </v-card-text>

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
import CreateMaterial from "@/components/Material/CreateMaterial.vue";
import UpdateMaterial from "@/components/Material/UpdateMaterial.vue";
import DeleteMaterial from "@/components/Material/DeleteMaterial.vue";

  export default {
    components: {DeleteMaterial, UpdateMaterial, CreateMaterial},
    data(){
      return { materiels: new Map()}

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
          this.materiels.set(mat.id,mat.data())
        })
        console.log(this.materiels)
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
