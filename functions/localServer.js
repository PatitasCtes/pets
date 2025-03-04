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
const router = express.Router();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas de mascotas
router.get("/pets", fetchPetsByCriteria); // Obtener mascotas por criterios
router.get("/pets/uid/:petUID", fetchPetByUID); // Obtener una mascota por UID
router.get("/pets/:petId", fetchPetById); // Obtener una mascota por ID
router.post("/pets", addPet); // Crear una nueva mascota
router.put("/pets/:petId", updatePetById); // Actualizar una mascota por ID
router.delete("/pets/:petId", deletePetById); // Eliminar una mascota por ID

// Registrar rutas
app.use("/api", router);

// Configuración del servidor local
const port = process.env.PORT || 4006;
app.listen(port, () => {
    console.log(`Pets Service is running on http://localhost:${port}`);
});

// Exportar para serverless (si lo necesitas)
export const handler = serverless(app);


//--> node ./functions/localServer.js


/*
POST http://localhost:4006/api/pets

{
  "name": "Buddy",
  "description": "Golden Retriever joven y juguetón.",
  "breed": "Golden Retriever",
  "age": 2,
  "birthdate": "2021-05-15",
  "petUID": "12345-abc",
  "animal": "Dog",
  "litter": null,
  "sponsor": "Fundación Mascota Feliz",
  "adopter": null,
  "obs": "Requiere entrenamiento básico.",
  "status": "Disponible",
  "rescueDate": "2023-01-10",
  "adoptionDate": null,
  "castred": true,
  "castredObs": "Castrado en enero de 2023.",
  "vaccinated": true,
  "vaccinatedObs": "Vacunas al día.",
  "feelingsWithCats": 3,
  "feelingsWithCatsObs": "Tolerante.",
  "feelingsWithDogs": 5,
  "feelingsWithDogsObs": "Sociable y juguetón.",
  "feelingsWithPeople": 5,
  "feelingsWithPeopleObs": "Excelente con niños.",
  "bookID": "56789-book"
}


GET http://localhost:4006/api/pets?castred=true&status=Disponible&vaccinated=true

Parámetros de Consulta (Query):

castred=true: Solo mascotas castradas.
status=Disponible: Solo mascotas disponibles.
vaccinated=true: Solo mascotas vacunadas.

*/