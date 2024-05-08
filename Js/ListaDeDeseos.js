// Función para cargar los datos de los productos desde un archivo JSON
async function cargarDatosProductos() {
    const response = await fetch('Json/Productos.json');
    const datosProductos = await response.json();
    return datosProductos;
}

// Función para mostrar la lista de deseos
async function mostrarListaDeDeseos() {
    // Obtener el arreglo de productos de la lista de deseos desde sessionStorage
    let productosListaDeDeseos = sessionStorage.getItem('ProductosListaDeDeseos');

    if (productosListaDeDeseos) {
        // Analiza los datos JSON almacenados en sessionStorage a un arreglo de objetos
        productosListaDeDeseos = JSON.parse(productosListaDeDeseos);
    } else {
        // Si no hay datos en sessionStorage, productosListaDeDeseos será un arreglo vacío
        productosListaDeDeseos = [];
    }

    // Cargar los datos de Productos.json
    const datosProductos = await cargarDatosProductos();

    // Verifica si los datos de Productos.json se cargaron correctamente
    if (!datosProductos) {
        console.error('No se pudieron cargar los datos de Productos.json');
        return;
    }

    // Obtén la referencia a la tabla de la lista de deseos
    const wishlistTable = document.getElementById('wishlist-table');
    // Limpia el contenido de la tabla antes de llenarla
    wishlistTable.querySelector('tbody').innerHTML = '';

    // Recorrer los productos en la lista de deseos
    for (const productId of productosListaDeDeseos) {
        // Encontrar el producto correspondiente en los datos de Productos.json
        const producto = datosProductos.find(p => p.id == productId);

        // Verifica si se encontró el producto en los datos JSON
        if (!producto) {
            console.warn(`Producto con ID ${productId} no encontrado en Productos.json`);
            continue;
        }

        const { nombre, precio, imagen } = producto;

        // Crear una nueva fila para el producto en la lista de deseos
        const fila = document.createElement('tr');

        // Crear columnas para imagen, nombre y precio
        const columnaFoto = document.createElement('td');
        const img = document.createElement('img');
        img.src = imagen;
        img.alt = nombre;
        columnaFoto.appendChild(img);

        const columnaNombre = document.createElement('td');
        columnaNombre.textContent = nombre;

        const columnaPrecio = document.createElement('td');
        columnaPrecio.textContent = `$${precio.toFixed(2)}`;

        // Crear una columna para eliminar el producto de la lista de deseos
        const columnaEliminar = document.createElement('td');
        const imgEliminar = document.createElement('img');
        imgEliminar.src = 'Img/Eliminar.png';
        imgEliminar.alt = 'Eliminar producto de la lista de deseos';
        imgEliminar.style.width = '50px';
        imgEliminar.style.cursor = 'pointer';

        // Configura la acción de eliminación
        imgEliminar.onclick = function() {
            eliminarProductoDeListaDeDeseos(productId);
        };

        columnaEliminar.appendChild(imgEliminar);

        // Añadir las columnas a la fila
        fila.appendChild(columnaFoto);
        fila.appendChild(columnaNombre);
        fila.appendChild(columnaPrecio);
        fila.appendChild(columnaEliminar);

        // Añadir la fila al cuerpo de la tabla
        wishlistTable.querySelector('tbody').appendChild(fila);
    }
}

// Función para eliminar un producto de la lista de deseos
function eliminarProductoDeListaDeDeseos(productId) {
    // Obtener el arreglo de productos de la lista de deseos desde sessionStorage
    let productosListaDeDeseos = sessionStorage.getItem('ProductosListaDeDeseos');
    
    if (productosListaDeDeseos) {
        productosListaDeDeseos = JSON.parse(productosListaDeDeseos);
    } else {
        productosListaDeDeseos = [];
    }

    // Filtrar el arreglo para eliminar el producto con el ID especificado
    productosListaDeDeseos = productosListaDeDeseos.filter(id => id !== productId);
    
    // Guardar el arreglo actualizado en sessionStorage
    sessionStorage.setItem('ProductosListaDeDeseos', JSON.stringify(productosListaDeDeseos));
    
    // Vuelve a cargar la lista de deseos para reflejar los cambios
    mostrarListaDeDeseos();
}

// Ejecutar la función para mostrar la lista de deseos cuando se carga la página
document.addEventListener('DOMContentLoaded', mostrarListaDeDeseos);
