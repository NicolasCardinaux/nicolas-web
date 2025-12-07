// =============================================
// FUNCIONALIDADES PRINCIPALES
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. ACORDEÓN INTERACTIVO
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

    // 2. TIMER ALEATORIO (15-30 minutos)
    function startRandomTimer(display, topBarDisplay) {
        // Generar tiempo aleatorio entre 15 y 30 minutos
        const minMinutes = 15;
        const maxMinutes = 30;
        const randomMinutes = Math.floor(Math.random() * (maxMinutes - minMinutes + 1)) + minMinutes;
        const duration = randomMinutes * 60;
        
        let timer = duration;
        let minutes, seconds;
        
        const savedEndTime = localStorage.getItem('foco_timer_end');
        const now = Date.now();
        
        if (savedEndTime) {
            const endTime = parseInt(savedEndTime);
            const timeLeft = Math.floor((endTime - now) / 1000);
            
            if (timeLeft > 0) {
                timer = timeLeft;
            } else {
                // Nuevo tiempo aleatorio
                const newEndTime = now + (duration * 1000);
                localStorage.setItem('foco_timer_end', newEndTime.toString());
            }
        } else {
            const endTime = now + (duration * 1000);
            localStorage.setItem('foco_timer_end', endTime.toString());
        }

        function updateTimer() {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
            
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            
            if (display) display.textContent = minutes + ":" + seconds;
            if (topBarDisplay) topBarDisplay.textContent = minutes + ":" + seconds;
            
            if (--timer < 0) {
                // Reiniciar con nuevo tiempo aleatorio
                const newRandomMinutes = Math.floor(Math.random() * (maxMinutes - minMinutes + 1)) + minMinutes;
                const newDuration = newRandomMinutes * 60;
                const newEndTime = Date.now() + (newDuration * 1000);
                localStorage.setItem('foco_timer_end', newEndTime.toString());
                timer = newDuration;
            }
        }
        
        updateTimer();
        setInterval(updateTimer, 1000);
    }

    // Iniciar timers
    const offerTimer = document.querySelector('#offer-timer');
    const countdownTop = document.querySelector('#countdown-top');
    if (offerTimer && countdownTop) {
        startRandomTimer(offerTimer, countdownTop);
    }

    // 3. ANIMACIÓN AL HACER SCROLL
    function revealOnScroll() {
        const elements = document.querySelectorAll('.card, .module-card, .testimonial-card, .timeline-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
            }
        });
    }

    const animatedElements = document.querySelectorAll('.card, .module-card, .testimonial-card, .timeline-item');
    animatedElements.forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

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

    // 5. CONTADOR DE VENTAS DINÁMICO
    function updateSalesCounter() {
        const salesElement = document.querySelector('#sales-counter');
        if (salesElement) {
            const baseSales = 247;
            const newSales = Math.floor(Math.random() * 3);
            const totalSales = baseSales + newSales;
            
            let current = parseInt(salesElement.textContent) || baseSales;
            const increment = (totalSales - current) / 30;
            
            const timer = setInterval(() => {
                current += increment;
                if (Math.abs(totalSales - current) < 1) {
                    salesElement.textContent = totalSales;
                    clearInterval(timer);
                } else {
                    salesElement.textContent = Math.floor(current);
                }
            }, 50);
        }
    }

    setTimeout(updateSalesCounter, 5000);
    
    // 6. CONTROL DE STICKY MOBILE - SOLO PARA TELÉFONO
    function handleStickyMobile() {
        const stickyMobile = document.querySelector('.sticky-mobile');
        const offerSection = document.getElementById('oferta');
        
        if (!stickyMobile || !offerSection) return;
        
        // Por defecto oculto en desktop
        if (window.innerWidth >= 769) {
            stickyMobile.style.display = 'none';
            return;
        }
        
        // Mostrar cuando se acerca a la sección de oferta
        window.addEventListener('scroll', function() {
            const offerTop = offerSection.offsetTop;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > offerTop - window.innerHeight / 2) {
                stickyMobile.style.display = 'flex';
            } else {
                stickyMobile.style.display = 'none';
            }
        });
    }
    
    handleStickyMobile();
    window.addEventListener('resize', handleStickyMobile);

    // =============================================
    // CORRECCIONES ESPECÍFICAS
    // =============================================

    // 7. AJUSTAR TEXTO 50 PESTAÑAS A 2 RENGLONES EXACTOS
    function adjustProblemText() {
        const firstProblemCard = document.querySelector('.pain-card:nth-child(1) p');
        if (firstProblemCard) {
            // Texto original, ya está bien en el HTML
            // Solo aseguramos que tenga exactamente 2 líneas
            firstProblemCard.style.minHeight = '3.2em';
            firstProblemCard.style.lineHeight = '1.6';
            firstProblemCard.style.marginBottom = '15px';
        }
        
        // Asegurar que todos los indicadores estén al mismo nivel
        const painIndicators = document.querySelectorAll('.pain-indicator');
        let maxHeight = 0;
        
        painIndicators.forEach(indicator => {
            const height = indicator.offsetHeight;
            if (height > maxHeight) maxHeight = height;
        });
        
        painIndicators.forEach(indicator => {
            indicator.style.minHeight = maxHeight + 'px';
            indicator.style.display = 'flex';
            indicator.style.flexDirection = 'column';
            indicator.style.justifyContent = 'flex-end';
        });
        
        // Asegurar altura uniforme de las cards
        const painCards = document.querySelectorAll('.pain-card');
        painCards.forEach(card => {
            card.style.display = 'flex';
            card.style.flexDirection = 'column';
        });
    }
    
    adjustProblemText();
    window.addEventListener('resize', adjustProblemText);

// 8. VIDEO MEJORADO - Lógica "Zona Inteligente" para Móvil
function setupVideoControls() {
    const videoElement = document.getElementById('demo-video');
    const videoContainer = document.querySelector('.video-container');
    
    if (!videoElement || !videoContainer) return;

    // Aseguramos que el contenedor tenga posición relativa para los cálculos
    videoContainer.style.position = 'relative';

    // 1. Crear el botón si no existe
    let playBtn = videoContainer.querySelector('.video-play-btn');
    if (!playBtn) {
        playBtn = document.createElement('div');
        playBtn.className = 'video-play-btn';
        playBtn.innerHTML = '▶';
        // Estilos base críticos para que funcione la lógica
        playBtn.style.position = 'absolute';
        playBtn.style.zIndex = '10';
        playBtn.style.cursor = 'pointer';
        playBtn.style.transition = 'all 0.1s ease'; // Transición rápida
        videoContainer.appendChild(playBtn);
    }
    
    // Configuración inicial del video
    videoElement.pause();
    videoElement.controls = true; // Mantenemos los controles nativos abajo

    // 2. Función que actualiza la forma del botón según el estado
    function updateState() {
        if (videoElement.paused) {
            // ESTADO: PAUSADO
            // El botón se ve azul, redondo y centrado
            playBtn.innerHTML = '▶';
            playBtn.style.opacity = '1';
            playBtn.style.background = 'rgba(59, 130, 246, 0.9)'; // Tu azul
            
            // Dimensiones de botón normal
            playBtn.style.width = '60px';
            playBtn.style.height = '60px';
            playBtn.style.borderRadius = '50%';
            playBtn.style.top = '50%';
            playBtn.style.left = '50%';
            playBtn.style.transform = 'translate(-50%, -50%)';
            
        } else {
            // ESTADO: REPRODUCIENDO (El Truco)
            // El botón se vuelve invisible y cubre todo MENOS los controles de abajo
            playBtn.innerHTML = ''; // Sin icono
            playBtn.style.opacity = '0'; // Invisible
            playBtn.style.background = 'transparent';
            
            // Dimensiones: Ocupar toda la pantalla excepto los 50px de abajo
            playBtn.style.width = '100%';
            playBtn.style.height = 'calc(100% - 60px)'; // Dejamos espacio para controles nativos
            playBtn.style.borderRadius = '0';
            playBtn.style.top = '0';
            playBtn.style.left = '0';
            playBtn.style.transform = 'none';
        }
    }

    // 3. Lógica de Play/Pause
    function togglePlay(e) {
        // Detenemos la propagación para que no pelee con el navegador
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }

        if (videoElement.paused) {
            videoElement.play();
        } else {
            videoElement.pause();
        }
        // La actualización visual se hace en los eventos 'play' y 'pause'
    }

    // 4. Eventos
    // El click en el botón (que ahora es dinámico) maneja todo
    playBtn.addEventListener('click', togglePlay);
    
    // Soporte para touch rápido en móvil
    playBtn.addEventListener('touchstart', function(e) {
        // Evitamos el "doble click" o delay en móviles
        e.preventDefault(); 
        togglePlay();
    }, { passive: false });

    // Sincronización robusta (por si usan los controles nativos de abajo)
    videoElement.addEventListener('play', updateState);
    videoElement.addEventListener('pause', updateState);
    videoElement.addEventListener('ended', () => {
        videoElement.pause();
        updateState();
    });

    // Inicializar estado visual
    updateState();
}

// 9. POPUP DE SALIDA - SOLO PARA SALIDAS REALES
let exitIntentTriggered = false;
let isClickingBuyButton = false;

function showExitPopup() {
    if (isClickingBuyButton) return; // NO mostrar si se hizo clic en botón de compra
    
    const popup = document.getElementById('exit-popup');
    if (!popup || exitIntentTriggered) return;
    
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    exitIntentTriggered = true;
    
    // Configurar botones de cierre (mantener igual)
    const closeButtons = document.querySelectorAll('.popup-close, .popup-close-btn');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            closePopup();
        });
    });
    
    // Botón "Seguir viendo"
    const stayBtn = document.querySelector('.popup-stay-btn');
    if (stayBtn) {
        stayBtn.addEventListener('click', function() {
            closePopup();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Cerrar con ESC
    document.addEventListener('keydown', function closeOnEsc(e) {
        if (e.key === 'Escape') {
            closePopup();
            document.removeEventListener('keydown', closeOnEsc);
        }
    });
    
    // Cerrar al hacer clic fuera
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            closePopup();
        }
    });
}

function closePopup() {
    const popup = document.getElementById('exit-popup');
    if (!popup) return;
    
    popup.style.opacity = '0';
    setTimeout(() => {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Detectar intento de salida
document.addEventListener('mouseleave', function(e) {
    if (e.clientY <= 50 && !exitIntentTriggered && !isClickingBuyButton) {
        setTimeout(showExitPopup, 300);
    }
});

// Detectar antes de cerrar pestaña - MODIFICADO
window.addEventListener('beforeunload', function(e) {
    if (!exitIntentTriggered && !isClickingBuyButton) {
        e.preventDefault();
        e.returnValue = '';
        showExitPopup();
        return false;
    }
});

// 10. MEJORAS DE CONVERSIÓN - CON DETECCIÓN DE BOTONES DE COMPRA
const buyButtons = document.querySelectorAll('a[href*="hotmart"], a[href="#oferta"], .btn-primary, .btn-secondary');
buyButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Marcar que se está haciendo clic en botón de compra
        isClickingBuyButton = true;
        
        // Restablecer después de 1 segundo (por si no se redirige)
        setTimeout(() => {
            isClickingBuyButton = false;
        }, 1000);
        
        // Facebook Pixel
        fbq('track', 'InitiateCheckout');
        
        // Feedback visual
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        // Si es un enlace interno (#oferta), manejar scroll suave
        if (this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
 });

    // 11. CONTADOR ALEATORIO DE UNIDADES
    function updateRemainingUnits() {
        const unitsElements = document.querySelectorAll('[data-units]');
        const randomUnits = Math.floor(Math.random() * 15) + 5; // 5-20 unidades
        
        unitsElements.forEach(element => {
            element.textContent = randomUnits;
        });
    }
    
    updateRemainingUnits();
    setInterval(updateRemainingUnits, 30000);

    // 12. DETECCIÓN DE DISPOSITIVO
    function detectDevice() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            document.body.classList.add('is-mobile');
            document.body.classList.remove('is-desktop');
        } else {
            document.body.classList.add('is-desktop');
            document.body.classList.remove('is-mobile');
        }
    }
    
    detectDevice();
    window.addEventListener('resize', detectDevice);

    console.log('✅ Sistema de Foco Digital - Todas las correcciones aplicadas');
    console.log('🎯 Popup - Tamaño reducido, diseño estético, 20% margen');
    console.log('🎥 Video - Botón play/pause centrado, controles nativos visibles');
    console.log('📝 Texto 50 pestañas - 2 líneas exactas, texto original');
    console.log('⏱️ Timer - Aleatorio 15-30 minutos');
});