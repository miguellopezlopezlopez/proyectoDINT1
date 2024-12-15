document.addEventListener("DOMContentLoaded", () => {
    const productosContainer = document.getElementById("contenedor-productos");
    const carritoNumerito = document.getElementById("numerito");
    const botonesCategoria = document.querySelectorAll(".boton-categoria");
    const menu = document.querySelector("aside");
    const openMenuButton = document.getElementById("open-menu");
    const closeMenuButton = document.getElementById("close-menu");

    const logoHeader = document.getElementById("logo-header");
    const logoAside = document.getElementById("logo-aside");

    let carrito = []; 
    let productosTotales = []; 

    // Cargar productos desde JSON
    fetch("./js/productos.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error al cargar el archivo JSON");
            }
            return response.json();
        })
        .then((productos) => {
            productosTotales = productos; 
            mostrarProductos(productos);
            activarBotonesAgregar(productos);
            activarFiltroCategorias(productos);
        })
        .catch((error) => console.error("Error al cargar los productos:", error));

    // Mostrar productos en la página
    function mostrarProductos(productos) {
        productosContainer.innerHTML = ""; 
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

    // Activar botones de agregar al carrito
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

    // Agregar productos al carrito
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

    // Actualizar numerito del carrito
    function actualizarNumeritoCarrito() {
        const totalProductos = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
        carritoNumerito.textContent = totalProductos;
    }

    // Filtrar productos por categoría
    function activarFiltroCategorias(productos) {
        botonesCategoria.forEach((boton) => {
            boton.addEventListener("click", () => {
                const categoria = boton.id; 
                const productosFiltrados = categoria === "todos"
                    ? productosTotales
                    : productosTotales.filter(producto => producto.categoria.id === categoria);

                botonesCategoria.forEach(b => b.classList.remove("active")); 
                boton.classList.add("active"); 

                mostrarProductos(productosFiltrados);
                activarBotonesAgregar(productosFiltrados);
            });
        });
    }

    // Mostrar y ocultar menú lateral
    openMenuButton.addEventListener("click", () => {
        menu.classList.add("menu-visible");
    });

    closeMenuButton.addEventListener("click", () => {
        menu.classList.remove("menu-visible");
    });

    // Ocultar menú en redimensionamiento a pantallas grandes
    window.addEventListener("resize", () => {
        if (window.innerWidth >= 850) {
            menu.classList.remove("menu-visible");
        }
    });

    // Guardar carrito en LocalStorage
    function guardarCarritoLocalStorage() {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    // Cargar carrito desde LocalStorage
    function cargarCarritoLocalStorage() {
        const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
        if (carritoGuardado) {
            carrito = carritoGuardado;
            actualizarNumeritoCarrito();
        }
    }

    // Redirigir a la página principal (index.html)
    const redirigirIndex = () => {
        window.location.href = "index.html";
    };

    if (logoHeader) {
        logoHeader.addEventListener("click", redirigirIndex);
    }
    if (logoAside) {
        logoAside.addEventListener("click", redirigirIndex);
    }

    // Cargar carrito al iniciar
    cargarCarritoLocalStorage();
});
