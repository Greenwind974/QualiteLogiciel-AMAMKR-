<template >
  <h1>Mes réservations</h1>

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
              <v-img max-width="10em"
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
                    <BookMaterial :mat-id=mat ></BookMaterial>
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
import {collection, query,  getDocs, where} from "firebase/firestore";
import {db} from "@/firebase";

import BookMaterial from "@/components/Material/BookMaterial.vue";
import {getAuth} from "firebase/auth";


export default {
  components: {BookMaterial},
  data(){
    return { materiels: new Map(),
    userEmail:""}

  },
  methods:{
    async readMaterials(){
      await this.fetchUserEmail()
      const querySnap=await getDocs(query(collection(db, "MATERIELS"), where("emprunteur", "==", this.userEmail)))
      querySnap.forEach((mat)=>{
        this.materiels.set(mat.id,mat.data())
      })
      console.log(this.materiels)

    },
    async fetchUserEmail(){
      const auth = getAuth();
      this.user = auth.currentUser;
      this.userEmail=this.user.email;
    }

  },
  created() {
    this.readMaterials()
  },
  async updated() {
    await this.readMaterials()


  }
}

</script>

<style scoped>
.carte{
  height:180px;
  width:60%;
}
h1{
  text-align: center;
  font-size: xxx-large;
  color:white;
}


</style>
