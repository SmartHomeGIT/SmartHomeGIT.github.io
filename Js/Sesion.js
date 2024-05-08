//cargamos los datos para la sesion que vienen cuando se registra o inicia sesion 
const emailUsuario = sessionStorage.getItem('email');
const usuarioMostrarIndex = document.getElementById('UsuarioMostrarIndex');

if (emailUsuario && emailUsuario != null) {
  // Si hay un correo almacenado (consulta = true)
  usuarioMostrarIndex.textContent = emailUsuario;
  usuarioMostrarIndex.href = '#';
  usuarioMostrarIndex.style.fontSize = 'medium';
} else {
  // Si no hay que el enlace apunte a la página de inicio de sesión
  usuarioMostrarIndex.textContent = 'Iniciar Sesión';
  usuarioMostrarIndex.href = 'Login.html';
  document.getElementById('ListaUsuario').style.display = 'none';

}


function CerrarSesion(){
  sessionStorage.removeItem('email');
  emailUsuario = null;  
  window.location.reload();
}