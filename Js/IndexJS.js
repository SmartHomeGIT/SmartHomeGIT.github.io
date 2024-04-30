var cookieOne = 0;
function aceptarCookies() {
    if (cookieOne == 0){
        var cookieNotice = document.getElementById('cookie-notice');
        cookieNotice.style.display = 'none';
        cookieOne ++;
    }

}
 // Obtener referencia al botón de hamburguesa y al menú
 const hamburguesaBtn = document.querySelector('.hamburguesa-btn');
 const menu = document.querySelector('.menu');

 // Agregar evento de clic al botón de hamburguesa
 hamburguesaBtn.addEventListener('click', () => {
     // Alternar clase 'open' en el menú para mostrarlo u ocultarlo
     menu.classList.toggle('open');
 });

 window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-DL4V3R27KH');



  
  function abrirPagina(pagina) {
    window.location.href = pagina;
}   

window.onload = function() {
      var inputBusqueda = document.getElementById('busqueda');

      // Guardar el texto predeterminado
      var textoPredeterminado = inputBusqueda.value;

      // Evento cuando se enfoca el input
      inputBusqueda.addEventListener('focus', function() {
        if (this.value === textoPredeterminado) {
          this.value = '';
        }
      });

      // Evento cuando se pierde el foco del input
      inputBusqueda.addEventListener('blur', function() {
        if (this.value === '') {
          this.value = textoPredeterminado;
        }
      });
    };


