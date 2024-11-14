const abrirMenu = document.getElementById('abrir_menu');
const cerrarMenu = document.getElementById('cerrar_menu');
const nav = document.querySelector('.nav');

abrirMenu.addEventListener('click', () => {
    nav.classList.add('nav-visible');
});

cerrarMenu.addEventListener('click', () => {
    nav.classList.remove('nav-visible');
});