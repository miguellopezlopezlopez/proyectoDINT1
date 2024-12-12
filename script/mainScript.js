document.addEventListener("DOMContentLoaded", () => {
    const productosContainer = document.getElementById("contenedor-productos");

    // Cargar productos desde productos.json
    fetch("./js/productos.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error al cargar el archivo JSON");
            }
            return response.json();
        })
        .then((productos) => {
            mostrarProductos(productos);
        })
        .catch((error) => console.error("Error al cargar los productos:", error));

    // Función para mostrar productos
    function mostrarProductos(productos) {
        productosContainer.innerHTML = ""; // Limpiar contenedor
        productos.forEach((producto) => {
            const productoHTML = `
                <div class="producto">
                    <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="producto-detalles">
                        <h3 class="producto-titulo">${producto.titulo}</h3>
                        <p class="producto-precio">$${producto.precio}</p>                        
                        <button class="producto-agregar" data-id="${producto.id}">Agregar</button>
                    </div>
                </div>
            `;
            productosContainer.innerHTML += productoHTML;
        });
    }
});
