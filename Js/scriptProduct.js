 // Cambiar la imagen principal del producto
        function changeImage(imageSrc) {
            var mainImage = document.getElementById('product-image');
            mainImage.src = imageSrc;
        }

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
            liked = !liked;
            if (liked) {
                heart.classList.add('liked');
            } else {
                heart.classList.remove('liked');
            }
        }

        // Agregar evento de clic al corazón
        document.querySelector('.heart').addEventListener('click', toggleLike);

        // Actualizar precio del producto cuando se cambia la cantidad
        const priceElement = document.getElementById('precio-producto');
        const cantidadInput = document.getElementById('cantidad');
        const precioBase = 699.00; // Precio base del producto

        cantidadInput.addEventListener('input', function() {
            const nuevaCantidad = parseInt(this.value);
            const nuevoPrecio = precioBase * nuevaCantidad;
            priceElement.textContent = '$' + nuevoPrecio.toFixed(2); // Formatear el precio con dos decimales
        });