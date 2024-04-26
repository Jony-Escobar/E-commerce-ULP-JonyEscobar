//Importamos
import express from "express";
const router = express.Router();
import fs from "fs";
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

  // Convertir la compra a formato JSON
  const compraJSON = JSON.stringify(compra, null, 2);

  // Leer el contenido actual del archivo compras.json
  fs.readFile(comprasFilePath, (err, data) => {
    if (err) {
        console.error("Error al leer el archivo de compras:", err);
        res.status(500).send("Error al procesar la compra");
        return;
    }

    let compras = [];
    try {
        // Intentar parsear el contenido del archivo JSON como un array
        compras = JSON.parse(data);
        if (!Array.isArray(compras)) {
            compras = []; // Si no es un array válido, inicializar como un array vacío
        }
    } catch (parseError) {
        console.error("Error al parsear el contenido del archivo JSON:", parseError);
        res.status(500).send("Error al procesar la compra");
        return;
    }

    // Agregar la nueva compra al array de compras
    compras.push(compra);

    // Convertir las compras actualizadas a formato JSON
    const comprasJSON = JSON.stringify(compras, null, 2);

    // Escribir las compras actualizadas en el archivo compras.json
    fs.writeFile(comprasFilePath, comprasJSON, (writeErr) => {
        if (writeErr) {
            console.error("Error al guardar la compra:", writeErr);
            res.status(500).send("Error al guardar la compra");
        } else {
            console.log("Compra guardada correctamente");
            res.status(201).send("Compra guardada correctamente");
        }
    });
});
});

//Exportamos el router
export default router;
