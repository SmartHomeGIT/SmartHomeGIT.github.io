async function cargarDatosProductos() {
    const response = await fetch('Json/Productos.json');
    const datosProductos = await response.json();
    return datosProductos;
}

// Función para mostrar el Historial de compras
async function mostrarHistorial() {
    // Obtener el arreglo de productos del carrito de sessionStorage
    let productosOrdenes = sessionStorage.getItem('ProductosCarrito');
    
    if (productosOrdenes) {
        // Analiza los datos JSON almacenados en sessionStorage a un arreglo de objetos
        productosOrdenes = JSON.parse(productosOrdenes);
    } else {
        // Si no hay datos en sessionStorage, productosOrdenes será un arreglo vacío
        productosOrdenes = [];
    }

    // Cargar los datos de Productos.json
    const datosProductos = await cargarDatosProductos();

    // Verifica si los datos de Productos.json se cargaron correctamente
    if (!datosProductos) {
        console.error('No se pudieron cargar los datos de Productos.json');
        return;
    }

    // Obtén la referencia a la tabla del carrito
    const historialTable = document.getElementById('Historial-table');
    // Limpia el contenido de la tabla antes de llenarla
    historialTable.querySelector('tbody').innerHTML = '';

    let total = 0; // Variable para almacenar el total general

    // Recorrer los productos en el carrito
    for (const productoHistorial of productosOrdenes) {
        const { id, cantidad } = productoHistorial;

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
        


        // Añadir las columnas a la fila
        fila.appendChild(columnaFoto);
        fila.appendChild(columnaNombre);
        fila.appendChild(columnaPrecio);
        fila.appendChild(columnaCantidad);
        fila.appendChild(columnaSubtotal);

        // Añadir la fila al cuerpo de la tabla
        historialTable.querySelector('tbody').appendChild(fila);
    }

    // Mostrar el total general en el div de totales
    const totalesDiv = document.getElementById('totales-div');
    totalesDiv.innerHTML = `<p>Total: $${total.toFixed(2)}</p>`;


}// Ejecutar la función para mostrar el carrito cuando se carga la página
document.addEventListener('DOMContentLoaded', mostrarHistorial);
