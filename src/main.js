import { createApp } from "vue";
import App from "./App.vue";
import "bulma/css/bulma.css";

import { db, auth } from "./firebase.js";
import router from "@/router/router";

const app = createApp(App);

app.config.globalProperties.$db = db;
app.config.globalProperties.$auth = auth;
app.use(router);

app.mount("#app");
