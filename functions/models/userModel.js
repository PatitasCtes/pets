// Importa Firebase y Firestore
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, query, where } from "firebase/firestore";

// Configura Firebase (usa tu propia configuración obtenida de Firebase Console)
const firebaseConfig = {
    apiKey: "AIzaSyCx8GI5km0guJojFuOb9KDKNSclqFQBhLI",
    authDomain: "taskban-v1.firebaseapp.com",
    projectId: "taskban-v1",
    storageBucket: "taskban-v1.appspot.com",
    messagingSenderId: "774075443466",
    appId: "1:774075443466:web:0b1ccf90595264ef8872f3",
    measurementId: "G-1MCX6F9W86"
};

// Inicializa Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
