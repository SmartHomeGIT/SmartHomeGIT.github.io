function abrirPagina(pagina) {
    window.location.href = pagina;
}
async function Submit(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.toLowerCase();   
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;
    
    if (password !== password2) {
        alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
        return;
    }

    try{
        const response = await fetch('./Json/Usuarios.json');
        const usuarios = await response.json();

        // Verificar si el correo ya existe
        const emailExists = usuarios.some(usuario => usuario.email.toLowerCase() === email);
        if (emailExists) {
            alert('El correo electrónico ya está registrado. Por favor, elige otro.');
            return;
        }

        //creamos una sesion temporal para que el usuario se guarde y podamos manejarlo en otra parte
        sessionStorage.setItem('password', password)
        sessionStorage.setItem('email',email );
        
        alert('Registro exitoso'+sessionStorage.getItem('email'));
        abrirPagina('index.html');

    }catch (error){
        console.error('Error al cargar los datos de los usuarios:', error);
        alert('Ocurrió un error');
    }



}
// es solo para que brinque de campos cuando se le de enter
document.getElementById('email').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('password').focus();
        event.preventDefault();
    }
});

document.getElementById('password').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('password2').focus();
        event.preventDefault();
    }
});

document.getElementById('password2').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        Submit(event);
        event.preventDefault();
    }
});
document.getElementById('BotonIniciarSesion').addEventListener('click', Submit);

