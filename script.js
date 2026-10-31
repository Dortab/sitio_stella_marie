document.addEventListener('DOMContentLoaded', function() {
    
    // --- Funcionalidad del Menú Móvil ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
        });

        // Cierra el menú al tocar fuera de él en móvil
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active') &&
                !navMenu.contains(e.target) &&
                !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });

        // Cierra el menú al seleccionar un enlace
        navMenu.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }

    // --- Franja de Aviso de Preventa (Todas las páginas) ---
    const preventaStrip = document.getElementById('preventa-strip');
    const preventaStripClose = document.getElementById('preventa-strip-close');

    if (preventaStrip && preventaStripClose) {
        try {
            if (sessionStorage.getItem('preventaStripClosed') === '1') {
                preventaStrip.style.display = 'none';
            }
        } catch (e) {}

        preventaStripClose.addEventListener('click', function() {
            preventaStrip.style.display = 'none';
            try {
                sessionStorage.setItem('preventaStripClosed', '1');
            } catch (e) {}
        });
    }

    // --- Tarjeta Flotante de Preventa (Página Santoral) ---
    // Aparece después de 15 segundos o al bajar en la página, una vez por visita.
    const preventaCard = document.getElementById('preventa-card');
    const preventaCardClose = document.getElementById('preventa-card-close');

    if (preventaCard && preventaCardClose) {
        let cardClosed = false;
        try {
            cardClosed = sessionStorage.getItem('preventaCardClosed') === '1';
        } catch (e) {}

        if (!cardClosed) {
            let cardTimer;
            const onScroll = function() {
                if (window.scrollY > 600) {
                    showCard();
                }
            };
            const showCard = function() {
                preventaCard.hidden = false;
                window.removeEventListener('scroll', onScroll);
                clearTimeout(cardTimer);
            };
            cardTimer = setTimeout(showCard, 15000);
            window.addEventListener('scroll', onScroll, { passive: true });
        }

        const hideCard = function() {
            preventaCard.hidden = true;
            try {
                sessionStorage.setItem('preventaCardClosed', '1');
            } catch (e) {}
        };
        preventaCardClose.addEventListener('click', hideCard);
        preventaCard.querySelector('a').addEventListener('click', hideCard);
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

        // Disparadores para las infografías del CATECISMO y las imágenes de la agenda
        const infographicImages = document.querySelectorAll('.infographic-thumbnail, .zoomable');
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

    // --- Botones de Paquetes por WhatsApp (Página Catálogo) ---
    const packButtons = document.querySelectorAll('.pack-button');

    if (packButtons.length > 0) {
        packButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const pack = this.dataset.pack;
                const agendaNumber = '525538775248';
                let message = pack
                    ? `Hola Stella Marie, me interesa apartar el ${pack} de la Agenda Católica 2027 en preventa.`
                    : 'Hola Stella Marie, me interesa la preventa de la Agenda Católica 2027.';
                const encodedMessage = encodeURIComponent(message);
                const whatsappURL = `https://wa.me/${agendaNumber}?text=${encodedMessage}`;
                window.open(whatsappURL, '_blank', 'noopener,noreferrer');
            });
        });
    }

    // --- Filtro de Meses (Página Santoral) ---
    const monthBtns = document.querySelectorAll('.month-btn');
    const calendarMonths = document.querySelectorAll('.calendar-month');

    if (monthBtns.length > 0) {
        monthBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const selected = this.dataset.month;

                monthBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                if (selected === 'all') {
                    calendarMonths.forEach(m => m.style.display = '');
                } else {
                    calendarMonths.forEach(m => {
                        m.style.display = m.dataset.month === selected ? '' : 'none';
                    });
                }
            });
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