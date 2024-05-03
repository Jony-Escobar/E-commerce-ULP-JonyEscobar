//Importamos
import express from "express";
const router = express.Router();
import {pool} from '../db/db.js';

// Ruta al archivo ofertas.json
const ofertasFilePath = ('./src/db/ofertas.json');

// Ruta para obtener todas las ofertas
router.get("/", async (req, res) => {    
    const [ofertas] = await pool.query('SELECT * FROM ofertas')
    res.json(ofertas)
});

//Exportamos el router
export default router;