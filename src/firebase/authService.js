// Imports
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth, db} from "@/firebase";
import {doc, setDoc, getDoc, updateDoc} from "firebase/firestore";
import router from "../router/router";

// Validation Regex
const validateUserData = (data) => {
    const nameRegex = /^[a-zA-Z0-9\s]{1,30}$/; // Alphanumérique, 1-30 caractères
    const emailRegex =/^[^@\s]+@[^@\s]+\.[^@\s]+$/; // Format d'un email
    const errors = [];

    if (!nameRegex.test(data.firstName)) {
        errors.push("Le prénom doit être alphanumérique (1-30 caractères).");
    }
    if (!nameRegex.test(data.lastName)) {
        errors.push("Le nom doit être alphanumérique (1-30 caractères).");
    }
    if (!emailRegex.test(data.email)) {
        errors.push("L'adresse email est invalide.");
    }
    if (!nameRegex.test(data.matricule)) {
        errors.push("Le département doit être alphanumérique (1-30 caractères).");
    }

    return errors.length > 0 ? errors : null;
};


// Ajout ou mise à jour d'un utilisateur et de ces données
export const addOrUpdateUser = async (uid, email, additionalData) => {
    const userRef = doc(db, "UTILISATEURS", uid); // Collection "UTILISATEURS"
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
        await setDoc(userRef, {
            FirstName: additionalData.firstName || "Prénom inconnu",
            LastName: additionalData.lastName || "Nom inconnu",
            Matricule: additionalData.matricule || "Non spécifié",
            Email: email,
            Role: additionalData.role || "No role",
            createdAt: new Date().toISOString(),
            firstLogin: true,
        });
    }
};

// Inscription d'un nouvel utilisateur
export const signUp = async (email, password, additionalData ) => {

    const validationErrors = validateUserData({
        firstName: additionalData.firstName,
        lastName: additionalData.lastName,
        email: email,
        matricule: additionalData.matricule,
        firstLogin: additionalData.firstLogin
    });

    if (validationErrors) {
        throw new Error(validationErrors.join("\n"));
    }
    //Création d'un compte authentication + Ajout dans la collection Database
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await addOrUpdateUser(userCredential.user.uid, email, additionalData);
        return userCredential;
    } catch (error) {
        if (error.code === "auth/email-already-in-use") {
            throw new Error("ERR_EXIST : Un utilisateur avec cet email existe déjà.");
        }
        if (error.code === "auth/invalid-email") {
            throw new Error("ERR_INVALID : L'adresse email est invalide.");
        }
        throw new Error("ERR_SYSTEM : Une erreur technique s'est produite. Réessayez plus tard.");
    }
};

// Déconnexion
export const signOutUser = () => {
    return signOut(auth);
};

// Connexion et vérification de la première connexion
export const signInAndRedirect = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userRef = doc(db, "UTILISATEURS", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists() && userDoc.data().firstLogin) {
            console.log("First login")
            // Rediriger l'utilisateur vers une page pour changer son mot de passe
            await router.push("/change-password");
            // Change boolean to false
            await updateDoc(userRef, {
                firstLogin: false
            });
        } else {
            console.log("Not first");
            router.push("/home");
        }
    } catch (error) {
        console.error("Error during sign-in:", error);
        throw error;
    }
};

