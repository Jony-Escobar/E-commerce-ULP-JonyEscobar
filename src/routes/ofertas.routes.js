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

/*
// Middleware para buscar una oferta por su ID
const getOferta = async (req, res, next) => {
    const { id } = req.params;

    // Verificamos si el ID es un número válido
    if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido. El ID debe ser un número entero." });
    }

    try {
        // Leemos el contenido del archivo ofertas.json
        const data = fs.readFileSync(ofertasFilePath, 'utf8');
        const ofertas = JSON.parse(data);

        // Buscamos la oferta con el ID especificado
        const oferta = ofertas.find(o => o.id === parseInt(id));

        if (!oferta) {
            return res.status(404).json({ message: "Oferta no encontrada" });
        }

        // Asignamos la oferta encontrada a res.locals para pasarla al siguiente middleware
        res.locals.oferta = oferta;
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//Obtener oferta por ID
router.get('/:id', getOferta, (req, res) => {
    const oferta = res.locals.oferta;
    res.json(oferta);
});

//Crear nuevas ofertas
router.post("/", (req, res) => {
    const { id, descuento } = req.body;

    // Verificamos si falta algún dato necesario
    if (!id || !descuento) {
        return res.status(400).json({ message: "Faltan datos. Se requiere 'id' y 'descuento'." });
    }

    try {
        // Leemos el contenido actual del archivo ofertas.json
        const data = fs.readFileSync(ofertasFilePath, 'utf8');
        const ofertas = JSON.parse(data);

        // Verificamos si ya existe una oferta con el mismo ID
        const existingOferta = ofertas.find(o => o.id === id);
        if (existingOferta) {
            return res.status(400).json({ message: `Ya existe una oferta con el ID '${id}'` });
        }

        // Creamos la nueva oferta
        const newOferta = { id, descuento };
        ofertas.push(newOferta);

        // Escribimos las ofertas actualizadas de vuelta al archivo ofertas.json
        fs.writeFileSync(ofertasFilePath, JSON.stringify(ofertas, null, 2), 'utf8');

        // Respondemos con la nueva oferta creada
        res.status(201).json(newOferta);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Modificar oferta con put
router.put('/:id', getOferta, (req, res) => {
    const { id } = req.params;
    const { id: newId, descuento: newDescuento } = req.body;
    const { oferta, ofertas } = res.locals;

    // Actualizamos los datos de la oferta encontrada
    oferta.id = newId || oferta.id;
    oferta.descuento = newDescuento || oferta.descuento;

    try {
        // Escribimos las ofertas actualizadas de vuelta al archivo ofertas.json
        fs.writeFileSync(ofertasFilePath, JSON.stringify(ofertas, null, 2), 'utf8');

        // Respondemos con la oferta actualizada
        res.json(oferta);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Modificar con patch
router.patch('/:id', getOferta, (req, res) => {
    const { id } = req.params;
    const { id: newId, descuento: newDescuento } = req.body;
    const { oferta, ofertas } = res.locals;

    // Actualizamos solo los campos que se proporcionan en req.body
    if (newId !== undefined) {
        oferta.id = newId;
    }
    if (newDescuento !== undefined) {
        oferta.descuento = newDescuento;
    }

    try {
        // Escribimos las ofertas actualizadas de vuelta al archivo ofertas.json
        fs.writeFileSync(ofertasFilePath, JSON.stringify(ofertas, null, 2), 'utf8');

        // Respondemos con la oferta actualizada
        res.json(oferta);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Eliminar oferta
router.delete('/:id', getOferta, (req, res) => {
    const { id } = req.params;
    const { ofertas } = res.locals;

    try {
        // Filtramos el array de ofertas para eliminar la oferta con el ID especificado
        const filteredOfertas = ofertas.filter(o => o.id !== parseInt(id));

        // Escribimos las ofertas actualizadas de vuelta al archivo ofertas.json
        fs.writeFileSync(ofertasFilePath, JSON.stringify(filteredOfertas, null, 2), 'utf8');

        // Respondemos con un mensaje indicando que la oferta fue eliminada
        res.json({ message: "Oferta eliminada" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
*/

//Exportamos el router
export default router;