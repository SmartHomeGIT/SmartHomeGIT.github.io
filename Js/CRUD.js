var usuariosArray = [] ;
var productosArray = [] ;

function toggleOpcionesCRUD() {
    var opciones = document.getElementById('OpcionesCRUD');
    if (opciones.classList.contains('mostrar')) {
        opciones.classList.remove('mostrar');
    } else {
        opciones.classList.add('mostrar');
    }

    var header = document.getElementById('OpcionesCRUD')
    header.style.height = '200px';
    header.style.backgroundColor = 'rgba(255, 255, 255, 0.802)';
}

function mostrarTituloUno() {    
    //la ok
    var titulouno = document.getElementById("TituloCrudUno");
    var inicio = document.getElementById('dashboard');
    inicio.style.visibility = 'hidden';
    inicio.style.display = 'none';
    titulouno.style.visibility = "visible";
    titulouno.style.display = "block";
    var mainuno = document.getElementById("mainuno");
    mainuno.style.visibility = "visible";
    mainuno.style.display = "block";
    var UsuarioOpcion = document.getElementById("UsuarioOpcion")
    UsuarioOpcion.style.color = "#009295";
    UsuarioOpcion.style.textDecoration = "underline";
    //la que no quiero
    var titulodos = document.getElementById("TituloCrudDos");
    titulodos.style.visibility = "hidden";
    titulodos.style.display = "none";
    var maindos = document.getElementById("maindos");
    maindos.style.visibility = "hidden";
    maindos.style.display = "none";
    var productoOpcion = document.getElementById("ProductosOpcion");
    productoOpcion.style.color = "#3E3E3E";
    productoOpcion.style.textDecoration = "none";

    
}

function mostrarTituloDos() { //aqui igual que arriba
    var productoOpcion = document.getElementById("ProductosOpcion");
    productoOpcion.style.color = "#009295";
    productoOpcion.style.textDecoration = "underline";
    var titulodos = document.getElementById("TituloCrudDos");
    titulodos.style.visibility = "visible";
    titulodos.style.display = "block";
    var maindos = document.getElementById("maindos");
    maindos.style.display = "block";
    maindos.style.visibility = "visible";
    var inicio = document.getElementById('dashboard');
    inicio.style.visibility = 'hidden';
    inicio.style.display = 'none';

    var titulo = document.getElementById("TituloCrudUno");
    titulo.style.visibility = "hidden";
    titulo.style.display = "none";
    var mainuno = document.getElementById("mainuno");
    mainuno.style.visibility = "hidden";   
    mainuno.style.display = "none";
    var UsuarioOpcion = document.getElementById("UsuarioOpcion")
    UsuarioOpcion.style.color = "#3E3E3E";
    UsuarioOpcion.style.textDecoration = "none";
}


    function cargarJSONUsuarios() {
        var xhttpUsuarios = new XMLHttpRequest();
        xhttpUsuarios.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var usuarios = JSON.parse(this.responseText);
                mostrarUsuarios(usuarios);
            }
        };
        xhttpUsuarios.open("GET", "Json/Usuarios.json", true);
        xhttpUsuarios.send();
    }
    function mostrarUsuarios(usuarios) {
        var tablaBody = document.getElementById("tablaUsuariosBody");
        usuarios.forEach(function(usuarioo) {
            var nuevoUsuario = {
                id: usuarioo.id,
                email: usuarioo.email,
                password: usuarioo.password,
                nombre: usuarioo.nombre,
                apellido: usuarioo.apellido,
                direccion: usuarioo.direccion,
                role: "user"
            };
            usuariosArray.push(nuevoUsuario);
        });
    
        usuariosArray.forEach(function(usuario) {
            var fila = document.createElement("tr");
            fila.id = "usuario_" + usuario.id;
            fila.innerHTML =
                "<td>" + usuario.id + "</td><td>" +
                usuario.email + "</td><td>" +
                usuario.password + "</td><td>" +
                usuario.nombre + "</td><td>" +
                usuario.apellido + "</td><td>" +
                "<button id='verDireccionBtn' onclick='verDireccion(\"" + usuario.direccion + "\")'>Ver Direccion</button>" + "</td><td>" +
                usuario.role + "</td><td>" +
                "<button class='BotonEditar' onclick='editarUsuario(" + usuario.id + ")'>Editar</button>" + "</td><td>" +
                "<button class='BotonEliminar' onclick='eliminarUsuario(this)'>Eliminar</button>" + "</td>";
            tablaBody.appendChild(fila);
        });
    }
        function verDireccion(DireccionUsuario) {
            alert(DireccionUsuario);
        }

        cargarJSONUsuarios()
        



            document.getElementById("IdAutomaticoUser").addEventListener("change", function() {
                //si esta checked que no se vea
                if (this.checked) {                    
                    document.getElementById("IdUsuario").style.visibility = "hidden";
                } else {                    
                    document.getElementById("IdUsuario").style.visibility = "visible";
                }
            });

            



// Agregar USUARIO
function agregarUsuario() {
    var idInput = document.getElementById("IdUsuario");
    var email = document.getElementById("emailIN").value;
    var password = document.getElementById("passwordIN").value;
    var nombre = document.getElementById("nombreIN").value;
    var apellido = document.getElementById("apellidoIN").value;
    var direccion = document.getElementById("direccionIN").value;
    var rol = 'user';
    var tablaBody = document.getElementById("tablaUsuariosBody");

    var nuevoId;

    // Verificar si el checkbox de ID automático está seleccionado
    if (document.getElementById("IdAutomaticoUser").checked) {
        // Obtener la última fila de la tabla para obtener el último ID
        var ultimaFila = tablaBody.rows[tablaBody.rows.length - 1];
        var ultimoId = 0;
        if (ultimaFila) {
            ultimoId = parseInt(ultimaFila.cells[0].textContent); // Obtener el ID de la última fila
        }
        // Incrementar el último ID para obtener el nuevo ID
        nuevoId = ultimoId + 1;
        // Ocultar el input del ID
        idInput.style.visibility = "hidden";
    } else {
        // Utilizar el valor ingresado por el usuario en el input del ID
        nuevoId = idInput.value;
    }

    // Verificar si ya existe una fila con el mismo ID en la tabla
    var filaExistente = document.getElementById("usuario_" + nuevoId);
    if (filaExistente) {
        // Si existe, actualizar la fila existente con los nuevos datos del usuario
        filaExistente.cells[1].textContent = email;
        filaExistente.cells[2].textContent = password;
        filaExistente.cells[3].textContent = nombre;
        filaExistente.cells[4].textContent = apellido;
        filaExistente.cells[5].innerHTML = "<button id='verDireccionBtn' onclick='verDireccion(\"" + direccion + "\")'>Ver Direccion</button>";
        filaExistente.cells[6].textContent = rol;
    } else {
        // Si no existe, crear una nueva fila
        var fila = document.createElement("tr");
        fila.id = "usuario_" + nuevoId;
        fila.innerHTML = "<td>" + nuevoId + "</td><td>" +
            email + "</td><td>" +
            password + "</td><td>" +
            nombre + "</td><td>" +
            apellido + "</td><td>" +
            "<button id='verDireccionBtn' onclick='verDireccion(\"" + direccion + "\")'>Ver Direccion</button>" + "</td><td>" +
            rol + "</td><td>" +
            "<button class='BotonEditar' onclick='editarUsuario(" + nuevoId + ")'>Editar</button>" + "</td><td>" +
            "<button class='BotonEliminar' onclick='eliminarUsuario(this)'>Eliminar</button>" + "</td>";

        tablaBody.appendChild(fila); // Agregar la nueva fila a la tabla
    }

    // Agregar el nuevo usuario al array
    var nuevoUsuario = {
        id: nuevoId,
        email: email,
        password: password,
        nombre: nombre,
        apellido: apellido,
        direccion: direccion,
        role: rol
    };
    usuariosArray.push(nuevoUsuario);
    console.log(usuariosArray);
    document.getElementById("AgregarUsuarioForm").reset(); // Reiniciar el formulario
}

//Eliminar Usuario
function eliminarUsuario(boton) {
    var filaAEliminar = boton.closest("tr");
    if (filaAEliminar) {
        filaAEliminar.remove();
    } else {
        console.error("No se encontró la fila a eliminar");
    }
}


function editarUsuario(id) {
    // Buscar el usuario en el arreglo usuariosArray
    var usuario = usuariosArray.find(function(u) {
        return u.id === id;
    });

    
    // Verificar si se encontró el usuario
    if (usuario) {
        // Rellenar campos del formulario con los datos del usuario
        llenarFormulario(usuario);
    } else {
        // Para usuarios nuevos, simplemente llenar el ID y limpiar otros campos
        document.getElementById("IdUsuario").value = id;
        document.getElementById("emailIN").value = "";
        document.getElementById("passwordIN").value = "";
        document.getElementById("nombreIN").value = "";
        document.getElementById("apellidoIN").value = "";
        document.getElementById("direccionIN").value = "";

        // Desmarcar el checkbox de ID automático y mostrar el input del ID
        var checkboxIdAutomatico = document.getElementById("IdAutomaticoUser");
        checkboxIdAutomatico.checked = false;
        document.getElementById("IdUsuario").style.visibility = "visible";
    }
}

function llenarFormulario(usuario) {
    document.getElementById("IdUsuario").value = usuario.id;
    document.getElementById("emailIN").value = usuario.email;
    document.getElementById("passwordIN").value = usuario.password;
    document.getElementById("nombreIN").value = usuario.nombre;
    document.getElementById("apellidoIN").value = usuario.apellido;
    document.getElementById("direccionIN").value = usuario.direccion;

    var checkboxIdAutomatico = document.getElementById("IdAutomaticoUser");
    checkboxIdAutomatico.checked = false;
    document.getElementById("IdUsuario").style.visibility = "visible";
}





















function cargarJSONProductos() {
    var xhttpProductos = new XMLHttpRequest();
    xhttpProductos.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var Productos = JSON.parse(this.responseText);
            mostrarProductos(Productos);
        }
    };
    xhttpProductos.open("GET", "Json/Productos.json", true);
    xhttpProductos.send();
}

function mostrarProductos(Productos) {
    var tablaBodyProd = document.getElementById("tablaProductosBody");
    Productos.forEach(function(productoo) {
        var nuevoProducto = {
            id: productoo.id,
            imagen: productoo.imagen,
            nombre: productoo.nombre,
            precio: productoo.precio,
            categoria: productoo.categoria,
            descripcion: productoo.descripcion
        };
        productosArray.push(nuevoProducto);
    });

    productosArray.forEach(function(producto) {
        var fila = document.createElement("tr");
        fila.id = "producto_" + producto.id;
        fila.innerHTML =
            "<td>" + producto.id + "</td><td>" +
            "<img style='height: 80px; aspect-ratio: 1/1;' src='" + producto.imagen + "'></img>" + "</td><td>" +
            producto.nombre + "</td><td>" +
            producto.precio + "</td><td>" +
            producto.categoria + "</td><td>" +
            "<button id='verDetalleBtn' onclick='verDetalle(\"" + producto.descripcion + "\")'>Ver Descripcion</button>" + "</td><td>" +
            "<button class='BotonEditar' onclick='editarProducto(" + producto.id + ")'>Editar</button>" + "</td><td>" +
            "<button class='BotonEliminar' onclick='eliminarProducto(this)'>Eliminar</button>" + "</td>";
        tablaBodyProd.appendChild(fila);
    });
}

            function verDetalle(descripcionCompleta) {
                alert(descripcionCompleta);
            }
            document.getElementById("IdAutomaticoProd").addEventListener("change", function() {
                //si esta checked que no se vea
                if (this.checked) {                    
                    document.getElementById("IdProducto").style.visibility = "hidden";
                } else {                    
                    document.getElementById("IdProducto").style.visibility = "visible";
                }
            });


            function agregarProducto() {
                var idInput = document.getElementById("IdProducto");
                var nombre = document.getElementById("NombreProducto").value;
                var precio = document.getElementById("PrecioProducto").value;
                var categoria = document.getElementById("CategoriaProducto").value;
                var imagen = document.getElementById("Imagen1").value;
                var descripcion = document.getElementById("DescripcionProducto").value;
                var tablaBodyProd = document.getElementById("tablaProductosBody");
            
                var nuevoId;
            
                if (document.getElementById("IdAutomaticoProd").checked) {
                    var ultimaFila = tablaBodyProd.rows[tablaBodyProd.rows.length - 1];
                    var ultimoId = 0;
                    if (ultimaFila) {
                        ultimoId = parseInt(ultimaFila.cells[0].textContent);
                    }
                    nuevoId = ultimoId + 1;
                    idInput.style.visibility = "hidden";
                } else {
                    nuevoId = idInput.value;
                }
            
                var filaExistente = document.getElementById("producto_" + nuevoId);
                if (filaExistente) {
                    filaExistente.cells[1].Content = "<img style='height: 80px; aspect-ratio: 1/1;' src='" + imagen + "'></img>" ;
                    filaExistente.cells[2].textContent = nombre;
                    filaExistente.cells[3].textContent = precio;
                    filaExistente.cells[4].textContent = categoria;
                    filaExistente.cells[5].innerHTML = "<button id='verDetalleBtn' onclick='verDetalle(\"" + descripcion + "\")'>Ver Descripcion</button>";
                } else {
                    var fila = document.createElement("tr");
                    fila.id = "producto_" + nuevoId;
                    fila.innerHTML = "<td>" + nuevoId + "</td><td>" +
                        "<img style='height: 80px; aspect-ratio: 1/1;' src='" + imagen + "'></img>" + "</td><td>" +
                        nombre + "</td><td>" +
                        precio + "</td><td>" +
                        categoria + "</td><td>" +
                        "<button id='verDetalleBtn' onclick='verDetalle(\"" + descripcion + "\")'>Ver Descripcion</button>" + "</td><td>" +
                        "<button class='BotonEditar' onclick='editarProducto(" + nuevoId + ")'>Editar</button>" + "</td><td>" +
                        "<button class='BotonEliminar' onclick='eliminarProducto(this)'>Eliminar</button>" + "</td>";
                    tablaBodyProd.appendChild(fila);
                }
            
                var nuevoProducto = {
                    id: nuevoId,
                    imagen: imagen,
                    nombre: nombre,
                    precio: precio,
                    categoria: categoria,
                    descripcion: descripcion
                };
                productosArray.push(nuevoProducto);
                console.log(productosArray);
                document.getElementById("AgregarProductoForm").reset();
            }
            

            function eliminarProducto(boton) {
    var filaAEliminar = boton.closest("tr");
    if (filaAEliminar) {
        // Obtener el ID del producto de la fila a eliminar
        var idProducto = parseInt(filaAEliminar.cells[0].textContent);

        // Eliminar el producto del array
        productosArray = productosArray.filter(function(producto) {
            return producto.id !== idProducto;
        });

        // Eliminar la fila de la tabla
        filaAEliminar.remove();

        console.log("Producto con ID " + idProducto + " eliminado.");
    } else {
        console.error("No se encontró la fila a eliminar");
    }
}


            function editarProducto(id) {
                var producto = productosArray.find(function(p) {
                    return p.id === id;
                });
            
                if (producto) {
                    llenarFormularioProducto(producto);
                } else {
                    console.error("No se encontró el producto con ID: " + id);
                }
            }
            
            function llenarFormularioProducto(producto) {
                // Llenar el formulario de edición con los datos del producto
                document.getElementById("IdProducto").value = producto.id;
                document.getElementById("NombreProducto").value = producto.nombre;
                document.getElementById("PrecioProducto").value = producto.precio;
                document.getElementById("CategoriaProducto").value = producto.categoria;
                document.getElementById("Imagen1").value = producto.imagen;
                document.getElementById("DescripcionProducto").value = producto.descripcion;
            
                // Ocultar o mostrar el campo de ID dependiendo de la configuración
                var checkboxIdAutomatico = document.getElementById("IdAutomaticoProd");
                checkboxIdAutomatico.checked = false;
                document.getElementById("IdProducto").style.visibility = "visible";
            }
            cargarJSONProductos()


            function abrirPagina(pagina) {
                window.location.href = pagina;
            }  