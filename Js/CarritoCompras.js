// Función para cargar el JSON de los productos
async function cargarDatosProductos() {
    // Asegúrate de que la ruta al archivo JSON sea correcta
    const response = await fetch('Json/Productos.json');
    const datosProductos = await response.json();
    return datosProductos;
}

// Función para mostrar el carrito de compras
async function mostrarCarrito() {
    // Obtener el arreglo de productos del carrito de sessionStorage
    let productosCarrito = sessionStorage.getItem('ProductosCarrito');
    
    if (productosCarrito) {
        // Analiza los datos JSON almacenados en sessionStorage a un arreglo de objetos
        productosCarrito = JSON.parse(productosCarrito);
    } else {
        // Si no hay datos en sessionStorage, productosCarrito será un arreglo vacío
        productosCarrito = [];
    }

    // Cargar los datos de Productos.json
    const datosProductos = await cargarDatosProductos();

    // Verifica si los datos de Productos.json se cargaron correctamente
    if (!datosProductos) {
        console.error('No se pudieron cargar los datos de Productos.json');
        return;
    }

    // Obtén la referencia a la tabla del carrito
    const carritoTable = document.getElementById('carrito-table');
    // Limpia el contenido de la tabla antes de llenarla
    carritoTable.querySelector('tbody').innerHTML = '';

    let total = 0; // Variable para almacenar el total general

    // Recorrer los productos en el carrito
    for (const productoCarrito of productosCarrito) {
        const { id, cantidad } = productoCarrito;

        // Encontrar el producto correspondiente en los datos de Productos.json
        const producto = datosProductos.find(p => p.id == id);

        // Verifica si se encontró el producto en los datos JSON
        if (!producto) {
            console.warn(`Producto con ID ${id} no encontrado en Productos.json`);
            continue;
        }

        const { nombre, precio, imagen } = producto;

        // Calcular el subtotal
        const subtotal = cantidad * precio;
        total += subtotal;

        // Crear una nueva fila para el producto en el carrito
        const fila = document.createElement('tr');

        // Crear columnas para imagen, nombre, precio, cantidad, y subtotal
        const columnaFoto = document.createElement('td');
        const img = document.createElement('img');
        img.src = imagen;
        img.alt = nombre;
        columnaFoto.appendChild(img);

        const columnaNombre = document.createElement('td');
        columnaNombre.textContent = nombre;

        const columnaPrecio = document.createElement('td');
        columnaPrecio.textContent = `$${precio.toFixed(2)}`;

        const columnaCantidad = document.createElement('td');
        columnaCantidad.textContent = cantidad;

        const columnaSubtotal = document.createElement('td');
        columnaSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        
        const columnaEliminar = document.createElement('td');
        const imgEliminar = document.createElement('img');
        imgEliminar.src = 'Img/Eliminar.png';
        imgEliminar.alt = 'Eliminar producto';
        imgEliminar.style.width = '50px';
        imgEliminar.style.cursor = 'pointer';

        imgEliminar.onclick = function() {
            eliminarProducto(id);
        };

        columnaEliminar.appendChild(imgEliminar);

        // Añadir las columnas a la fila
        fila.appendChild(columnaFoto);
        fila.appendChild(columnaNombre);
        fila.appendChild(columnaPrecio);
        fila.appendChild(columnaCantidad);
        fila.appendChild(columnaSubtotal);
        fila.appendChild(columnaEliminar);

        // Añadir la fila al cuerpo de la tabla
        carritoTable.querySelector('tbody').appendChild(fila);
    }

    // Mostrar el total general en el div de totales
    const totalesDiv = document.getElementById('totales-div');
    totalesDiv.innerHTML = `
        <p>Total: $${total.toFixed(2)}</p>
    `;

    // Asigna un evento de clic al botón de proceder al pago
    document.getElementById('proceder-pago-btn').onclick = function() {
        // Implementa la funcionalidad para proceder al pago
        alert('Procediendo al pago...');
    };
}

// Ejecutar la función para mostrar el carrito cuando se carga la página
document.addEventListener('DOMContentLoaded', mostrarCarrito);



function eliminarProducto(id) {
    // Obtener el arreglo de productos del carrito de sessionStorage
    let productosCarrito = sessionStorage.getItem('ProductosCarrito');
    
    if (productosCarrito) {
        productosCarrito = JSON.parse(productosCarrito);
    } else {
        productosCarrito = [];
    }
    // Filtrar el arreglo para eliminar el producto con el ID especificado
    productosCarrito = productosCarrito.filter(producto => producto.id !== id);
    
    // Guardar el arreglo actualizado en sessionStorage
    sessionStorage.setItem('ProductosCarrito', JSON.stringify(productosCarrito));
    
    // Vuelve a cargar el carrito para reflejar los cambios
    mostrarCarrito();
}