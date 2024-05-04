function abrirPagina(pagina) {
    window.location.href = pagina;
}
async function Submit(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.toLowerCase();   
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;
    





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