import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore'; 

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
const db = getFirestore(app); // Inicializamos Firestore

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

    try {
        // Registra al usuario usando Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Guardar el usuario en Firestore con su UID
        await setDoc(doc(db, "Web_Users", user.uid), {
            email: email,
            uid: user.uid,
            createdAt: new Date()
        });

        // Guardar el email y UID en sessionStorage
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('userId', user.uid);

        alert('Registro exitoso. Bienvenido, ' + email);
        abrirPagina('index.html');
    } catch (error) {
        console.error('Error al registrar al usuario:', error.message);
        alert('Ocurrió un error en el registro');
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