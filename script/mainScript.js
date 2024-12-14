document.addEventListener("DOMContentLoaded", () => {
    const productosContainer = document.getElementById("contenedor-productos");
    const carritoNumerito = document.getElementById("numerito");
    const botonesCategoria = document.querySelectorAll(".boton-categoria");
    const menu = document.querySelector("aside");
    const openMenuButton = document.getElementById("open-menu");
    const closeMenuButton = document.getElementById("close-menu");

    const logoHeader = document.getElementById("logo-header");
    const logoAside = document.getElementById("logo-aside");

    let carrito = []; // Carrito inicial
    let productosTotales = []; // Lista de todos los productos

    // Cargar productos desde productos.json
    fetch("./js/productos.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error al cargar el archivo JSON");
            }
            return response.json();
        })
        .then((productos) => {
            productosTotales = productos; // Guardar productos cargados
            mostrarProductos(productos);
            activarBotonesAgregar(productos);
            activarFiltroCategorias(productos);
        })
        .catch((error) => console.error("Error al cargar los productos:", error));

    // Función para mostrar productos
    function mostrarProductos(productos) {
        productosContainer.innerHTML = ""; // Limpiar contenedor
        const fragment = document.createDocumentFragment();

        productos.forEach((producto) => {
            const div = document.createElement("div");
            div.className = "producto";
            div.innerHTML = `
                <img class="producto-imagen" src="${producto.imagen || ''}" alt="${producto.titulo}">
                <div class="producto-detalles">
                    <h3 class="producto-titulo">${producto.titulo}</h3>
                    <p class="producto-precio">$${producto.precio}</p>
                    <button class="producto-agregar" data-id="${producto.id}">Agregar</button>
                </div>
            `;
            fragment.appendChild(div);
        });

        productosContainer.appendChild(fragment);
    }

    // Activar funcionalidad de botones "Agregar"
    function activarBotonesAgregar(productos) {
        const botonesAgregar = document.querySelectorAll(".producto-agregar");
        botonesAgregar.forEach((boton) => {
            boton.addEventListener("click", () => {
                const productoId = boton.getAttribute("data-id");
                const productoSeleccionado = productos.find(p => p.id === productoId);

                if (productoSeleccionado) {
                    agregarAlCarrito(productoSeleccionado);
                }
            });
        });
    }

    // Agregar producto al carrito
    function agregarAlCarrito(producto) {
        const existeEnCarrito = carrito.find(p => p.id === producto.id);

        if (existeEnCarrito) {
            existeEnCarrito.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }

        guardarCarritoLocalStorage();
        actualizarNumeritoCarrito();
        console.log("Carrito actual:", carrito);
    }

    // Actualizar número del carrito
    function actualizarNumeritoCarrito() {
        const totalProductos = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
        carritoNumerito.textContent = totalProductos;
    }

    // Activar filtro por categorías
    function activarFiltroCategorias(productos) {
        botonesCategoria.forEach((boton) => {
            boton.addEventListener("click", () => {
                const categoria = boton.id; // ID del botón de categoría
                const productosFiltrados = categoria === "todos"
                    ? productosTotales
                    : productosTotales.filter(producto => producto.categoria.id === categoria);

                botonesCategoria.forEach(b => b.classList.remove("active")); // Eliminar "active" de todos
                boton.classList.add("active"); // Marcar botón actual como activo

                mostrarProductos(productosFiltrados);
                activarBotonesAgregar(productosFiltrados);
            });
        });
    }

    // Mostrar menú en pantallas pequeñas
    const isSmallScreen = () => window.innerWidth <= 600;

    openMenuButton.addEventListener("click", () => {
        if (isSmallScreen()) {
            menu.classList.add("menu-visible");
        }
    });

    // Ocultar menú en pantallas pequeñas
    closeMenuButton.addEventListener("click", () => {
        if (isSmallScreen()) {
            menu.classList.remove("menu-visible");
        }
    });

    // Detectar cambios de tamaño de la pantalla
    window.addEventListener("resize", () => {
        if (!isSmallScreen()) {
            menu.classList.add("menu-visible"); // Menú siempre visible en pantallas grandes
        } else {
            menu.classList.remove("menu-visible"); // Ocultar en pantallas pequeñas
        }
    });

    // Guardar carrito en localStorage
    function guardarCarritoLocalStorage() {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    // Cargar carrito desde localStorage
    function cargarCarritoLocalStorage() {
        const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
        if (carritoGuardado) {
            carrito = carritoGuardado;
            actualizarNumeritoCarrito();
        }
    }

    // Inicializar carrito desde localStorage al cargar la página
    cargarCarritoLocalStorage();

    // Redirección al hacer clic en los logos
    const redirigirIndex = () => {
        window.location.href = "index.html";
    };

    if (logoHeader) {
        logoHeader.addEventListener("click", redirigirIndex);
    }
    if (logoAside) {
        logoAside.addEventListener("click", redirigirIndex);
    }
});
