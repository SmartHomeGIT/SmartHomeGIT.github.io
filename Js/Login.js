import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCoclc2zrK86twW5aU_pkHKKTjZuxd9r00",
    authDomain: "smarthome-4f7ca.firebaseapp.com",
    projectId: "smarthome-4f7ca",
    storageBucket: "smarthome-4f7ca.firebasestorage.app",
    messagingSenderId: "176169264261",
    appId: "1:176169264261:web:33ce39f5bf4fa0b6ee75ec"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function Submit(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value.toLowerCase();
    const password = document.getElementById('password').value;

    try {
        // Autenticar al usuario con Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Guardar los datos del usuario en sessionStorage
        sessionStorage.setItem('email', user.email);
        sessionStorage.setItem('userId', user.uid);

        alert('Se inició sesión exitosamente, Redirigiendo...');
        abrirPagina('index.html');
    } catch (error) {
        // Si ocurre un error (por ejemplo, credenciales incorrectas)
        document.getElementById('email').style.border = '2px solid red';
        document.getElementById('password').style.border = '2px solid red';
        alert('Correo electrónico o contraseña incorrectos');
    }
}

// Es solo para que brinque de campos cuando se le de enter
document.getElementById('email').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('password').focus();
        event.preventDefault();
        document.getElementById('email').style.border = '1px solid black';
        document.getElementById('password').style.border = '1px solid black';
    }
});

document.getElementById('password').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        Submit(event);
        event.preventDefault();
    }
});

document.getElementById('BotonIniciarSesion').addEventListener('click', Submit);


function abrirPagina(pagina) {
    window.location.href = pagina;
}