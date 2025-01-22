import { createRouter, createWebHistory } from "vue-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
//import LoginPage from "@/components/LoginPage.vue";
import UserProfile from "@/components/UserProfile.vue";
import SignupUserPage from "@/components/SignupUserPage.vue";
import HomePage from "@/components/HomePage.vue";
import ManageUserPage from "@/components/ManageUserPage.vue";
import ManageMaterialPage from "@/components/Material/ManageMaterialPage.vue";
import CreateMaterial from "@/components/Material/CreateMaterial.vue";
import MaterialDisplayPage from "@/components/Material/MaterialDisplayPage.vue";
import UpdateMaterial from "@/components/Material/UpdateMaterial.vue";

const routes = [
    { path: "/", name: "Login", component: ManageMaterialPage },
    { path: "/profile", name: "Profile", component: UserProfile, meta: { requiresAuth: true } },
    { path: "/signup-user", name: "SignupUser", component: SignupUserPage },
    {path: "/home", name: "Home", component: HomePage},
    {path: "/manage-users", name: 'ManageUser', component: ManageUserPage},
    {path: "/material/manage", name: 'ManageMaterial', component: ManageMaterialPage},
    {path: "/material/new", name :'CreateMaterial', component: CreateMaterial},
    {path: "/material/update", name: 'UpdateMaterial', component: UpdateMaterial},
    {path: "/material", name: 'Material', component: MaterialDisplayPage},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    onAuthStateChanged(auth, (user) => {
        if (to.meta.requiresAuth && !user) {
            next("/");
        } else {
            next();
        }
    });
});

export default router;
