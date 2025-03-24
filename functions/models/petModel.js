import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    doc,
} from "firebase/firestore";

import dotenv from 'dotenv';
dotenv.config();

const firebaseConfig = {
    apiKey: process.env.VITE_API_KEY,
    authDomain: process.env.VITE_AUTH_DOMAIN,
    projectId: process.env.VITE_PROJECT_ID,
    storageBucket: process.env.VITE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_APP_ID,
    measurementId: process.env.VITE_MEASUREMENT_ID,
};

// Inicialización de Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// Agregar un book (colección de fotos) a una mascota
// Agregar un book (colección de fotos) a una mascota
export const addBookToPet = async (petId, photos) => {
    const petRef = doc(db, 'pets', petId);  // Cambio aquí
    const petDoc = await getDoc(petRef);   // También actualizamos para obtener el documento

    if (!petDoc.exists()) {
        throw new Error("Pet not found");
    }

    // Añadir las fotos al campo book
    await updateDoc(petRef, {
        book: photos
    });

    return { message: "Book added to pet successfully" };
};


// Crear una nueva foto para el book
export const createPhoto = (url, isCoverPhoto) => {
    return {
        url,
        isCoverPhoto
    };
};

// Obtener mascotas según criterios específicos
export const getPetsByCriteria = async (filters) => {
    try {
        const petsCollection = collection(db, "pets");
        let q = query(petsCollection);

        Object.entries(filters).forEach(([key, value]) => {
            if (key === "feelingsWithCats" || key === "feelingsWithDogs" || key === "feelingsWithPeople") {
                q = query(q, where(key, ">=", value));
            } else {

                q = query(q, where(key, "==", value));
            }
        });

        const petsSnapshot = await getDocs(q);
        return petsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching pets by criteria:", error);
        throw error;
    }
};

// Obtener una mascota por ID
export const getPetById = async (petId) => {
    try {
        const petRef = doc(db, "pets", petId);
        const petSnapshot = await getDoc(petRef);
        if (petSnapshot.exists()) {
            return { id: petSnapshot.id, ...petSnapshot.data() };
        }
        return null;
    } catch (error) {
        console.error("Error fetching pet:", error);
        throw error;
    }
};

// Obtener una mascota por UID
export const getPetByUID = async (petUID) => {
    try {
        const petsCollection = collection(db, "pets");
        const q = query(petsCollection, where("petUID", "==", petUID));
        const petsSnapshot = await getDocs(q);

        if (!petsSnapshot.empty) {
            const pet = petsSnapshot.docs[0];
            return { id: pet.id, ...pet.data() };
        }
        return null;
    } catch (error) {
        console.error("Error fetching pet by UID:", error);
        throw error;
    }
};

// Crear una nueva mascota
export const createPet = async (pet) => {
    try {
        const petsCollection = collection(db, "pets");
        const docRef = await addDoc(petsCollection, pet);
        return docRef.id;
    } catch (error) {
        console.error("Error creating pet:", error);
        throw error;
    }
};

// Actualizar una mascota existente
export const updatePet = async (petId, updatedPet) => {
    try {
        const petRef = doc(db, "pets", petId);
        await updateDoc(petRef, updatedPet);
    } catch (error) {
        console.error("Error updating pet:", error);
        throw error;
    }
};

// Eliminar una mascota por ID
export const deletePet = async (petId) => {
    try {
        const petRef = doc(db, "pets", petId);
        await deleteDoc(petRef);
    } catch (error) {
        console.error("Error deleting pet:", error);
        throw error;
    }
};
