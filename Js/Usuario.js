        // Realizar solicitud HTTP para obtener el archivo JSON
        fetch('Json/Usuarios.json')
            .then(response => response.json())
            .then(data => {
                // Obtener el tercer usuario del JSON
                const usuario = data[0];

                // Llenar los campos del formulario con los datos del usuario
                document.getElementById('email').value = usuario.email;
                document.getElementById('nombre').value = usuario.nombre;
                document.getElementById('apellido').value = usuario.apellido;
                document.getElementById('direccion').value = usuario.direccion;
                document.getElementById('password').value = usuario.password;
            })
            .catch(error => console.error('Error al obtener los datos:', error));

        var passwordDiv = document.getElementById('passwordDiv');
        var password2 = document.getElementById('password2');
        document.getElementById('password').addEventListener('click', () =>{                
            passwordDiv.style.visibility = "visible";
            passwordDiv.style.display = "block";
                
        })
            // Agregar un evento de clic al botón de "Actualizar Datos"
        document.getElementById('Actualizar').addEventListener('click', () => {        
            passwordDiv.style.visibility = "hidden";   
            passwordDiv.style.display = "none";
            password2.value = null;
            alert('Se actualizaron los datos');
        });
    
        passwordDiv.style.visibility = "hidden";   
        passwordDiv.style.display = "none";