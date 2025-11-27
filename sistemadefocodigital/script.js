// 1. ACORDEÓN INTERACTIVO
document.addEventListener('DOMContentLoaded', function() {
    const accItems = document.querySelectorAll('.accordion-item');

    accItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const content = item.querySelector('.accordion-content');
            
            accItems.forEach(other => {
                if(other !== item) {
                    other.classList.remove('active');
                    other.querySelector('.accordion-content').style.maxHeight = null;
                }
            });

            item.classList.toggle('active');
            if(item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // 2. TEMPORIZADOR MEJORADO (1 hora, se reinicia)
    function startTimer(duration, display) {
        let timer = duration;
        let minutes, seconds;
        
        const savedEndTime = localStorage.getItem('foco_offer_end');
        const now = new Date().getTime();
        
        if (savedEndTime) {
            const endTime = parseInt(savedEndTime);
            const timeLeft = Math.floor((endTime - now) / 1000);
            
            if (timeLeft > 0) {
                timer = timeLeft;
            } else {

                const newEndTime = now + (duration * 1000);
                localStorage.setItem('foco_offer_end', newEndTime.toString());
            }
        } else {

            const endTime = now + (duration * 1000);
            localStorage.setItem('foco_offer_end', endTime.toString());
        }

        const interval = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            if (display) {
                display.textContent = minutes + ":" + seconds;
            }

            const topBarTimer = document.querySelector('#countdown-top');
            if (topBarTimer) {
                topBarTimer.textContent = "00:" + minutes + ":" + seconds;
            }

            if (--timer < 0) {
                clearInterval(interval);
                const newEndTime = new Date().getTime() + (duration * 1000);
                localStorage.setItem('foco_offer_end', newEndTime.toString());
                startTimer(duration, display);
            }
        }, 1000);
    }

    const offerTimer = document.querySelector('#offer-timer');
    if (offerTimer) {
        startTimer(3600, offerTimer);
    }

    // 3. ANIMACIÓN DE CONTADOR DE ESTUDIANTES
    function animateCounter(element, finalValue, duration = 2000) {
        let start = 0;
        const increment = finalValue / (duration / 16); 
        const timer = setInterval(() => {
            start += increment;
            if (start >= finalValue) {
                element.textContent = finalValue.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start).toLocaleString();
            }
        }, 16);
    }

    // 4. SCROLL SUAVE PARA ENLACES INTERNOS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 5. ANIMACIÓN AL HACER SCROLL (reveal elements)
    function revealOnScroll() {
        const elements = document.querySelectorAll('.card, .module-card, .testimonial-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
            }
        });
    }


    const animatedElements = document.querySelectorAll('.card, .module-card, .testimonial-card');
    animatedElements.forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // 6. EFECTO DE MÁQUINA DE ESCRIBIR PARA TEXTO DESTACADO
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    const typedElement = document.querySelector('.typing-effect');
    if (typedElement) {
        const text = typedElement.getAttribute('data-text') || typedElement.textContent;
        typeWriter(typedElement, text);
    }

    // 7. CONTADOR DE PERSONAS VIENDO LA OFERTA
    function updateViewerCount() {
        const countElement = document.querySelector('#viewer-count');
        if (countElement) {
            const baseCount = Math.floor(Math.random() * 13) + 12;
            countElement.textContent = baseCount;
        }
    }

    setInterval(updateViewerCount, 30000);
    updateViewerCount();

    // 8. BOTÓN FLOTANTE PARA WHATSAPP O CONSULTAS
    function createFloatingButton() {
        const floatingBtn = document.createElement('div');
        floatingBtn.className = 'floating-whatsapp';
        floatingBtn.innerHTML = `
            <a href="https://wa.me/TUNUMERO" target="_blank" class="whatsapp-btn">
                <i class="ph-fill ph-whatsapp-logo"></i>
                <span>¿Dudas?</span>
            </a>
        `;
        

        const styles = `
            <style>
                .floating-whatsapp {
                    position: fixed;
                    bottom: 100px;
                    right: 20px;
                    z-index: 1000;
                }
                .whatsapp-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: #25D366;
                    color: white;
                    padding: 12px 20px;
                    border-radius: 50px;
                    font-weight: 600;
                    box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
                    transition: all 0.3s ease;
                    text-decoration: none;
                }
                .whatsapp-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 6px 25px rgba(37, 211, 102, 0.6);
                }
                .whatsapp-btn i {
                    font-size: 1.5rem;
                }
                @media (max-width: 768px) {
                    .floating-whatsapp {
                        bottom: 80px;
                        right: 15px;
                    }
                    .whatsapp-btn span {
                        display: none;
                    }
                    .whatsapp-btn {
                        padding: 15px;
                    }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
        document.body.appendChild(floatingBtn);
    }



    // 9. ANIMACIÓN DE PROGRESO AL HACER SCROLL
    function updateReadingProgress() {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset;
        const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
        
        const progressBar = document.querySelector('.reading-progress');
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }
    }


    function createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: var(--gradient);
            width: 0%;
            z-index: 1001;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
    }

    createProgressBar();
    window.addEventListener('scroll', updateReadingProgress);

    // 10. OPTIMIZACIÓN DE IMÁGENES - Carga diferida
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    lazyLoadImages();

    // 11. CONTADOR DE TIEMPO EN LA PÁGINA
    let timeOnPage = 0;
    setInterval(() => {
        timeOnPage++;
        // Puedes usar esta información para personalizar la experiencia
        // Por ejemplo, mostrar un popup después de X tiempo
        if (timeOnPage === 60) { // Después de 1 minuto
            // Aquí podrías mostrar un popup o algún elemento de urgencia adicional
            console.log('Usuario lleva 1 minuto en la página');
        }
    }, 1000);

    // 12. DETECCIÓN DE INTENCIÓN DE SALIDA
    function setupExitIntent() {
        document.addEventListener('mouseout', (e) => {
            if (!e.toElement && !e.relatedTarget && e.clientY < 10) {
                // El usuario está intentando salir - podrías mostrar un popup de última oportunidad
                showExitPopup();
            }
        });
    }

    function showExitPopup() {
        // Implementar un popup de última oportunidad
        // Por ejemplo, ofrecer un descuento adicional o recordatorio urgente
        console.log('Usuario intenta salir - Mostrar popup de urgencia');
        
        // Aquí podrías crear y mostrar un modal
        const exitPopup = document.createElement('div');
        exitPopup.className = 'exit-popup';
        exitPopup.innerHTML = `
            <div class="popup-content">
                <h3>¡Espera! Oferta Especial</h3>
                <p>No te vayas sin aprovechar nuestro descuento del 70%. ¡Es por tiempo limitado!</p>
                <a href="#oferta" class="btn btn-primary">Obtener Descuento</a>
                <button class="close-popup">Cerrar</button>
            </div>
        `;
        
        // Añadir estilos y funcionalidad al popup
        // (Implementación completa requeriría más código)
    }

    // setupExitIntent(); // Descomenta si quieres activar esta funcionalidad

    console.log('Sistema de Foco Digital - Cargado correctamente');
});

// 13. VALIDACIÓN DE FORMULARIO (si añades formularios en el futuro)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// 14. COPIAR AL PORTAPAPELES (para códigos de descuento, etc.)
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Mostrar mensaje de éxito
        showNotification('¡Copiado al portapapeles!');
    }).catch(err => {
        console.error('Error al copiar: ', err);
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 10000;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// 15. DETECCIÓN DE VISIBILIDAD DE LA PÁGINA
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Página no visible - el usuario podría haber cambiado de pestaña
        console.log('Página no visible');
    } else {
        // Página visible nuevamente
        console.log('Página visible');
    }
});