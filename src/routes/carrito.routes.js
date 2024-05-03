//Importamos
import express from "express";
import {pool} from '../db/db.js';

const router = express.Router();
const app = express();

// Ruta al archivo compras.json
const comprasFilePath = "./src/db/compras.json";

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

router.get("/", (req, res) => {
  res.render("carrito", { title: "Carrito" });
});

router.post("/", (req, res) => {
    const compra = req.body;

    // Ejecutar la consulta SQL para insertar la compra en la base de datos
    pool.query('INSERT INTO compras (productos, fecha) VALUES (?, ?)', [JSON.stringify(compra.productosComprados), compra.fecha], (err, result) => {
        if (err) {
            console.error("Error al insertar la compra:", err);
            res.status(500).json({ error: "Error interno del servidor" });
        } else {
            console.log("Compra insertada correctamente");
            res.status(200).json({ message: "Compra insertada correctamente" });
        }
    });
});

//Exportamos el router
export default router;