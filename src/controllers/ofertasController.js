import {pool} from '../db/db.js';

//Consultar ofertas en bd
export const getOfertas = async (req, res) => {
    try {
        const [ofertas] = await pool.query('SELECT * FROM ofertas')
        res.json(ofertas)
    } catch (error) {
        console.error("Error al insertar la compra:", error);
    }
}

//Crear ofertas en bd
export const postOfertas = async (req, res) => {
    try {
        const { id, descuento } = req.body; // Se espera que req.body contenga los datos de la nueva oferta
        await pool.query('INSERT INTO ofertas (id, descuento) VALUES (?, ?)', [id, descuento]);
        res.status(201).json({ message: 'Oferta agregada correctamente' });
    } catch (error) {
        console.error("Error al agregar la oferta:", error);
        res.status(500).json({ message: 'Error al agregar la oferta' });
    }
}

//Eliminar ofertas en bd
export const deleteOfertas = async (req, res) => {
    try {
        const { id } = req.body; // Se espera que el ID de la oferta a eliminar se encuentre en req.body
        await pool.query('DELETE FROM ofertas WHERE id = ?', [id]);
        res.json({ message: 'Oferta eliminada correctamente' });
    } catch (error) {
        console.error("Error al eliminar la oferta:", error);
        res.status(500).json({ message: 'Error al eliminar la oferta' });
    }
}