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

    // --- GALERÍA DE IMÁGENES DEL PRODUCTO (Página Catálogo) ---
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail-gallery .thumbnail');

    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                mainImage.src = this.src;
                thumbnails.forEach(thumb => thumb.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // --- Lógica del Modal (Zoom) ---
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image-content');
    const closeBtn = document.getElementById('modal-close');

    if (modal && modalImg && closeBtn) {
        
        // Disparador para la imagen principal del CATÁLOGO
        if (mainImage) {
            mainImage.addEventListener('click', function() {
                modal.classList.add('active');
                modalImg.src = this.src;
            });
        }

        // Disparadores para las infografías del CATECISMO
        const infographicImages = document.querySelectorAll('.infographic-thumbnail');
        if (infographicImages.length > 0) {
            infographicImages.forEach(img => {
                img.addEventListener('click', function() {
                    modal.classList.add('active');
                    modalImg.src = this.src;
                });
            });
        }

        // Lógica para CERRAR el modal (funciona para ambas páginas)
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('active');
        });

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // --- Botón Dinámico de WhatsApp (Página Catálogo) ---
    const whatsappBtn = document.getElementById('whatsapp-button');
    const quantityInput = document.getElementById('quantity');

    if (whatsappBtn && quantityInput) {
        whatsappBtn.addEventListener('click', function() {
            const quantity = quantityInput.value;
            const baseNumber = '525512436351';
            let message = `Hola, me interesa adquirir ${quantity} agenda(s). Quiero conocer el precio y gastos de envío.`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappURL = `https://wa.me/${baseNumber}?text=${encodedMessage}`;
            window.open(whatsappURL, '_blank', 'noopener,noreferrer');
        });
    }

}); // <-- Fin del 'DOMContentLoaded'

// --- Limpiador de formulario (Página Contacto) ---
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.reset();
        }
    }
});