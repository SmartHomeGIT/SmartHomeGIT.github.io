// Arreglo para almacenar los productos en el carrito
let Productos = [];

// Función para cargar los datos del carrito desde Carrito.json
async function cargarDatosCarrito() {
    try {
        const response = await fetch('Json/Carrito.json');
        const datosCarrito = await response.json();
        Productos = datosCarrito; // Agregar los datos al arreglo Productos
        return datosCarrito;
    } catch (error) {
        console.error('Error al cargar los datos del carrito:', error);
        return null;
    }
}

// Función para mostrar el carrito de compras
async function mostrarCarrito() {
    // Obtener los datos del carrito desde Carrito.json o desde el arreglo Productos
    const datosCarrito = Productos.length ? Productos : await cargarDatosCarrito();
    
    if (!datosCarrito) {
        console.error('No se pudieron cargar los datos del carrito');
        return;
    }

    // Obtener la referencia a la tabla del carrito
    const carritoTable = document.getElementById('carrito-table');
    // Limpiar el contenido de la tabla antes de llenarla
    carritoTable.querySelector('tbody').innerHTML = '';

    let total = 0; // Variable para almacenar el total general

    // Recorrer los productos en el carrito
    for (const producto of datosCarrito) {
        const { imagen, nombre, precio, cantidad } = producto;

        // Calcular el subtotal
        const subtotal = cantidad * precio;
        total += subtotal;

        // Crear una nueva fila para el producto en el carrito
        const fila = document.createElement('tr');

        const columnaImagen = document.createElement('td');
        const imagenElement = document.createElement('img');
        imagenElement.src = imagen;
        imagenElement.style.height = '90px'; 
        imagenElement.style.aspectRatio = '1/1'; 
        columnaImagen.appendChild(imagenElement);

        const columnaNombre = document.createElement('td');
        columnaNombre.textContent = nombre;

        const columnaPrecio = document.createElement('td');
        columnaPrecio.textContent = `$${precio.toFixed(2)}`;

        const columnaCantidad = document.createElement('td');
        columnaCantidad.textContent = cantidad;

        const columnaSubtotal = document.createElement('td');
        columnaSubtotal.textContent = `$${subtotal.toFixed(2)}`;

        const columnaEliminar = document.createElement('td');
        const botonEliminar = document.createElement('img');
        botonEliminar.src = 'Img/Eliminar.png';
        botonEliminar.style.width = '50px';
        botonEliminar.style.cursor = 'pointer';
        botonEliminar.addEventListener('click', () => eliminarProducto(nombre));
        columnaEliminar.appendChild(botonEliminar);

        // Añadir las columnas a la fila
        fila.appendChild(columnaImagen);
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
        <p>Total: $${total.toFixed(2)}</p>`;

    // Guardar el total en sessionStorage
    sessionStorage.setItem('total', total);
    
}

// Función para eliminar un producto del carrito
function eliminarProducto(nombreProducto) {
    // Filtrar los productos para excluir el producto a eliminar
    Productos = Productos.filter(producto => producto.nombre !== nombreProducto);

    // Volver a cargar y mostrar el carrito
    mostrarCarrito();
}

// Ejecutar la función para mostrar el carrito cuando se carga la página
document.addEventListener('DOMContentLoaded', function(){
    mostrarCarrito();
    paypal.Buttons({
        createOrder: function(data, actions) {
            const totalCarrito = parseInt(sessionStorage.getItem('total'), 10);
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: totalCarrito // Utiliza el total actualizado del carrito
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(orderData) {
                alert('Pago exitoso. Gracias por tu compra.');
                sessionStorage.setItem('HistorialCompra', sessionStorage.getItem('ProductosCarrito'));
                sessionStorage.setItem('ProductosCarrito', '');
                mostrarCarrito();
            });
        },
        style: {
            label: 'pay'
        },
        onCancel: function(data) {
            alert('Pago Cancelado');
        }
    }).render('#paypal-button-container');
});











const hamburguesaBtn = document.querySelector('.hamburguesa-btn');
const menu = document.querySelector('.menu');

// Agregar evento de clic al botón de hamburguesa
hamburguesaBtn.addEventListener('click', () => {
    // Alternar clase 'open' en el menú para mostrarlo u ocultarlo
    menu.classList.toggle('open');
});