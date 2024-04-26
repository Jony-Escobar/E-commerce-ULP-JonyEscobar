let ofertas = [];
let productosEnCarrito = localStorage.getItem("productos-en-carrito");
fetch("http://localhost:3000/api/ofertas")
  .then((response) => response.json())
  .then((data) => {
    ofertas = data;
    cargarProductosCarrito();
  });


productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

function cargarProductosCarrito() {
  if (productosEnCarrito && productosEnCarrito.length > 0) {
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remove("disabled");
    contenedorCarritoComprado.classList.add("disabled");

    contenedorCarritoProductos.innerHTML = "";

    productosEnCarrito.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("carrito-producto");

      // Truncar el título si es demasiado largo
      const tituloTruncado = truncateText(producto.title, 20); // Cambia 20 por la longitud máxima deseada

      const oferta = ofertas.find((oferta) => oferta.id === producto.id);

      if (oferta) {
        const descuento = oferta.descuento;
        const precioOriginal = producto.price;
        const precioFinal = precioOriginal * (1 - descuento / 100);
        const subtotal = precioFinal * producto.cantidad;

        div.innerHTML = `
          <img class="carrito-producto-imagen" src="${producto.image}" alt="${tituloTruncado}">
          <div class="carrito-producto-titulo">
            <small>Título</small>
            <h3>${tituloTruncado}</h3>
          </div>
          <div class="carrito-producto-cantidad">
            <small>Cantidad</small>
            <p>${producto.cantidad}</p>
          </div>
          <div class="carrito-producto-precio">
            <small>Precio Original</small>
            <p>$${precioOriginal}</p>
            <small>Descuento</small>
            <p>${descuento}%</p>
            <small>Precio Final</small>
            <p>$${precioFinal.toFixed(2)}</p>
          </div>
          <div class="carrito-producto-subtotal">
            <small>Subtotal con descuento</small>
            <p>$${subtotal.toFixed(2)}</p>
          </div>
          <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
        `;
      } else {
        const subtotal = producto.price * producto.cantidad;

        div.innerHTML = `
          <img class="carrito-producto-imagen" src="${producto.image}" alt="${tituloTruncado}">
          <div class="carrito-producto-titulo">
            <small>Título</small>
            <h3>${tituloTruncado}</h3>
          </div>
          <div class="carrito-producto-cantidad">
            <small>Cantidad</small>
            <p>${producto.cantidad}</p>
          </div>
          <div class="carrito-producto-precio">
            <small>Precio</small>
            <p>$${producto.price}</p>
          </div>
          <div class="carrito-producto-subtotal">
            <small>Subtotal</small>
            <p>$${subtotal.toFixed(2)}</p>
          </div>
          <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
        `;
      }

      contenedorCarritoProductos.append(div);
    });

    actualizarBotonesEliminar();
    actualizarTotal();
  } else {
    contenedorCarritoVacio.classList.remove("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.add("disabled");
  }
}

// Función para truncar un texto a una longitud máxima
function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
}

function actualizarBotonesEliminar() {
  botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", eliminarDelCarrito);
  });
}

function eliminarDelCarrito(e) {
  Toastify({
    text: "Producto eliminado",
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
  const index = productosEnCarrito.findIndex(
    (producto) => producto.id == idBoton
  );

  productosEnCarrito.splice(index, 1);
  cargarProductosCarrito();

  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );
}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
  Swal.fire({
    title: "¿Estás seguro?",
    icon: "question",
    html: `Se van a borrar ${productosEnCarrito.reduce(
      (acc, producto) => acc + producto.cantidad,
      0
    )} productos.`,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: "Sí",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      productosEnCarrito.length = 0;
      localStorage.setItem(
        "productos-en-carrito",
        JSON.stringify(productosEnCarrito)
      );
      cargarProductosCarrito();
    }
  });
}

function actualizarTotal() {
  let totalCalculado = 0;

  productosEnCarrito.forEach((producto) => {
    const oferta = ofertas.find((oferta) => oferta.id === producto.id);

    if (oferta) {
      // Si el producto está en oferta, calcular el precio final con descuento
      const descuento = oferta.descuento;
      const precioOriginal = producto.price;
      const precioFinal = precioOriginal * (1 - descuento / 100);
      totalCalculado += precioFinal * producto.cantidad;
    } else {
      // Si el producto no está en oferta, calcular el precio normal
      totalCalculado += producto.price * producto.cantidad;
    }
  });

  // Actualizar el elemento HTML que muestra el total
  const totalElement = document.querySelector("#total");
  totalElement.innerText = `$${totalCalculado.toFixed(2)}`;
}

botonComprar.addEventListener("click", comprarCarrito);
let ultimoIdCompra = 0;
function comprarCarrito() {
  ultimoIdCompra++;
  // Crear un objeto de compra
  const compra = {
    id: ultimoIdCompra,
    productosComprados: productosEnCarrito, // Lista de productos en el carrito
    fecha: new Date().toISOString(), // Fecha y hora de la compra
  };
  console.log(compra);
  // Realizar una solicitud POST al servidor para persistir la compra
  fetch("http://localhost:3000/carrito", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(compra),
  });

  productosEnCarrito.length = 0;
  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );

  contenedorCarritoVacio.classList.add("disabled");
  contenedorCarritoProductos.classList.add("disabled");
  contenedorCarritoAcciones.classList.add("disabled");
  contenedorCarritoComprado.classList.remove("disabled");
}
