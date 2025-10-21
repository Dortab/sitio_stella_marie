document.addEventListener('DOMContentLoaded', function() {
    
    // --- Funcionalidad del Menú Móvil ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            // Alterna la clase 'active' en el menú
            navMenu.classList.toggle('active');
        });
    }

    // --- Validador de Teléfono (Solo Números) ---
    const phoneInput = document.getElementById('contact-phone');

    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
    }

}); // <-- Fin del 'DOMContentLoaded'

// =================================================================
// ===== NUEVO BLOQUE DE CÓDIGO (PEGAR AL FINAL DEL ARCHIVO) =====
// =================================================================

// Esto limpia el formulario cuando el usuario regresa
// desde la página de "Éxito" de Formspree.
window.addEventListener('pageshow', function(event) {
    
    // 'event.persisted' es 'true' si la página se cargó desde el "bfcache" (memoria)
    if (event.persisted) {
        // Busca el formulario de contacto
        const contactForm = document.getElementById('contact-form');
        
        // Si el formulario existe en la página actual, lo resetea.
        if (contactForm) {
            contactForm.reset();
        }
    }
});