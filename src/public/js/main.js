let productos = [];

fetch("http://localhost:3000/api/productos")
  .then((response) => response.json())
  .then((data) => {
    productos = data;
    cargarProductos(productos);
  });

let ofertas = [];

fetch("http://localhost:3000/api/ofertas")
  .then((response) => response.json())
  .then((data) => {
    ofertas = data;
  });

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

botonesCategorias.forEach((boton) =>
  boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
  })
);

function cargarProductos(productosElegidos) {
  // Limpiar el contenedor antes de cargar nuevos productos
  contenedorProductos.innerHTML = "";

  // Cargar los productos
  productosElegidos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");

    // Truncar la descripción del producto a 30 caracteres
    const descripcionTruncada = producto.description.substring(0, 30);
    const descripcionCompleta = producto.description;

    const oferta = ofertas.find((oferta) => oferta.id === producto.id);

    if (oferta) {
      // El producto está en oferta, calcular descuentos y actualizar el precio
      const descuento = oferta.descuento;
      const precioOriginal = producto.price;
      const precioFinal = precioOriginal * (1 - descuento / 100);
      div.innerHTML = `
            <div class="oferta-banda">Oferta</div>
            <img class="producto-imagen" src="${producto.image}" alt="${
        producto.title
      }">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.title}</h3>
                <p class="producto-descripcion" title="${
                  producto.description
                }">${descripcionTruncada}</p>
                <p class="producto-precio">Precio Original: $${precioOriginal}</p>
                <p class="producto-descuento">Descuento: ${descuento}%</p>
                <p class="producto-precio-final">Precio Final: $${precioFinal.toFixed(
                  2
                )}</p>
                <button class="producto-agregar" id="${
                  producto.id
                }">Agregar</button>
            </div>`;
    } else {
      // El producto no está en oferta, mostrar el producto normalmente
      div.innerHTML = `
            <img class="producto-imagen" src="${producto.image}" alt="${producto.title}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.title}</h3>
                <p class="producto-descripcion" title="${descripcionCompleta}">${descripcionTruncada}...</p>
                <p class="producto-precio">$${producto.price}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;
    }

    // Agregar evento de hover para mostrar la descripción completa al pasar el mouse
    const descripcionElement = div.querySelector(".producto-descripcion");
    descripcionElement.addEventListener("mouseover", () => {
      descripcionElement.textContent = descripcionCompleta;
    });

    // Restaurar la descripción truncada al retirar el mouse
    descripcionElement.addEventListener("mouseout", () => {
      descripcionElement.textContent = descripcionTruncada + "...";
    });

    // Agregar el div al contenedor
    contenedorProductos.append(div);
  });

  actualizarBotonesAgregar();
}

// Función para normalizar una cadena (reemplaza acentos y convierte a minúsculas)
function normalizarCategoria(categoria) {
  return categoria
    .toLowerCase() // Convertir a minúsculas
    .normalize("NFD") // Normalizar caracteres a su forma básica (quitar acentos)
    .replace(/[\u0300-\u036f]/g, "") // Remover caracteres
    .replace(/\s/g, ""); // Remover espacios en blanco
}

// Función para cargar productos basada en la categoría seleccionada
function cargarProductosPorCategoria(categoria) {
  // Normalizar la categoría seleccionada
  const categoriaNormalizada = normalizarCategoria(categoria);

  // Filtrar productos por categoria normalizada
  const productosFiltrados = productos.filter((producto) => {
    const categoriaProductoNormalizada = normalizarCategoria(producto.category);
    return categoriaProductoNormalizada === categoriaNormalizada;
  });

  // Mostrar productos filtrados
  cargarProductos(productosFiltrados);
}

// Manejar el evento click en los botones de categoría
botonesCategorias.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    const categoriaSeleccionada = e.currentTarget.id;

    // Remover la clase 'active' de todos los botones de categoría
    botonesCategorias.forEach((b) => b.classList.remove("active"));

    // Agregar la clase 'active' al botón seleccionado
    e.currentTarget.classList.add("active");

    // Actualizar el título principal basado en la categoría seleccionada
    if (categoriaSeleccionada === "todos") {
      tituloPrincipal.innerText = "Todos los productos";
      cargarProductos(productos); // Mostrar todos los productos
    } else {
      // Obtener el título para mostrar en el título principal
      const tituloCategoria =
        categoriaSeleccionada.charAt(0).toUpperCase() +
        categoriaSeleccionada.slice(1);
      tituloPrincipal.innerText = tituloCategoria;

      // Cargar productos de la categoría seleccionada
      cargarProductosPorCategoria(categoriaSeleccionada);
    }
  });
});

function actualizarBotonesAgregar() {
  botonesAgregar = document.querySelectorAll(".producto-agregar");

  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
  });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
  productosEnCarrito = JSON.parse(productosEnCarritoLS);
  actualizarNumerito();
} else {
  productosEnCarrito = [];
}

function agregarAlCarrito(e) {
  Toastify({
    text: "Producto agregado",
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #4b33a8, #785ce9)",
      borderRadius: "2rem",
      textTransform: "uppercase",
      fontSize: ".75rem",
    },
    offset: {
      x: "1.5rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
      y: "1.5rem", // vertical axis - can be a number or a string indicating unity. eg: '2em'
    },
    onClick: function () {}, // Callback after click
  }).showToast();

  const idBoton = e.currentTarget.id;
  const productoAgregado = productos.find((producto) => producto.id == idBoton);
  console.log(productoAgregado);

  if (productosEnCarrito.some((producto) => producto.id == idBoton)) {
    const index = productosEnCarrito.findIndex(
      (producto) => producto.id == idBoton
    );
    productosEnCarrito[index].cantidad++;
  } else {
    productoAgregado.cantidad = 1;
    productosEnCarrito.push(productoAgregado);
  }

  actualizarNumerito();

  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );
}

function actualizarNumerito() {
  let nuevoNumerito = productosEnCarrito.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
  numerito.innerText = nuevoNumerito;
}
