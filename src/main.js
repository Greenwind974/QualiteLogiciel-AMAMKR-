import { createApp } from "vue";
import App from "./App.vue";
import "bulma/css/bulma.css";

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import colors from 'vuetify/util/colors'


import "@mdi/font/css/materialdesignicons.css"

import { db, auth } from "./firebase.js";
import {collection, getDocs} from "firebase/firestore";

import router from "@/router/router";
import {createStore} from "vuex";
import UpdateMaterial from "@/components/Material/UpdateMaterial.vue";
import CreateMaterial from "@/components/Material/CreateMaterial.vue";




const app = createApp(App);

app.config.globalProperties.$db = db;
app.config.globalProperties.$auth = auth;
app.use(router);

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: "mdi", // This is already the default value - only for display purposes
    },
    theme: {
        themes: {
            dark: {
                light:false,
                colors: {
                    primary: colors.indigo.base,
                    secondary: colors.indigo.lighten5,
                    accent: colors.green.darken1,
                    warning : colors.red.accent4,
                }
            },
            light: {
                dark:false,
                colors: {
                    primary: colors.indigo.base,
                    secondary: colors.indigo.lighten5,
                    accent: colors.green.darken1,
                    warning : colors.red.accent4,
                }
            },
        },
    },
})

app.use(vuetify)

const store=createStore({
    state : {
        loadedMaterials:[
            {
                id:"lifhkbjzn",
                nom:"Samsung S10",
                num_telephone:"0123456789",
                photo:'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s10-1.jpg',
                reference:"AN123",
                version:"V3.0",
            },
            {
                id:"pojihujvg",
                nom:"Samsung S2",
                num_telephone:"0123456789",
                photo:'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s10-1.jpg',
                reference:"AN456",
                version:"V3.0",
            },
            {
                id:"mlkjhg",
                nom:"Samsung S5",
                num_telephone:"0123456789",
                photo:'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s10-1.jpg',
                reference:"AN789",
                version:"V3.0",
            }
        ],



    },
    mutations: {
        setLoadedMaterials(state, payload){
            state.loadedMaterials = payload
        }
    },
    actions:{

        loadMaterials({commit}){
            getDocs(collection(db,"MATERIELS")).then((data=>data.forEach((mat)=> {
                const materials = []
                const obj = mat.val()
                for (let key in obj) {
                    materials.push({
                        id: key,
                        nom: obj[key].nom,
                        num_telephone: obj[key].num_telephone,
                        photo: obj[key].photo,
                        reference: obj[key].reference,
                        version: obj[key].version
                    })
                }
                commit('setLoadedMaterials', materials)
            })));
    },},
    getters:{


        loadedMaterials(state){
            return state.loadedMaterials
        },
        loadedMaterial(state){
            return (materialId)=>{
                return state.loadedMaterials.find((material)=>{
                    return material.id === materialId
                })
            }
        }
    }
})

app.use(store)

app.component('UpdateMaterial',UpdateMaterial)
app.component('CreateMaterial',CreateMaterial)

app.mount('#app')
