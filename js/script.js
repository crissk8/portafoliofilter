/**
 * =====================================================
 *  JavaScript para el portafolio - Efectos, menú activo y MODAL
 * =====================================================
 */

// ==================================================
// BASE DE DATOS DE PROYECTOS (para el modal)
// ==================================================
// ¡IMPORTANTE! Agrega aquí la información de TODOS tus trabajos.
// El 'id' debe coincidir con el data-proyecto-id en el HTML de la galería.
const proyectosData = {
    'proyecto1': {
        titulo: 'Al son de tus temores',
        artista: 'Filter Fauna',
        detalle: 'EP · 2015',
        descripcion: 'Una exploración atmosférica donde la oscuridad se vuelve melodía. Composicion, Produccion y Mezcla.',
        imagen: 'imagenes/galeria/trabajo1.png'
    },
    'proyecto2': {
        titulo: 'Victoria',
        artista: 'Andres Guerrero',
        detalle: 'Sencillo',
        descripcion: 'Ingeniero de grabación para este potente sencillo.',
        imagen: 'imagenes/galeria/trabajo2.png'
    },
    'proyecto3': {
        titulo: 'BITS',
        artista: 'Filter Fauna',
        detalle: 'EP',
        descripcion: 'Piezas cortas que capturan momentos y emociones en fragmentos sonoros. Composicion, Produccion y Mezcla.',
        imagen: 'imagenes/galeria/trabajo3.png'
    },
    'proyecto4': {
        titulo: 'Cenizas',
        artista: 'Koncobard',
        detalle: 'Sencillo',
        descripcion: 'Composición, producción y mezcla.',
        imagen: 'imagenes/galeria/trabajo4.png'
    },
    'proyecto5': {
        titulo: 'Donde mueren los planetas',
        artista: 'Passiflora y Psicotropicos',
        detalle: 'Sencillo',
        descripcion: 'Producción musical del sencillo.',
        imagen: 'imagenes/galeria/trabajo5.png'
    },
    'proyecto6': {
        titulo: 'El Cielo',
        artista: 'Passiflora y Psicotropicos',
        detalle: 'Sencillo',
        descripcion: 'Producción musical.',
        imagen: 'imagenes/galeria/trabajo6.png'
    },
    'proyecto7': {
        titulo: 'Filter Fauna',
        artista: 'Filter Fauna',
        detalle: 'Álbum',
        descripcion: 'Álbum homónimo que define el sonido característico del proyecto. Composicion, Produccion y Mezcla.',
        imagen: 'imagenes/galeria/trabajo7.png'
    },
    'proyecto8': {
        titulo: 'Etérep',
        artista: 'Passiflora y Psicotrópicos',
        detalle: 'Sencillo',
        descripcion: 'Producción musical.',
        imagen: 'imagenes/galeria/trabajo8.png'
    },
    'proyecto9': {
        titulo: 'PPIIEELL',
        artista: 'Filter Fauna',
        detalle: 'Sencillo',
        descripcion: 'Composición y producción.',
        imagen: 'imagenes/galeria/trabajo9.png'
    },
    'proyecto10': {
        titulo: 'El Día Que Compré Flores',
        artista: 'Rocío Torio',
        detalle: 'Álbum',
        descripcion: 'Producción y mezcla del álbum.',
        imagen: 'imagenes/galeria/trabajo10.png'
    },
    'proyecto11': {
        titulo: 'Nombre del Proyecto 11',
        artista: 'Artista Ejemplo',
        detalle: 'EP',
        descripcion: 'Producción ejecutiva.',
        imagen: 'imagenes/galeria/trabajo11.png'
    },
    'proyecto12': {
        titulo: 'Nombre del Proyecto 12',
        artista: 'Artista Ejemplo',
        detalle: 'Sencillo',
        descripcion: 'Ingeniería de sonido.',
        imagen: 'imagenes/galeria/trabajo12.png'
    },
    'proyecto13': {
        titulo: 'Nombre del Proyecto 13',
        artista: 'Artista Ejemplo',
        detalle: 'Colaboración',
        descripcion: 'Colaboración especial.',
        imagen: 'imagenes/galeria/trabajo13.png'
    }
};

// Espera a que todo el HTML esté cargado antes de ejecutar
document.addEventListener('DOMContentLoaded', function() {

    // ==================================================
    // 1. ANIMACIÓN DE ENTRADA (fade-in) para las secciones
    // ==================================================
    
    // Selecciona todas las secciones que quieres animar
    const secciones = document.querySelectorAll('.seccion');
    
    // Opciones del observador (aparece cuando la sección entra en pantalla)
    const opcionesObservador = {
        threshold: 0.15,      // 15% visible dispara la animación
        rootMargin: '0px 0px -50px 0px'  // pequeño margen inferior
    };
    
    // Observador de intersección (para animar al hacer scroll)
    const observador = new IntersectionObserver(function(entradas, observador) {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('seccion-visible');
                // Una vez animada, ya no es necesario observarla
                observador.unobserve(entrada.target);
            }
        });
    }, opcionesObservador);
    
    // Aplicar el observador a cada sección y agregar estado inicial
    secciones.forEach(seccion => {
        seccion.classList.add('seccion-oculta');
        observador.observe(seccion);
    });
    
    // ==================================================
    // 2. MENÚ ACTIVO (resaltar el enlace según scroll)
    // ==================================================
    
    const enlacesMenu = document.querySelectorAll('.menu-principal a');
    
    function actualizarMenuActivo() {
        // Obtener la posición actual del scroll + un offset
        let scrollPos = window.scrollY + 150;
        
        enlacesMenu.forEach(enlace => {
            const seccionId = enlace.getAttribute('href');
            // Evitar enlaces que no sean internos (ej. que no empiecen con #)
            if (!seccionId || seccionId === '#') return;
            
            const seccionDestino = document.querySelector(seccionId);
            if (!seccionDestino) return;
            
            const topSeccion = seccionDestino.offsetTop;
            const bottomSeccion = topSeccion + seccionDestino.offsetHeight;
            
            // Si el scroll está dentro de esta sección
            if (scrollPos >= topSeccion && scrollPos < bottomSeccion) {
                // Remover clase activa de todos
                enlacesMenu.forEach(link => link.classList.remove('activo'));
                // Agregar clase activa al actual
                enlace.classList.add('activo');
            }
        });
    }
    
    // Escuchar el evento de scroll para actualizar el menú activo
    window.addEventListener('scroll', actualizarMenuActivo);
    // Llamar una vez al inicio para marcar la sección visible
    actualizarMenuActivo();
    
    // ==================================================
    // 3. SCROLL SUAVE (para los enlaces internos)
    // ==================================================
    
    enlacesMenu.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            // Prevenir el comportamiento por defecto (salto brusco)
            e.preventDefault();
            
            const destinoId = this.getAttribute('href');
            if (!destinoId || destinoId === '#') return;
            
            const destino = document.querySelector(destinoId);
            if (destino) {
                // Desplazamiento suave hasta la sección
                destino.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // (Opcional) Actualizar la URL sin recargar la página
                history.pushState(null, null, destinoId);
            }
        });
    });
    
    // ==================================================
    // 4. REPRODUCCIÓN DE VIDEOS (al hacer scroll, pausar si salen)
    // ==================================================
    
    const videos = document.querySelectorAll('video');
    
    function pausarVideoFueraPantalla() {
        videos.forEach(video => {
            const rect = video.getBoundingClientRect();
            const estaVisible = (
                rect.top >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
            );
            
            // Si NO está visible y NO está pausado, lo pausamos
            if (!estaVisible && !video.paused) {
                video.pause();
            }
        });
    }
    
    window.addEventListener('scroll', pausarVideoFueraPantalla);
    
    // ==================================================
    // 5. MODAL PARA PROYECTOS (Galería)
    // ==================================================
    
    // Elementos del DOM del modal
    const modal = document.getElementById('modalProyecto');
    const modalImagen = document.getElementById('modalImagen');
    const modalTitulo = document.getElementById('modalTitulo');
    const modalArtista = document.getElementById('modalArtista');
    const modalDetalle = document.getElementById('modalDetalle');
    const modalDescripcion = document.getElementById('modalDescripcion');
    
    let proyectosArray = []; // Almacenará los IDs de los proyectos en orden
    let indiceActual = 0;
    
    // Función para abrir el modal con un proyecto específico
    function abrirModal(proyectoId) {
        const proyecto = proyectosData[proyectoId];
        if (proyecto) {
            // Llenar el modal con los datos del proyecto
            modalImagen.src = proyecto.imagen;
            modalImagen.alt = proyecto.titulo;
            modalTitulo.textContent = proyecto.titulo;
            modalArtista.textContent = proyecto.artista;
            modalDetalle.innerHTML = `<strong>Formato:</strong> ${proyecto.detalle}`;
            modalDescripcion.textContent = proyecto.descripcion;
            
            // Actualizar el índice actual en el array
            indiceActual = proyectosArray.indexOf(proyectoId);
            
            // Mostrar el modal con la clase 'abierto'
            modal.classList.add('abierto');
            document.body.style.overflow = 'hidden'; // Evitar scroll detrás del modal
        } else {
            console.error('Proyecto no encontrado:', proyectoId);
        }
    }
    
    // Función para cerrar el modal
    function cerrarModal() {
        modal.classList.remove('abierto');
        document.body.style.overflow = ''; // Restaurar scroll
    }
    
    // Función para navegar al siguiente proyecto
    function siguienteProyecto() {
        let nuevoIndice = indiceActual + 1;
        if (nuevoIndice >= proyectosArray.length) {
            nuevoIndice = 0; // Volver al primero si es el último
        }
        abrirModal(proyectosArray[nuevoIndice]);
    }
    
    // Función para navegar al proyecto anterior
    function anteriorProyecto() {
        let nuevoIndice = indiceActual - 1;
        if (nuevoIndice < 0) {
            nuevoIndice = proyectosArray.length - 1; // Ir al último si es el primero
        }
        abrirModal(proyectosArray[nuevoIndice]);
    }
    
    // --- ASIGNAR EVENTOS A LOS ELEMENTOS DEL MODAL ---
    const cerrarBtn = document.querySelector('.cerrar-modal');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    if (cerrarBtn) cerrarBtn.addEventListener('click', cerrarModal);
    if (nextBtn) nextBtn.addEventListener('click', siguienteProyecto);
    if (prevBtn) prevBtn.addEventListener('click', anteriorProyecto);
    
    // Cerrar el modal si se hace clic fuera del contenido (en el fondo negro)
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            cerrarModal();
        }
    });
    
    // Cerrar modal con la tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('abierto')) {
            cerrarModal();
        }
    });
    
    // --- VINCULAR LOS PROYECTOS DE LA GALERÍA AL MODAL ---
    const itemsGaleria = document.querySelectorAll('.item-galeria');
    
    if (itemsGaleria.length > 0) {
        // Crear un array con los IDs de los proyectos, según el orden en la galería
        proyectosArray = Array.from(itemsGaleria).map(item => item.dataset.proyectoId);
        
        // Asignar el evento click a cada proyecto de la galería
        itemsGaleria.forEach((item) => {
            item.addEventListener('click', (e) => {
                // Evitar que el click en el botón "Ver más" dentro del overlay también active el modal dos veces
                if (e.target.classList && e.target.classList.contains('proyecto-link')) {
                    return;
                }
                const proyectoId = item.dataset.proyectoId;
                if (proyectoId && proyectosData[proyectoId]) {
                    abrirModal(proyectoId);
                }
            });
        });
    }
});

// ==================================================
// AGREGAR ESTILOS DINÁMICOS PARA LAS ANIMACIONES
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