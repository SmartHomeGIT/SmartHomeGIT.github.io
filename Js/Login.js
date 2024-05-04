async function Submit(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value.toLowerCase();   
    const password = document.getElementById('password').value;

    try{
        const Archivo = await fetch('../Json/Usuarios.json');
        const Usuarios = await Archivo.json();


        const usuario = Usuarios.find(usuario => usuario.email.toLowerCase() === email);
        if (usuario && usuario.password === password) {
            alert('inicio ok')
        }
        else{
            alert('Correo Electronico o Contraseña Incorrectos')
        }
    }catch (error){
        console.error('Error al cargar los datos de los usuarios:', error);
        alert('Ocurrió un error al iniciar sesión');
    }
}

document.getElementById('BotonIniciarSesion').addEventListener('click', Submit);