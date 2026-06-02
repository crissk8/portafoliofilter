/**
 * JavaScript para el portafolio - Efectos, menú activo, MODAL y REDIRECCIONES
 * Version responsiva
 */

// ==================================================
// BASE DE DATOS DE PROYECTOS
// ==================================================
const proyectosData = {
    'proyecto1': {
        titulo: 'Al son de tus temores',
        artista: 'Filter Fauna',
        detalle: 'EP · 2015',
        descripcion: 'Una exploración atmosférica donde la oscuridad se vuelve melodía.',
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
        descripcion: 'Piezas cortas que capturan momentos y emociones.',
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
        descripcion: 'Álbum homónimo que define el sonido característico.',
        imagen: 'imagenes/galeria/trabajo7.png'
    },
    'proyecto8': {
        titulo: 'Etéreo',
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
        titulo: 'El día',
        artista: 'Urdaneta',
        detalle: 'Sencillo',
        descripcion: 'Composición.',
        imagen: 'imagenes/galeria/trabajo11.png'
    },
    'proyecto12': {
        titulo: 'Proyecto 12',
        artista: 'Artista',
        detalle: 'Sencillo',
        descripcion: 'Ingeniería de sonido.',
        imagen: 'imagenes/galeria/trabajo12.png'
    },
    'proyecto13': {
        titulo: 'Proyecto 13',
        artista: 'Artista',
        detalle: 'Colaboración',
        descripcion: 'Colaboración especial.',
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

    const itemsGaleria = document.querySelectorAll('.item-galeria');
    if (itemsGaleria.length > 0) {
        proyectosArray = Array.from(itemsGaleria).map(item => item.dataset.proyectoId);
        itemsGaleria.forEach((item) => {
            item.addEventListener('click', (e) => {
               