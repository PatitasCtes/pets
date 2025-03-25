import {
    createPet,
    getPetById,
    updatePet,
    deletePet,
    getPetByUID,
    getPetsByCriteria,
    addBookToPet,
    createPhoto
} from "../models/petModel.js";

// Agregar un book a la mascota
export const addBook = async (req, res) => {
    const { petId, photos } = req.body;

    if (!petId || !photos) {
        return res.status(400).json({ message: "Pet ID and photos are required" });
    }

    try {
        // Validar que cada foto tiene el formato correcto
        const validPhotos = photos.map(photo => {
            if (!photo.url) {
                throw new Error("Each photo must have a URL");
            }
            return createPhoto(photo.url, photo.isCoverPhoto || false);
        });

        const result = await addBookToPet(petId, validPhotos);
        res.status(201).json(result);
    } catch (error) {
        console.error("Error adding book to pet:", error);
        res.status(500).json({ message: error.message || "Error adding book to pet" });
    }
};

// Obtener mascotas según criterios específicos
export const fetchPetsByCriteria = async (req, res) => {
    const { castred, status, vaccinated, feelingsWithCats, feelingsWithDogs, feelingsWithPeople } = req.query;

    try {
        const filters = {
            ...(castred !== undefined && { castred: castred === "true" }),
            ...(status && { status }),
            ...(vaccinated !== undefined && { vaccinated: vaccinated === "true" }),
            ...(feelingsWithCats && { feelingsWithCats: parseInt(feelingsWithCats, 10) }),
            ...(feelingsWithDogs && { feelingsWithDogs: parseInt(feelingsWithDogs, 10) }),
            ...(feelingsWithPeople && { feelingsWithPeople: parseInt(feelingsWithPeople, 10) }),
        };

        const pets = await getPetsByCriteria(filters);
        res.json(pets);
    } catch (error) {
        console.error("Error fetching pets by criteria:", error);
        res.status(500).json({ message: "Error fetching pets" });
    }
};

// Obtener una mascota por ID
export const fetchPetById = async (req, res) => {
    const { petId } = req.params;

    if (!petId) {
        return res.status(400).json({ message: "Pet ID is required" });
    }

    try {
        const pet = await getPetById(petId);
        if (pet) {
            res.json(pet);
        } else {
            res.status(404).json({ message: "Pet not found" });
        }
    } catch (error) {
        console.error("Error fetching pet:", error);
        res.status(500).json({ message: "Error fetching pet" });
    }
};

// Obtener una mascota por UID
export const fetchPetByUID = async (req, res) => {
    const { petUID } = req.params;

    if (!petUID) {
        return res.status(400).json({ message: "Pet UID is required" });
    }

    try {
        const pet = await getPetByUID(petUID);
        if (pet) {
            res.json(pet);
        } else {
            res.status(404).json({ message: "Pet not found" });
        }
    } catch (error) {
        console.error("Error fetching pet by UID:", error);
        res.status(500).json({ message: "Error fetching pet" });
    }
};

// Crear una nueva mascota
export const addPet = async (req, res) => {
    const {
        name,
        description,
        breed,
        age,
        birthdate,
        petUID,
        animal,
        litter,
        sponsor,
        adopter,
        obs,
        status,
        rescueDate,
        adoptionDate,
        castred,
        castredObs,
        vaccinated,
        vaccinatedObs,
        feelingsWithCats,
        feelingsWithCatsObs,
        feelingsWithDogs,
        feelingsWithDogsObs,
        feelingsWithPeople,
        feelingsWithPeopleObs,
        bookID,
        size,
        gender
    } = req.body;

    if (!name || !animal || !status) {
        return res.status(400).json({ message: "Name, animal and status are required" });
    }

    try {
        const petId = await createPet({
            name,
            description,
            breed,
            age,
            birthdate,
            petUID,
            animal,
            litter,
            sponsor,
            adopter,
            obs,
            status,
            rescueDate,
            adoptionDate,
            castred,
            castredObs,
            vaccinated,
            vaccinatedObs,
            feelingsWithCats,
            feelingsWithCatsObs,
            feelingsWithDogs,
            feelingsWithDogsObs,
            feelingsWithPeople,
            feelingsWithPeopleObs,
            bookID,
            size,
            gender
        });
        res.status(201).json({ message: "Pet created", petId });
    } catch (error) {
        console.error("Error creating pet:", error);
        res.status(500).json({ message: "Error creating pet" });
    }
};

// Actualizar una mascota existente
export const updatePetById = async (req, res) => {
    const { petId } = req.params;
    const petData = req.body;

    if (!petId) {
        return res.status(400).json({ message: "Pet ID is required" });
    }

    try {
        // Filtrar campos no provistos
        Object.keys(petData).forEach((key) => petData[key] === undefined && delete petData[key]);

        await updatePet(petId, petData);
        res.status(200).json({ message: "Pet updated" });
    } catch (error) {
        console.error("Error updating pet:", error);
        res.status(500).json({ message: "Error updating pet" });
    }
};

// Eliminar una mascota por ID
export const deletePetById = async (req, res) => {
    const { petId } = req.params;

    if (!petId) {
        return res.status(400).json({ message: "Pet ID is required" });
    }

    try {
        await deletePet(petId);
        res.status(200).json({ message: "Pet deleted" });
    } catch (error) {
        console.error("Error deleting pet:", error);
        res.status(500).json({ message: "Error deleting pet" });
    }
};
