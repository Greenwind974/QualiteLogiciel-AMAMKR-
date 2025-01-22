import { createRouter, createWebHistory } from "vue-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import LoginPage from "@/components/LoginPage.vue";
import UserProfile from "@/components/UserProfile.vue";
import SignupUserPage from "@/components/SignupUserPage.vue";
import HomePage from "@/components/HomePage.vue";
import ManageUserPage from "@/components/ManageUserPage.vue";
import ChangePassword from "@/components/ChangePassword.vue";

const routes = [
    { path: "/", name: "Login", component: LoginPage },
    { path: "/profile", name: "Profile", component: UserProfile, meta: { requiresAuth: true } },
    { path: "/signup-user", name: "SignupUser", component: SignupUserPage },
    {path: "/home", name: "Home", component: HomePage},
    {path: "/manage-users", name: 'ManageUser', component: ManageUserPage},
    {path: "/change-password", name: 'ChangePassword', component: ChangePassword}
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
