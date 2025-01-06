import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import { auth, db} from "@/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import router from "../router/router";

export const addOrUpdateUser = async (uid, email, additionalData) => {
    const userRef = doc(db, "UTILISATEURS", uid); // Collection "UTILISATEURS"
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
        await setDoc(userRef, {
            FirstName: additionalData.firstName || "Prénom inconnu", // Valeur par défaut
            LastName: additionalData.lastName || "Nom inconnu",     // Valeur par défaut
            Department: additionalData.department || "Non spécifié",
            Email: email,
            Role : additionalData.role || "No role ",
            createdAt: new Date().toISOString(),
        });
    }
};

export const signUp = async (email, password, additionalData) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await addOrUpdateUser(userCredential.user.uid, email, additionalData);
    return userCredential;
};

export const signOutUser = () => {
    return signOut(auth);
};

export const observeAuthState = (callback) => {
    return onAuthStateChanged(auth, callback);
};

export const signInAndRedirect = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        router.push("/home");
    } catch (error) {
        console.error("Error during sign-in:", error);
        throw error;
    }
};
