// routes/taskRoutes.js
import express from "express";
import { fetchTasks, addTask } from "../controllers/taskController.js";

const router = express.Router();

router.get("/tasks", fetchTasks);
router.post("/tasks", addTask);

export default router;