import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "@/firebase";
import {doc, getDoc} from "firebase/firestore";

export const fetchMaterialData = async () => {
    try {
        const user = auth.currentUser;
        if (user) {
            const materialDocRef = doc(db, "MATERIELS");
            const materialDoc = await getDoc(materialDocRef);

            if (materialDoc.exists()) {
                return materialDoc.data();
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

export const observeAuthStateAndFetchData = (callback) => {
    return onAuthStateChanged(auth, async (material) => {
        if (material) {
            const materialData = await fetchMaterialData();
            callback(materialData);
        } else {
            callback(null);
        }
    });
};

