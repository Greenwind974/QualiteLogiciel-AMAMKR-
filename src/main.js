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

import router from "@/router/router";
import UpdateMaterial from "@/components/Material/UpdateMaterial.vue";
import CreateMaterial from "@/components/Material/CreateMaterial.vue";
import DeleteMaterial from "@/components/Material/DeleteMaterial.vue";
import BookMaterial from "@/components/Material/BookMaterial.vue";
import MaterialDisplayPage from "@/components/Material/MaterialDisplayPage.vue";
import ManageMaterialPage from "@/components/Material/ManageMaterialPage.vue";




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


app.component('MaterialDisplayPage',MaterialDisplayPage)
app.component('ManageMaterialPage',ManageMaterialPage)
app.component('UpdateMaterial',UpdateMaterial)
app.component('CreateMaterial',CreateMaterial)
app.component('DeleteMaterial', DeleteMaterial)
app.component('BookMaterial',BookMaterial)

app.mount('#app')
