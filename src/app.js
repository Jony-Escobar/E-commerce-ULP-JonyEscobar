import express from "express"; //Importamos express
import bodyParser from "body-parser"; //Importamos body-parser
const app = express();
//Importamos rutas
import inicioRoutes from './routes/inicio.routes.js';
import carritoRoutes from './routes/carrito.routes.js';
import productosRoutes from './routes/productos.routes.js';
import ofertasRoutes from './routes/ofertas.routes.js';
import morgan from "morgan";

//Usamos express para los middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use("/", inicioRoutes);
app.use("/inicio", inicioRoutes);
app.use("/carrito", carritoRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/ofertas", ofertasRoutes);


app.set("views", "./src//public/views");
app.set("view engine", "pug");
//Cargo archivos estaticos
app.use(express.static("./src/public"));

//Iniciamos el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Escuchando el puerto ${port}`);
  });