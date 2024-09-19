import { getUsersByTeamId, createUser, getUserById, updateUser, deleteUser, getUserByUID } from "../models/userModel.js";

// Obtener usuarios por ID del equipo
export const fetchUsers = async (req, res) => {
    const { teamId } = req.query;

    if (!teamId) {
        return res.status(400).json({ message: "Team ID is required" });
    }

    try {
        const users = await getUsersByTeamId(teamId);
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Error fetching users" });
    }
};

// Obtener un usuario por ID
export const fetchUserById = async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        const user = await getUserById(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Error fetching user" });
    }
};

// Obtener un usuario por UID (nuevo endpoint)
export const fetchUserByUID = async (req, res) => {
    const { userId } = req.query; // Ahora usa req.query en lugar de req.params

    if (!userId) {
        return res.status(400).json({ message: "UID is required" });
    }

    try {
        const user = await getUserByUID(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching user by UID:", error);
        res.status(500).json({ message: "Error fetching user" });
    }
};


// Crear un nuevo usuario
export const addUser = async (req, res) => {
    const { name, rol, description, email, teamId, isAdmin, photoURL, UID } = req.body;

    if (!name || !email || !teamId || !UID) {
        return res.status(400).json({ message: "Name, email, teamId, and UID are required" });
    }

    try {
        const userId = await createUser({ name, rol, description, email, teamId, isAdmin, photoURL, UID });
        res.status(201).json({ message: "User created", userId });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Error creating user" });
    }
};

// Actualizar un usuario existente
export const updateUserById = async (req, res) => {
    const { userId } = req.params;
    const { name, rol, description, email, teamId, isAdmin, photoURL } = req.body;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        const updatedUser = { name, rol, description, email, teamId, isAdmin, photoURL };

        // Filtrar campos no provistos
        Object.keys(updatedUser).forEach(key => updatedUser[key] === undefined && delete updatedUser[key]);

        await updateUser(userId, updatedUser);
        res.status(200).json({ message: "User updated" });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Error updating user" });
    }
};

// Eliminar un usuario por ID
export const deleteUserById = async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        await deleteUser(userId);
        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Error deleting user" });
    }
};
