// Obtén el ID del producto a mostrar desde sessionStorage
const productId = sessionStorage.getItem('productomostrar');

// Ruta del archivo JSON con los datos de los productos
const jsonFilePath = 'Json/Productos.json';

// Función para cargar el JSON y actualizar el contenido de la página
function updateProductPage() {
    // Cargar el archivo JSON con los datos de los productos
    fetch(jsonFilePath)
        .then(response => response.json())
        .then(data => {
            // Buscar el producto con el ID correspondiente
            const product = data.find(item => item.id === parseInt(productId));

            if (product) {
                // Actualizar el título del producto
                document.getElementById('Titleprod').textContent = product.nombre;

                // Actualizar la imagen principal del producto
                const mainImage = document.getElementById('product-image');
                mainImage.src = product.imagen;
                mainImage.alt = `Imagen de ${product.nombre}`;
                mainImage.title = product.nombre;

                // Actualizar el título del producto en la descripción
                const productTitle = document.querySelector('.product-description h2');
                productTitle.textContent = product.nombre;

                // Actualizar el precio del producto
                const priceElement = document.getElementById('precio-producto');
                priceElement.textContent = `$${product.precio.toFixed(2)}`;

                // Actualizar las miniaturas de las imágenes del producto
                const thumbnails = document.querySelectorAll('.product-thumbnails .thumbnail img');
                if (thumbnails.length >= 3) {
                    thumbnails[0].src = product.imagen;
                    thumbnails[0].alt = `Thumbnail 1 de ${product.nombre}`;
                    thumbnails[0].title = `${product.nombre} Imagen 1`;
                    thumbnails[0].closest('.thumbnail').onclick = () => changeImage(product.imagen);

                    thumbnails[1].src = product.imagen2;
                    thumbnails[1].alt = `Thumbnail 2 de ${product.nombre}`;
                    thumbnails[1].title = `${product.nombre} Imagen 2`;
                    thumbnails[1].closest('.thumbnail').onclick = () => changeImage(product.imagen2);

                    thumbnails[2].src = product.imagen3;
                    thumbnails[2].alt = `Thumbnail 3 de ${product.nombre}`;
                    thumbnails[2].title = `${product.nombre} Imagen 3`;
                    thumbnails[2].closest('.thumbnail').onclick = () => changeImage(product.imagen3);
                } else {
                    console.error('No hay suficientes miniaturas disponibles para mostrar.');
                }



                // Actualizar la descripción del producto
                const descriptionElement = document.querySelector('.product-long-description p');
                descriptionElement.textContent = product.descripcion;

                // Agregar las reseñas del producto
                const userCommentsList = document.getElementById('user-comments-list');
                const review1 = document.createElement('li');
                review1.textContent = product.reseña1;
                userCommentsList.appendChild(review1);

                const review2 = document.createElement('li');
                review2.textContent = product.reseña2;
                userCommentsList.appendChild(review2);
            }
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
        });
}

// Cambiar la imagen principal del producto
function changeImage(imageSrc) {
    const mainImage = document.getElementById('product-image');
    mainImage.src = imageSrc;
}

// Llama a la función para actualizar la página del producto al cargar la página
document.addEventListener('DOMContentLoaded', updateProductPage);
 
 






















 

 
 
 
 
        

        // Agregar comentario del usuario
        document.getElementById('add-comment-btn').addEventListener('click', addComment);

        function addComment() {
            var userComment = document.getElementById('user-comment').value;
            var userCommentsList = document.getElementById('user-comments-list');

            // Crear un nuevo elemento de comentario para el usuario
            var newUserComment = document.createElement('li');
            newUserComment.textContent = userComment;

            // Agregar el nuevo comentario a la lista de comentarios del usuario
            userCommentsList.appendChild(newUserComment);

            // Limpiar el área de texto del comentario del usuario
            document.getElementById('user-comment').value = "";
        }

        // Función para calificar el producto y mostrar el mensaje de clasificación
        document.addEventListener('DOMContentLoaded', function() {
            const stars = document.querySelectorAll('.star');
            stars.forEach(function(star, index) {
                star.addEventListener('click', function() {
                    stars.forEach(function(s, i) {
                        if (i <= index) {
                            s.classList.add('checked');
                        } else {
                            s.classList.remove('checked');
                        }
                    });

                    // Mensajes de clasificación
                    const ratingMessages = ["Malo", "Regular", "Bueno", "Muy Bueno", "Me Encanta"];
                    const ratingMessage = document.getElementById('rating-message');
                    ratingMessage.textContent = ratingMessages[index];
                    ratingMessage.style.display = 'block';
                });
            });
        });

        // Función para gestionar el "me gusta" del producto
        let liked = false;

        function toggleLike() {
            const heart = document.querySelector('.heart');
            const productId = sessionStorage.getItem('productomostrar');
            let liked = heart.classList.contains('liked'); // Verifica si ya está en estado de 'liked'
        
            // Obtén la lista de deseos actual del sessionStorage
            let wishList = sessionStorage.getItem('ProductosListaDeDeseos');
            
            // Si no hay una lista existente, inicializa un arreglo vacío
            wishList = wishList ? JSON.parse(wishList) : [];
        
            // Cambia el estado de "liked"
            liked = !liked;
            if (liked) {
                // Si el corazón se marca, agrega el ID del producto a la lista de deseos
                heart.classList.add('liked');
                if (!wishList.includes(productId)) {
                    wishList.push(productId);
                    alert('Se Agregó a Lista de Deseos');
                    console.log(wishList);
                }
            } else {
                // Si el corazón se desmarca, quita el ID del producto de la lista de deseos
                heart.classList.remove('liked');
                const index = wishList.indexOf(productId);
                if (index !== -1) {
                    wishList.splice(index, 1); // Elimina el producto del arreglo
                    alert('Se eliminó de Lista de Deseos');
                }
            }
        
            // Guarda la lista de deseos actualizada en sessionStorage
            sessionStorage.setItem('ProductosListaDeDeseos', JSON.stringify(wishList));
        }

        // Agregar evento de clic al corazón
        document.querySelector('.heart').addEventListener('click', toggleLike);

        /*
        // Actualizar precio del producto cuando se cambia la cantidad
        const priceElement = document.getElementById('precio-producto');
        const cantidadInput = document.getElementById('cantidad');
        const precioBase = 699.00; // Precio base del producto

        cantidadInput.addEventListener('input', function() {
            const nuevaCantidad = parseInt(this.value);
            const nuevoPrecio = precioBase * nuevaCantidad;
            priceElement.textContent = '$' + nuevoPrecio.toFixed(2); // Formatear el precio con dos decimales
        });*/



        // Función para agregar un producto al carrito
function agregarAlCarrito() {
    // Obtener el ID del producto actual de sessionStorage
    const productId = sessionStorage.getItem('productomostrar');
    
    // Obtener la cantidad seleccionada por el usuario
    const cantidadInput = document.getElementById('cantidad');
    const cantidadSeleccionada = parseInt(cantidadInput.value, 10);
    
    // Obtener el arreglo de productos del carrito de sessionStorage
    let productosCarrito = sessionStorage.getItem('ProductosCarrito');
    
    // Analizar la cadena JSON a un arreglo si existe
    if (productosCarrito) {
        productosCarrito = JSON.parse(productosCarrito);
    } else {
        productosCarrito = [];
    }
    
    // Verificar si el producto ya está en el carrito
    let productoEncontrado = productosCarrito.find(producto => producto.id === productId);
    
    if (productoEncontrado) {
        // Si el producto ya está en el carrito, sumar la cantidad seleccionada a la existente
        productoEncontrado.cantidad += cantidadSeleccionada;
    } else {
        // Si el producto no está en el carrito, agregar un nuevo objeto con el id y la cantidad
        productosCarrito.push({
            id: productId,
            cantidad: cantidadSeleccionada
        });
    }
    
    // Guardar el arreglo de productos actualizado en sessionStorage
    sessionStorage.setItem('ProductosCarrito', JSON.stringify(productosCarrito));
    
    console.log('Producto agregado al carrito:', productosCarrito);
    alert('Se ha agregado al carrito exitosamente...');
}

// Asignar la función agregarAlCarrito al evento onclick del botón
document.getElementById('AgregarAlCarrito').onclick = agregarAlCarrito;
