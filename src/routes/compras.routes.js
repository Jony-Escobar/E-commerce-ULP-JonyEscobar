//Importamos
import express from "express";
const router = express.Router();
import {pool} from '../db/db.js';

// Ruta para obtener todas las compras
router.get("/", async (req, res) => {    
    const [compras] = await pool.query('SELECT * FROM compras')
    res.json(compras)
});

//Exportamos el router
export default router;