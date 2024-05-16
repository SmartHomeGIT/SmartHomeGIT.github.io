var productosLista = [];

async function cargarDatosLista() {
    try {
        const response = await fetch('Json/ListaDeseos.json');
        const datosLista = await response.json();
        productosLista = datosLista; // Agregar los datos al arreglo productosLista
        return datosLista;
    } catch (error) {
        console.error('Error al cargar los datos:', error);
        return null;
    }
}

function mostrarLista() {
    const listaBody = document.getElementById('lista-body');
    listaBody.innerHTML = ''; // Limpiar el contenido de la tabla antes de llenarla

    for (const producto of productosLista) {
        const fila = document.createElement('tr');

        // Celda para la imagen
        const columnaImagen = document.createElement('td');
        const imagen = document.createElement('img');
        imagen.src = producto.imagen;
        imagen.style.height = '90px'; 
        imagen.style.aspectRatio = '1/1'; 
        columnaImagen.appendChild(imagen);

        // Celda para el nombre del producto
        const columnaNombre = document.createElement('td');
        columnaNombre.textContent = producto.nombre;

        // Celda para el precio
        const columnaPrecio = document.createElement('td');
        columnaPrecio.textContent = `$${producto.precio.toFixed(2)}`;

        // Celda para el botón de eliminar
        const columnaEliminar = document.createElement('td');
        const botonEliminar = document.createElement('img');
        botonEliminar.src = 'Img/Eliminar.png';
        botonEliminar.style.width = '50px';
        botonEliminar.style.cursor = 'pointer';
        botonEliminar.addEventListener('click', () => eliminarProducto(producto));
        columnaEliminar.appendChild(botonEliminar);

        // Agregar celdas a la fila
        fila.appendChild(columnaImagen);
        fila.appendChild(columnaNombre);
        fila.appendChild(columnaPrecio);
        fila.appendChild(columnaEliminar);

        // Agregar fila a la tabla
        listaBody.appendChild(fila);
    }
}

function eliminarProducto(producto) {
    // Filtrar los productos para excluir el producto a eliminar
    productosLista = productosLista.filter(p => p !== producto);
    mostrarLista();
}

// Cargar y mostrar la lista cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    cargarDatosLista()
        .then(() => mostrarLista())
        .catch(error => console.error('Error:', error));
});

