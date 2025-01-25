import { createRouter, createWebHistory } from "vue-router";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
import LoginPage from "@/components/LoginPage.vue";
import UserProfile from "@/components/UserProfile.vue";
import SignupUserPage from "@/components/SignupUserPage.vue";
import HomePage from "@/components/HomePage.vue";
import ManageUserPage from "@/components/ManageUserPage.vue";
import ManageMaterialPage from "@/components/Material/ManageMaterialPage.vue";
import MaterialDisplayPage from "@/components/Material/MaterialDisplayPage.vue";
import ReservationDisplayPage from "@/components/Reservation/ReservationDisplayPage.vue";


const routes = [
    { path: "/", name: "Login", component: LoginPage },
    { path: "/profile", name: "Profile", component: UserProfile, meta: { requiresAuth: true } },
    { path: "/signup-user", name: "SignupUser", component: SignupUserPage, meta: { requiresAuth: true, requiresRole: "ADMIN" }},
    {path: "/home", name: "Home", component: HomePage},
    {path: "/manage-users", name: 'ManageUser', component: ManageUserPage,meta: {requiresAuth: true, requiresRole: "ADMIN" }},
    {path: "/manage-materials", name: 'ManageMaterial', component: ManageMaterialPage,meta: {requiresAuth: true, requiresRole: "ADMIN" }},
    {path: "/material", name: 'Material', component: MaterialDisplayPage, meta: { requiresAuth: true }},
    {path: "/reservations", name: 'Reservations', component: ReservationDisplayPage, meta: { requiresAuth: true }},


];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Vérification de rôle pour les routes
router.beforeEach((to, from, next) => {
    onAuthStateChanged(auth, async (user) => {
        if (!user && to.meta.requiresAuth) {
            next("/");
        } else if (user) {
            const userRef = doc(db, "UTILISATEURS", user.uid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const userRole = userDoc.data().Role;
                if (to.meta.requiresRole && to.meta.requiresRole !== userRole) {
                    next("/home"); // Redirige les utilisateurs non autorisés
                } else {
                    next();
                }
            } else {
                next("/"); // Redirige si les données utilisateur sont introuvables
            }
        } else {
            next(); // Continue si aucune vérification n'est requise
        }
    });
});
export default router;