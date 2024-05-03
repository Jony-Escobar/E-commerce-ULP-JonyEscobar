# E-commerce-ULP-JonyEscobar
 Node-Express-Pug

Práctico Integrador Web II

Desarrolle una página que consuma el listado de productos provisto por la API https://fakestoreapi.com/.

Los artículos deben mostrarse en una grilla de 4 columnas. Cada producto debe mostrarse como una card con su respectiva imagen del producto, título, descripción (máximo 30 caracteres), categoría y precio.

El usuario podrá ver la descripción completa del artículo pasando el mouse por arriba de la descripción.

La aplicación se conectará al servidor para obtener el listado de artículos que esta de oferta
La info de este listado estará almacenada en un repositorio persistente (json, texto plano,
BD, etc) y contendrá al menos el id y porcentaje de descuento del artículo.

Los productos en oferta deben resaltarse con una banda “de oferta” que cruce la imagen del
artículo. Para estos productos debe mostrarse el precio origina, el descuento, el monto
descontado y el precio final.

Los títulos y descripciones de los artículos deben mostrarse en el idioma español. Para tal
fin se debe utilizar un endpoint en el servidor que permita la traducción. Puede utilizar el
paquete de node node-google-translate-skidz (https://github.com/statickidz/node-googletranslate-skidz)

El usuario podrá agregar a un carrito de compra el producto de interés a través de un botón.

La página debe tener un enlace a una página de gestión del carrito donde se mostrará todos los productos agregados al carrito y donde el usuario podrá eliminar y modificar la cantidad
deseada. Esta página debe tener un botón comprar el cual enviará la información de la compra al servidor para que esta sea registrada de forma permanente.

Nota: Las compras no dispondrán de información vinculada al usuario.