// Imports
import { auth, db } from "@/firebase";
import {doc, getDoc} from "firebase/firestore";

// Recupération des données de l'utilisateur
export const fetchUserData = async () => {
    try {
        const user = auth.currentUser;
        if (user) {
            const userId = user.uid;
            const userDocRef = doc(db, "UTILISATEURS", userId);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                return userDoc.data();
            } else {
                console.error("No user document found in Firestore.");
                return null;
            }
        } else {
            console.error("No authenticated user found.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};
