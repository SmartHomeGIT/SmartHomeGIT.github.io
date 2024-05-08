// Variable para almacenar los datos JSON
let datos = [];

fetch('Json/Productos.json')
    .then(response => response.json())
    .then(data => {
        // Almacenar los datos JSON en la variable 'datos'
        datos = data;
    })
    .catch(error => {
        console.error('Error al cargar los datos JSON:', error);
    });

// Función que busca productos según el texto ingresado
function buscarProductos() {
    // Obtener el texto de búsqueda
    const textoBusqueda = document.getElementById('BarraBusqueda').value.toLowerCase();

    // Filtrar los datos según el texto de búsqueda
    const resultadosFiltrados = datos.filter(producto => {
        return producto.nombre.toLowerCase().includes(textoBusqueda) ||
               producto.descripcion.toLowerCase().includes(textoBusqueda) ||
               producto.categoria.toLowerCase().includes(textoBusqueda);
    });

    // Obtener el elemento donde se mostrarán los resultados
    const resultadosElement = document.getElementById('resultados');

    // Limpiar los resultados anteriores
    resultadosElement.innerHTML = '';

    // Mostrar los resultados filtrados
    resultadosFiltrados.forEach(producto => {
        // Crear un elemento de lista (li)
        const li = document.createElement('li');

        // Crear un enlace (a) que dirigirá a 'Producto.html'
        const enlace = document.createElement('a');
        enlace.href = 'Producto.html';
        enlace.onclick = function() {
            sessionStorage.setItem('productomostrar', producto.id);
        };

        // Crear una imagen pequeña para el producto
        const img = document.createElement('img');
        img.src = producto.imagen;
        img.alt = producto.nombre;
        img.style.width = '20px';
        img.style.aspectRatio = '1/1';
        img.style.objectFit = 'contain';
        img.style.marginRight = '10px';

        // Agregar la imagen y el nombre del producto al enlace
        enlace.appendChild(img);
        enlace.appendChild(document.createTextNode(producto.nombre));

        // Agregar el enlace a la lista
        li.appendChild(enlace);
        
        // Agregar la lista al elemento de resultados
        resultadosElement.appendChild(li);
    });
}
