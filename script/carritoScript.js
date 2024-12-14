document.addEventListener("DOMContentLoaded", () => {
    const carritoProductosContainer = document.getElementById("carrito-productos");
    const carritoVacio = document.getElementById("carrito-vacio");
    const carritoComprado = document.getElementById("carrito-comprado");
    const numerito = document.getElementById("numerito");

    const botonVaciar = document.querySelector(".carrito-acciones-vaciar");
    const botonComprar = document.querySelector(".carrito-acciones-comprar");
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Mostrar productos en el carrito
    const mostrarCarrito = () => {
        carritoProductosContainer.innerHTML = "";

        if (carrito.length === 0) {
            carritoVacio.style.display = "block";
            carritoComprado.style.display = "none";
            numerito.textContent = "0";
            return;
        }

        carritoVacio.style.display = "none";
        carritoComprado.style.display = "none";

        let total = 0;

        carrito.forEach((producto) => {
            const subtotal = producto.precio * producto.cantidad;
            total += subtotal;

            const div = document.createElement("div");
            div.className = "carrito-producto";
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${subtotal}</p>
                </div>
                <button class="carrito-producto-eliminar" data-id="${producto.id}">
                    <i class="bi bi-trash-fill"></i>
                </button>
            `;
            carritoProductosContainer.appendChild(div);
        });

        const carritoAcciones = document.createElement("div");
        carritoAcciones.className = "carrito-acciones";
        carritoAcciones.innerHTML = `
            <div class="carrito-acciones-izquierda">
                <button class="carrito-acciones-vaciar">Vaciar carrito</button>
            </div>
            <div class="carrito-acciones-derecha">
                <div class="carrito-acciones-total">
                    <p>Total:</p>
                    <p id="Total">$${total}</p>
                </div>
                <button class="carrito-acciones-comprar">Comprar ahora</button>
            </div>
        `;
        carritoProductosContainer.appendChild(carritoAcciones);

        numerito.textContent = carrito.length;

        // Botones
        document.querySelector(".carrito-acciones-vaciar").addEventListener("click", vaciarCarrito);
        document.querySelector(".carrito-acciones-comprar").addEventListener("click", comprarCarrito);
        document.querySelectorAll(".carrito-producto-eliminar").forEach((boton) =>
            boton.addEventListener("click", () => eliminarProducto(boton.dataset.id))
        );
    };

    // Vaciar carrito
    const vaciarCarrito = () => {
        if (confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
            carrito = [];
            guardarCarrito();
            mostrarCarrito();
        }
    };

    // Comprar carrito
    const comprarCarrito = () => {
        const total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
        if (confirm(`¿Estás seguro que quieres comprar todos los productos por un total de $${total}?`)) {
            carrito = [];
            guardarCarrito();
            mostrarCarrito();
            carritoComprado.style.display = "block";
        }
    };

    // Eliminar producto
    const eliminarProducto = (id) => {
        if (confirm("¿Quieres eliminar el producto?")) {
            carrito = carrito.filter((producto) => producto.id !== id);
            guardarCarrito();
            mostrarCarrito();
        }
    };

    // Guardar carrito en localStorage
    const guardarCarrito = () => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    };

    // Mostrar carrito al cargar la página
    mostrarCarrito();
});
