//Importamos
import express from "express";
import { appendFile } from "fs";
const router = express.Router();

router.get("/", (req, res) => {
    res.render("inicio", { title: "Inicio" });
})

//Exportamos el router
export default router;