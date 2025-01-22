import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import { auth, db} from "@/firebase";
import {doc, setDoc, getDoc, updateDoc} from "firebase/firestore";
import router from "@/router/router";


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
            FirstConnection : additionalData.firstConnection || false,
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
        // Save user data
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        // Save user id
        const uid = userCredential.user.uid;
        // Save reference of user
        const userRef = doc(db, "UTILISATEURS", uid); // Collection "UTILISATEURS"
        const userDoc = await getDoc(userRef);
        // If reference exists
        if (userDoc.exists()) {
            console.log(userDoc.data())
            // If user is connected for the first time
            if (userDoc.data().FirstConnection === true) {
                console.log("First connection true");
                // Go to change-password page
                router.push("/change-password");
                // set FirstConnection to false
                await updateDoc(userRef, {
                    FirstConnection: false
                });
            // If user has been connected before
            } else {
                console.log("First connection false");
                // Go to home page
                router.push("/home");
            }
        // If reference does not exist
        } else {
            console.log("Rien");
        }
    } catch (error) {
        console.error("Error during sign-in:", error);
        throw error;
    }
};
