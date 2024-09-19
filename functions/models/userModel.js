import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig.js"; // Archivo con la configuración de Firebase

// Obtener usuarios por ID del equipo
export const getUsersByTeamId = async (teamId) => {
    try {
        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, where('teamId', '==', teamId));
        const usersSnapshot = await getDocs(q);
        const usersList = usersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return usersList;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

// Obtener un usuario por ID
export const getUserById = async (userId) => {
    try {
        const userRef = doc(db, 'users', userId);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
            return { id: userSnapshot.id, ...userSnapshot.data() };
        } else {
            console.log("User not found");
            return null;
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
};

// Crear un nuevo usuario
export const createUser = async (user) => {
    try {
        const usersCollection = collection(db, 'users');
        const docRef = await addDoc(usersCollection, user);
        return docRef.id;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

// Actualizar un usuario existente
export const updateUser = async (userId, updatedUser) => {
    try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, updatedUser);
        console.log(`User with ID ${userId} updated`);
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

// Eliminar un usuario
export const deleteUser = async (userId) => {
    try {
        const userRef = doc(db, 'users', userId);
        await deleteDoc(userRef);
        console.log(`User with ID ${userId} deleted`);
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};
