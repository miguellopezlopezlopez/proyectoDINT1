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


    function actualizarNumeritoCarrito() {
        const totalProductos = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
        carritoNumerito.textContent = totalProductos;
    }


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

 
    const isSmallScreen = () => window.innerWidth <= 600;

    openMenuButton.addEventListener("click", () => {
        if (isSmallScreen()) {
            menu.classList.add("menu-visible");
        }
    });

    closeMenuButton.addEventListener("click", () => {
        if (isSmallScreen()) {
            menu.classList.remove("menu-visible");
        }
    });

  
    window.addEventListener("resize", () => {
        if (!isSmallScreen()) {
            menu.classList.add("menu-visible"); 
        } else {
            menu.classList.remove("menu-visible"); 
        }
    });

 
    function guardarCarritoLocalStorage() {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

 
    function cargarCarritoLocalStorage() {
        const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
        if (carritoGuardado) {
            carrito = carritoGuardado;
            actualizarNumeritoCarrito();
        }
    }

  
    cargarCarritoLocalStorage();


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
