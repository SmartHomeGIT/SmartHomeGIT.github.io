let datos = [];
let resultadosElementOriginalHTML = ''; // Almacenar el HTML original del elemento resultadosElement

fetch('Json/Productos.json')
    .then(response => response.json())
    .then(data => {
        datos = data;
        // Almacenar el HTML original del elemento resultadosElement
        resultadosElementOriginalHTML = document.getElementById('resultadoss').innerHTML;
    })
    .catch(error => {
        console.error('Error al cargar los datos JSON:', error);
    });

function buscarProductos() {
    const textoBusqueda = document.getElementById('BarraBusqueda').value.trim().toLowerCase();
    const resultadosElement = document.getElementById('resultadoss');
    resultadosElement.innerHTML = ''; // Limpiar los resultados actuales

    if (textoBusqueda === '') {
        // Si el campo de búsqueda está vacío, mostrar un mensaje indicando que no hay resultados
        resultadosElement.innerHTML = '<li>Introduce un término de búsqueda.</li>';
    } else {
        const resultadosEncontrados = datos.filter(producto => {
            return producto.nombre.toLowerCase().includes(textoBusqueda);
        });

        if (resultadosEncontrados.length === 0) {
            // Si no se encontraron resultados, mostrar un mensaje indicando esto
            resultadosElement.innerHTML = '<li>No se encontraron resultados.</li>';
        } else {
            // Mostrar los resultados encontrados
            resultadosEncontrados.forEach(producto => {
                const li = document.createElement('li');
                const enlace = document.createElement('a');
                enlace.href = producto.url; // Utilizamos la URL del producto del JSON
                enlace.onclick = function() {
                    sessionStorage.setItem('productomostrar', producto.id);
                };
                const img = document.createElement('img');
                img.src = producto.imagen; // Utilizamos la imagen del producto del JSON
                img.alt = producto.nombre;
                img.style.width = '70px';
                img.style.aspectRatio = '1/1';
                img.style.objectFit = 'contain';
                img.style.marginRight = '10px';
                enlace.appendChild(img);
                enlace.appendChild(document.createTextNode(producto.nombre));
                li.appendChild(enlace);
                resultadosElement.appendChild(li);
            });
        }
    }
}