let productosOriginales = []; // Variable para guardar los productos cargados del JSON

document.addEventListener("DOMContentLoaded", function() {
    // Cargar JSON
    fetch('Json/Productos.json')
        .then(response => response.json())
        .then(data => {
            // Guardar en la variable global
            productosOriginales = data;
            // Mostrar en la página
            mostrarProductos(data);
        })
        .catch(error => console.error('Error al cargar el JSON:', error));

    // Configurar evento para la ordenación
    const dropdownBtn = document.querySelector(".dropdown-btn");
    const dropdownContent = document.querySelector(".dropdown-content");
    dropdownBtn.addEventListener("click", function() {
        dropdownContent.classList.toggle("show");
    });
    dropdownContent.addEventListener("click", function(event) {
        if (event.target.tagName === "A") {
            const sortType = event.target.getAttribute("data-sort");
            ordenarProductos(sortType);
            dropdownContent.classList.remove("show");
        }
    });

    // Configurar evento para el filtro de precios
    const precioInput = document.getElementById('precio');
    const precioValor = document.getElementById('precio-valor');
    precioValor.textContent = precioInput.value;
    precioInput.addEventListener('input', function() {
        precioValor.textContent = precioInput.value;
        filtrarProductosPorPrecio(parseFloat(precioInput.value));
    });
});

// Función para mostrar los productos en la página
function mostrarProductos(productos) {
    const productContainer = document.querySelector('.product-container');
    // Limpiar el contenedor de productos 
    productContainer.innerHTML = '';
    // Iterar sobre cada producto y crear los elementos para mostrarlos
    productos.forEach(producto => {
        if(producto.categoria == sessionStorage.getItem('CategoriaHeader') ){
        const productBox = document.createElement('div');
        productBox.className = 'product-data product-box';
        const divImagenCatalogo = document.createElement('div');
        divImagenCatalogo.className = 'divImagenCatalogo';
        const img = document.createElement('img');
        img.src = producto.imagen;
        img.alt = producto.descripcion;
        img.title = producto.descripcion;
        const h3 = document.createElement('h3');
        h3.textContent = producto.nombre;
        const p = document.createElement('p');
        p.textContent = `Precio: $${producto.precio.toFixed(2)}`;
        p.setAttribute('data-price', producto.precio);
        divImagenCatalogo.appendChild(img);
        productBox.appendChild(divImagenCatalogo);
        productBox.appendChild(h3);
        productBox.appendChild(p);
        productContainer.appendChild(productBox);


        productBox.addEventListener('click', () => {
            sessionStorage.setItem('productomostrar', producto.id);
            location.href = producto.url;
        });
    }
});
}

// Función para ordenar los productos según el tipo de ordenación
function ordenarProductos(sortType) {
    let productosOrdenados = [...productosOriginales]; //aqui copia el array de los productios

    switch (sortType) {
        case "price-low-to-high":
            productosOrdenados.sort((a, b) => a.precio - b.precio);
            break;
        case "price-high-to-low":
            productosOrdenados.sort((a, b) => b.precio - a.precio);
            break;
        case "name-a-to-z":
            productosOrdenados.sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
        case "name-z-to-a":
            productosOrdenados.sort((a, b) => b.nombre.localeCompare(a.nombre));
            break;
        default:
            return;
    }
    // Mostrar ya ordenados
    mostrarProductos(productosOrdenados);
}

// Función para filtrar por precio
function filtrarProductosPorPrecio(precioMaximo) {
    // Filtrar productos según el precio máximo
    const productosFiltrados = productosOriginales.filter(producto => producto.precio <= precioMaximo);
    mostrarProductos(productosFiltrados);
}
