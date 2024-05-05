//Importamos
import express from "express";
const router = express.Router();
import { getOfertas,postOfertas,deleteOfertas } from "../controllers/ofertasController.js";

// Ruta para obtener todas las ofertas
router.get("/", getOfertas);

//Ruta para crear ofertas
router.post("/", postOfertas)

//Ruta para eliminar ofertas
router.delete("/", deleteOfertas)

//Exportamos el router
export default router;