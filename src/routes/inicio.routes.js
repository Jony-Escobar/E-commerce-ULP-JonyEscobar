//Importamos
import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    res.render("inicio", { title: "Inicio" });
})

//Exportamos el router
export default router;