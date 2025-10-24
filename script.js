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

    // --- GALERÍA DE IMÁGENES DEL PRODUCTO ---
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail-gallery .thumbnail');

    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                // Cambiar la imagen principal
                mainImage.src = this.src;

                // Quitar la clase 'active' de todas las miniaturas
                thumbnails.forEach(thumb => thumb.classList.remove('active'));

                // Añadir la clase 'active' solo a la miniatura clickeada
                this.classList.add('active');
            });
        });
    }

    // --- Lógica del Modal (Zoom) ---
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image-content');
    const closeBtn = document.getElementById('modal-close');

    if (modal && mainImage && modalImg && closeBtn) {
        
        // Abrir modal al hacer clic en la imagen principal
        mainImage.addEventListener('click', function() {
            modal.classList.add('active'); // Muestra el modal
            modalImg.src = this.src; // Carga la imagen actual
        });

        // Cerrar modal con el botón 'x'
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('active'); // Oculta el modal
        });

        // Cerrar modal al hacer clic fuera de la imagen (en el overlay)
        modal.addEventListener('click', function(e) {
            if (e.target === modal) { // Si el clic es en el overlay y no en la imagen
                modal.classList.remove('active'); // Oculta el modal
            }
        });
    }

    // --- Botón Dinámico de WhatsApp ---
    const whatsappBtn = document.getElementById('whatsapp-button');
    const quantityInput = document.getElementById('quantity');

    if (whatsappBtn && quantityInput) {
        whatsappBtn.addEventListener('click', function() {
            // 1. Obtener la cantidad seleccionada
            const quantity = quantityInput.value;
            
            // 2. Definir el número y el mensaje
            const baseNumber = '525512436351';
            let message = `Hola, me interesa adquirir ${quantity} agenda(s). Quiero conocer el precio y gastos de envío.`;
            
            // 3. Codificar el mensaje para la URL
            const encodedMessage = encodeURIComponent(message);
            
            // 4. Crear la URL final
            const whatsappURL = `https://wa.me/${baseNumber}?text=${encodedMessage}`;
            
            // 5. Abrir en una nueva pestaña
            window.open(whatsappURL, '_blank', 'noopener,noreferrer');
        });
    }

}); // <-- Fin del 'DOMContentLoaded'

// --- Limpiador de formulario (Esto se queda) ---
window.addEventListener('pageshow', function(event) {
    
    if (event.persisted) {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.reset();
        }
    }
});