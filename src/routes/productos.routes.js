//Importamos
import express from "express";
const router = express.Router();
import translate from "node-google-translate-skidz"; //Importamos translate

// Obtener, formatear y traducir todos los productos
const productosListos = () => {
  return fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((productos) => {
      // Filtrar y obtener solo las propiedades deseadas de cada producto
      const productosFiltrados = productos.map((producto) => {
        const { id, title, price, description, category, image } = producto;
        return { id, title, price, description, category, image };
      });

      // Traducir las propiedades "title", "description" y "category" de cada producto
      const traduccionesPromesas = productosFiltrados.map(async (producto) => {
        const { title, description, category } = producto;
        const traducciones = {};

        // Traducir "title"
        if (title) {
          const translationResult = await translate({ text: title, source: 'en', target: 'es' });
          traducciones.title = translationResult.translation;
        }

        // Traducir "description"
        if (description) {
          const translationResult = await translate({ text: description, source: 'en', target: 'es' });
          traducciones.description = translationResult.translation;
        }

        // Traducir "category"
        if (category) {
          const translationResult = await translate({ text: category, source: 'en', target: 'es' });
          traducciones.category = translationResult.translation;
        }

        // Devolver el producto actualizado con las traducciones
        return {
          ...producto,
          ...traducciones
        };
      });

      // Esperar todas las traducciones y devolver los productos traducidos
      return Promise.all(traduccionesPromesas);
    })
    .catch((error) => {
      res.json({ error: error.message });
      throw error; // Rechazar la promesa con el error
    });
};

  //Get de todos los productos
    router.get("/", (req, res) => {
    productosListos()
      .then((productos) => {
        res.json(productos);
      })
      .catch((error) => {
        res.status(500).send("Error al consultar todos los productos");
      });
  });

//Exportamos el router
export default router;