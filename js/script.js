/**
 * JavaScript para el portafolio - Efectos, menú activo, MODAL y REDIRECCIONES
 * Version responsiva
 */

// ==================================================
// BASE DE DATOS DE PROYECTOS (EN EL MISMO ORDEN QUE EL HTML)
// ==================================================
const proyectosData = {
    // PROYECTO 1 (comentario HTML: PROYECTO 1)
    'proyecto10': {
        titulo: 'El Dia Que Compre Flores',
        artista: 'Rocio Torio',
        detalle: 'Álbum',
        descripcion: 'Producción y mezcla del álbum.',
        imagen: 'imagenes/galeria/trabajo10.png'
    },
    // PROYECTO 2 (comentario HTML: PROYECTO 2)
    'proyecto7': {
        titulo: 'Filter Fauna',
        artista: 'Filter Fauna',
        detalle: 'Álbum',
        descripcion: 'Álbum homónimo que define el sonido característico del proyecto. Composicion, Produccion y Mezcla.',
        imagen: 'imagenes/galeria/trabajo7.png'
    },
    // PROYECTO 3 (comentario HTML: PROYECTO 3)
    'proyecto11': {
        titulo: 'El dia',
        artista: 'Urdaneta',
        detalle: 'Sencillo',
        descripcion: 'Composición.',
        imagen: 'imagenes/galeria/trabajo11.png'
    },
    // PROYECTO 4 (comentario HTML: PROYECTO 4)
    'proyecto2': {
        titulo: 'Victoria',
        artista: 'Andres Guerrero',
        detalle: 'Sencillo',
        descripcion: 'Ingeniero de grabación para este potente sencillo.',
        imagen: 'imagenes/galeria/trabajo2.png'
    },
    // PROYECTO 5 (comentario HTML: PROYECTO 5)
    'proyecto1': {
        titulo: 'Al son de tus temores',
        artista: 'Filter Fauna',
        detalle: 'EP · 2015',
        descripcion: 'Una exploración atmosférica donde la oscuridad se vuelve melodía. Composicion, Produccion y Mezcla.',
        imagen: 'imagenes/galeria/trabajo1.png'
    },
    // PROYECTO 6 (comentario HTML: PROYECTO 6)
    'proyecto3': {
        titulo: 'BITS',
        artista: 'Filter Fauna',
        detalle: 'EP',
        descripcion: 'Piezas cortas que capturan momentos y emociones. Composicion, Produccion y Mezcla.',
        imagen: 'imagenes/galeria/trabajo3.png'
    },
    // PROYECTO 7 (comentario HTML: PROYECTO 7)
    'proyecto9': {
        titulo: 'PPIIEELL',
        artista: 'Filter Fauna',
        detalle: 'Sencillo',
        descripcion: 'Composición y producción.',
        imagen: 'imagenes/galeria/trabajo9.png'
    },
    // PROYECTO 8 (comentario HTML: PROYECTO 8)
    'proyecto4': {
        titulo: 'Cenizas',
        artista: 'Koncobard',
        detalle: 'Sencillo',
        descripcion: 'Composición, producción y mezcla.',
        imagen: 'imagenes/galeria/trabajo4.png'
    },
    // PROYECTO 9 (comentario HTML: PROYECTO 9)
    'proyecto5': {
        titulo: 'Donde mueren los planetas',
        artista: 'Passiflora y Psicotropicos',
        detalle: 'Sencillo',
        descripcion: 'Producción musical del sencillo.',
        imagen: 'imagenes/galeria/trabajo5.png'
    },
    // PROYECTO 10 (comentario HTML: PROYECTO 10)
    'proyecto6': {
        titulo: 'El Cielo',
        artista: 'Passiflora y Psicotropicos',
        detalle: 'Sencillo',
        descripcion: 'Producción musical',
        imagen: 'imagenes/galeria/trabajo6.png'
    },
    // PROYECTO 11 (comentario HTML: PROYECTO 11)
    'proyecto8': {
        titulo: 'Etéreo',
        artista: 'Passiflora y Psicotrópicos',
        detalle: 'Sencillo',
        descripcion: 'Producción musical',
        imagen: 'imagenes/galeria/trabajo8.png'
    },
    // PROYECTO 12 (comentario HTML: PROYECTO 12)
    'proyecto12': {
        titulo: 'VOCES ANGUSTIA Y FUEGO (REMIX)',
        artista: 'Pocket Tincho-Birna Quoya-Ain Sof-Filter Fauna',
        detalle: 'Sencillo',
        descripcion: 'MEZCLA',
        imagen: 'imagenes/galeria/trabajo12.png'
    },
    // PROYECTO 13 (comentario HTML: PROYECTO 13)
    'proyecto13': {
        titulo: 'VOCES ANGUSTIA Y FUEGO (REMIX)',
        artista: 'Thomas Parr-Caillou-Filter Fauna',
        detalle: 'Sencillo',
        descripcion: 'MEZCLA',
        imagen: 'imagenes/galeria/trabajo13.png'
    }
};

// Esperar a que todo el HTML esté cargado
document.addEventListener('DOMContentLoaded', function() {

    // ==================================================
    // 1. ANIMACIÓN DE ENTRADA (fade-in) para las secciones
    // ==================================================
    const secciones = document.querySelectorAll('.seccion');
    const opcionesObservador = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
    const observador = new IntersectionObserver(function(entradas) {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('seccion-visible');
                observador.unobserve(entrada.target);
            }
        });
    }, opcionesObservador);
    secciones.forEach(seccion => {
        seccion.classList.add('seccion-oculta');
        observador.observe(seccion);
    });

    // ==================================================
    // 2. MENÚ ACTIVO
    // ==================================================
    const enlacesMenu = document.querySelectorAll('.menu-principal a');
    function actualizarMenuActivo() {
        let scrollPos = window.scrollY + 150;
        enlacesMenu.forEach(enlace => {
            const seccionId = enlace.getAttribute('href');
            if (!seccionId || seccionId === '#') return;
            const seccionDestino = document.querySelector(seccionId);
            if (!seccionDestino) return;
            const topSeccion = seccionDestino.offsetTop;
            const bottomSeccion = topSeccion + seccionDestino.offsetHeight;
            if (scrollPos >= topSeccion && scrollPos < bottomSeccion) {
                enlacesMenu.forEach(link => link.classList.remove('activo'));
                enlace.classList.add('activo');
            }
        });
    }
    window.addEventListener('scroll', actualizarMenuActivo);
    actualizarMenuActivo();

    // ==================================================
    // 3. SCROLL SUAVE
    // ==================================================
    enlacesMenu.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            const destinoId = this.getAttribute('href');
            if (!destinoId || destinoId === '#') return;
            const destino = document.querySelector(destinoId);
            if (destino) {
                destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
                history.pushState(null, null, destinoId);
            }
        });
    });

    // ==================================================
    // 4. MODAL PROYECTOS
    // ==================================================
    const modal = document.getElementById('modalProyecto');
    const modalImagen = document.getElementById('modalImagen');
    const modalTitulo = document.getElementById('modalTitulo');
    const modalArtista = document.getElementById('modalArtista');
    const modalDetalle = document.getElementById('modalDetalle');
    const modalDescripcion = document.getElementById('modalDescripcion');
    let proyectosArray = [];
    let indiceActual = 0;

    function abrirModal(proyectoId) {
        const proyecto = proyectosData[proyectoId];
        if (proyecto) {
            modalImagen.src = proyecto.imagen;
            modalImagen.alt = proyecto.titulo;
            modalTitulo.textContent = proyecto.titulo;
            modalArtista.textContent = proyecto.artista;
            modalDetalle.innerHTML = `<strong>Formato:</strong> ${proyecto.detalle}`;
            modalDescripcion.textContent = proyecto.descripcion;
            indiceActual = proyectosArray.indexOf(proyectoId);
            modal.classList.add('abierto');
            document.body.style.overflow = 'hidden';
        }
    }
    function cerrarModal() {
        modal.classList.remove('abierto');
        document.body.style.overflow = '';
    }
    function siguienteProyecto() {
        let nuevoIndice = indiceActual + 1;
        if (nuevoIndice >= proyectosArray.length) nuevoIndice = 0;
        abrirModal(proyectosArray[nuevoIndice]);
    }
    function anteriorProyecto() {
        let nuevoIndice = indiceActual - 1;
        if (nuevoIndice < 0) nuevoIndice = proyectosArray.length - 1;
        abrirModal(proyectosArray[nuevoIndice]);
    }

    const cerrarBtn = document.querySelector('.cerrar-modal');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    if (cerrarBtn) cerrarBtn.addEventListener('click', cerrarModal);
    if (nextBtn) nextBtn.addEventListener('click', siguienteProyecto);
    if (prevBtn) prevBtn.addEventListener('click', anteriorProyecto);
    window.addEventListener('click', (e) => { if (e.target === modal) cerrarModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('abierto')) cerrarModal(); });

    // ==================================================
    // 5. VINCULAR PROYECTOS DE LA GALERÍA AL MODAL
    // ==================================================
    const itemsGaleria = document.querySelectorAll('.item-galeria');
    if (itemsGaleria.length > 0) {
        proyectosArray = Array.from(itemsGaleria).map(item => item.dataset.proyectoId);
        itemsGaleria.forEach((item) => {
            item.addEventListener('click', (e) => {
                const proyectoId = item.dataset.proyectoId;
                if (proyectoId && proyectosData[proyectoId]) {
                    abrirModal(proyectoId);
                }
            });
        });
    }

    // ==================================================
    // 6. MODAL NEWSLETTER (Google Forms)
    // ==================================================
    const modalNewsletter = document.getElementById('modalNewsletter');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');

    if (modalNewsletter) modalNewsletter.style.display = 'none';

    function abrirModalNewsletter(e) {
        if (e) e.preventDefault();
        if (modalNewsletter) {
            modalNewsletter.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }
    function cerrarModalNewsletter() {
        if (modalNewsletter) {
            modalNewsletter.style.display = 'none';
            document.body.style.overflow = '';
        }
    }
    if (openModalBtn) openModalBtn.addEventListener('click', abrirModalNewsletter);
    if (closeModalBtn) closeModalBtn.addEventListener('click', cerrarModalNewsletter);
    window.addEventListener('click', (e) => { if (e.target === modalNewsletter) cerrarModalNewsletter(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modalNewsletter && modalNewsletter.style.display === 'flex') cerrarModalNewsletter(); });

    // ==================================================
    // 7. REDIRECCIÓN DISCOS FILTER FAUNA
    // ==================================================
    const discosFilterFauna = document.querySelectorAll('.item-disco');
    discosFilterFauna.forEach(disco => {
        disco.addEventListener('click', function(e) {
            const url = this.getAttribute('data-url');
            if (url) window.open(url, '_blank');
        });
    });
});

// ==================================================
// ESTILOS DINÁMICOS PARA LAS ANIMACIONES
// ==================================================
const style = document.createElement('style');
style.textContent = `
    .seccion-oculta {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .seccion-visible {
        opacity: 1;
        transform: translateY(0);
    }
    .menu-principal a.activo {
        border-bottom-color: #FF6B00;
        color: #FF8C00;
        font-weight: bold;
    }
`;
document.head.appendChild(style);

// ==================================================
// 8. FORMULARIO NEWSLETTER CON WEB3FORMS
// ==================================================

const newsletterForm = document.getElementById('newsletterForm');
const newsletterFeedback = document.getElementById('newsletterFeedback');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores
        const nombre = document.getElementById('newsletterNombre').value.trim();
        const email = document.getElementById('newsletterEmail').value.trim();
        
        // Validar
        if (!nombre) {
            mostrarFeedbackNewsletter('❌ Por favor ingresa tu nombre.', 'error');
            return;
        }
        
        if (!email) {
            mostrarFeedbackNewsletter('❌ Por favor ingresa tu correo electrónico.', 'error');
            return;
        }
        
        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            mostrarFeedbackNewsletter('❌ Por favor ingresa un correo electrónico válido.', 'error');
            return;
        }
        
        // Mostrar mensaje de "enviando..."
        mostrarFeedbackNewsletter('📧 Enviando...', 'info');
        
        // Preparar datos para Web3Forms
        const formData = new FormData();
        formData.append('access_key', '6cd559f8-f9fc-4c78-bb71-71ce3a44eab4');
        formData.append('name', nombre);
        formData.append('email', email);
        formData.append('subject', 'Nuevo suscriptor de Filter Fauna');
        formData.append('from_name', 'Filter Fauna Website');
        
        // Enviar a Web3Forms
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                mostrarFeedbackNewsletter('✅ ¡Gracias por suscribirte!.', 'success');
                newsletterForm.reset();
            } else {
                mostrarFeedbackNewsletter('❌ Hubo un error: ' + (data.message || 'Inténtalo de nuevo'), 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            mostrarFeedbackNewsletter('❌ Error de conexión. Por favor inténtalo más tarde.', 'error');
        });
    });
}

function mostrarFeedbackNewsletter(mensaje, tipo) {
    if (!newsletterFeedback) return;
    
    newsletterFeedback.textContent = mensaje;
    newsletterFeedback.className = `newsletter-feedback ${tipo}`;
    newsletterFeedback.style.display = 'block';
    
    // Scroll suave al mensaje
    newsletterFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Ocultar después de 5 segundos (excepto mensajes de info)
    if (tipo !== 'info') {
        setTimeout(() => {
            newsletterFeedback.style.display = 'none';
        }, 5000);
    }
}