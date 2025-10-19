document.addEventListener('DOMContentLoaded', function() {
    
    // Funcionalidad del Menú Móvil
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            // Alterna la clase 'active' en el menú
            // Esta clase 'active' es la que usa el CSS para mostrar u ocultar el menú
            navMenu.classList.toggle('active');
        });
    }

});