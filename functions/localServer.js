// // src/localServer.js
// import express from "express";
// import cors from "cors";
// import taskRoutes from "./routes/taskRoutes.js";

// const app = express();
// app.use(cors());
// app.use(express.json());

// const port = process.env.PORT || 4006;

// // Usa las rutas para tareas
// app.use('/api', taskRoutes);

// // Servidor local para tareas
// app.listen(port, () => {
//     console.log(`Tasks Service is running on http://localhost:${port}`);
// });