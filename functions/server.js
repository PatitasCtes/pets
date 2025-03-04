import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import {
    fetchPetsByCriteria,
    addPet,
    fetchPetById,
    fetchPetByUID,
    updatePetById,
    deletePetById,
} from "./controllers/petController.js";
const app = express();
app.use(cors());
app.use(express.json());
const router = express.Router();

// Rutas de mascotas
// Rutas de mascotas
router.get("/pets", fetchPetsByCriteria); // Obtener mascotas por criterios
router.get("/pets/uid/:petUID", fetchPetByUID); // Obtener una mascota por UID
router.get("/pets/:petId", fetchPetById); // Obtener una mascota por ID
router.post("/pets", addPet); // Crear una nueva mascota
router.put("/pets/:petId", updatePetById); // Actualizar una mascota por ID
router.delete("/pets/:petId", deletePetById); // Eliminar una mascota por ID

// Registrar las rutas de mascotas
app.use('/.netlify/functions/server', router);

export const handler = serverless(app);
