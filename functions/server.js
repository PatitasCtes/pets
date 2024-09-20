import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import { fetchUsers, addUser, fetchUserById, fetchUserByUID, updateUserById, deleteUserById } from "./controllers/userController.js";

const app = express();
app.use(cors());
app.use(express.json());
const router = express.Router();

// Rutas de usuarios
router.get("/users", fetchUsers); // Obtener usuarios por teamId
router.post("/users", addUser); // Crear un nuevo usuario
router.get("/users/uid/:UID", fetchUserByUID); // Obtener un usuario por UID
router.get("/users/:userId", fetchUserById); // Obtener un usuario por ID
router.put("/users/:userId", updateUserById); // Actualizar un usuario por ID
router.delete("/users/:userId", deleteUserById); // Eliminar un usuario por ID

// Registrar las rutas de usuarios
app.use('/.netlify/functions/server', router);

export const handler = serverless(app);
