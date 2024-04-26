//Importamos
import express from "express";
const router = express.Router();
import fs from "fs";

// Ruta al archivo ofertas.json
const ofertasFilePath = ('./src/db/ofertas.json');

// Ruta para obtener todas las ofertas
router.get("/", (req, res) => {
    try {
        // Leemos el contenido del archivo ofertas.json
        const data = fs.readFileSync(ofertasFilePath, 'utf8');
        const ofertas = JSON.parse(data);

        if (ofertas.length === 0) {
            return res.status(204).json({ message: "No hay ofertas" });
        }

        // Enviamos todas las ofertas como respuesta
        res.json(ofertas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Exportamos el router
export default router;