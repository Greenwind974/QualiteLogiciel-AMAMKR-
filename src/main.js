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

app.mount("#app");