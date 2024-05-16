var Ordenes = [];
cargarDatosOrdenes().then(mostrarDatosOrdenes).catch(error => {
    console.error('Error al cargar los datos:', error);
});
async function cargarDatosOrdenes() {
    try {
        const response = await fetch('Json/Ordenes.json');
        const datosOrdenes = await response.json();
        Ordenes = datosOrdenes; // Agregar los datos al arreglo Ordenes
        return datosOrdenes;
    } catch (error) {
        console.error('Error al cargar los datos:', error);
        return null;
    }
}

function mostrarProductosOrden(orden) {
    // Crear una tabla para mostrar los productos de la orden
    var tablaProductos = document.createElement("table");
    tablaProductos.classList.add("productos-table"); // Añadir una clase para el estilo
    
    // Crear encabezados de la tabla
    var encabezado = tablaProductos.createTHead();
    var filaEncabezado = encabezado.insertRow();
    var thImagen = filaEncabezado.insertCell();
    var thNombre = filaEncabezado.insertCell();
    thNombre.textContent = "Nombre";
    var thPrecio = filaEncabezado.insertCell();
    thPrecio.textContent = "Precio";
    var thCantidad = filaEncabezado.insertCell();
    thCantidad.textContent = "Cantidad";
    var thSubtotal = filaEncabezado.insertCell();
    thSubtotal.textContent = "Subtotal";
    
    // Agregar filas de productos
    orden.ProductosOrden.forEach(function(producto) {
        var filaProducto = tablaProductos.insertRow();

        var tdImagen = filaProducto.insertCell();
        var imagen = document.createElement('img');
        imagen.src = producto.imagen;
        imagen.style = "height: 80px; aspect-ratio: 1/1;";
        tdImagen.appendChild(imagen);


        var tdNombre = filaProducto.insertCell();
        tdNombre.textContent = producto.nombre;
        var tdPrecio = filaProducto.insertCell();
        tdPrecio.textContent = producto.precio;
        var tdCantidad = filaProducto.insertCell();
        tdCantidad.textContent = producto.Cantidad;
        var tdSubtotal = filaProducto.insertCell();
        tdSubtotal.textContent = producto.SubTotal;
    });
    
    return tablaProductos;
}

function mostrarDatosOrdenes(Ordeness) {
    const tablaBody = document.getElementById('ResultadosOrdenes');
    tablaBody.innerHTML = '';
    
    Ordeness.forEach(function(orden) {
        var NuevaOrden = {
            NumeroOrden: orden.NOrden,
            ProductosOrden: orden.ProductosOrden,
            CantidadArticulos: orden.CantidadArticulos,
            FechaOrden: orden.FechaOrden,
            Total: orden.Total
        };
        Ordenes.push(NuevaOrden);         
        
        var fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${orden.NOrden}</td>
            <td>${orden.CantidadArticulos}</td>
            <td>${orden.Total}</td>
            <td>${orden.FechaOrden}</td>
            <td><button Id='BotonDetalles' onclick="mostrarProductos(${Ordenes.indexOf(NuevaOrden)})">Ver Detalles</button></td>
        `;
        tablaBody.appendChild(fila);
    });
}

function mostrarProductos(index) {
    var orden = Ordenes[index];
    var divOverlay = document.createElement("div");
    divOverlay.classList.add("overlay"); // Agregar una clase para el estilo
    divOverlay.innerHTML = `
        <div class="productos-container">
            <button id='BotonCerrar' onclick="cerrarOverlay()">Cerrar</button>
            ${mostrarProductosOrden(orden).outerHTML}
        </div>
    `;
    document.body.appendChild(divOverlay);
}

function cerrarOverlay() {
    var overlay = document.querySelector(".overlay");
    overlay.parentNode.removeChild(overlay);
}
