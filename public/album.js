// Altura del menú más un margen extra para compensar la sombra
const menuHeight = document.querySelector('nav').offsetHeight + 20; // Ajusta el "+ 20" según la sombra de tu menú

// Activar el enlace "TODAS" por defecto al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const defaultLink = document.querySelector('a[href="#todas"]');

    // Eliminar la clase 'active' de todos los enlaces y agregarla solo al enlace "TODAS"
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.classList.remove('active');
    });

    if (defaultLink) {
        defaultLink.classList.add('active');
    }
});

// SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // Remueve la clase 'active' de todos los enlaces
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.classList.remove('active');
        });

        // Agrega la clase 'active' al enlace clicado
        this.classList.add('active');

        // Obtén la posición del destino de anclaje menos la altura del menú y el margen adicional
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - menuHeight;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;

        // Función de animación de desplazamiento
        function smoothScroll(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;

            const ease = progress / duration - Math.sin((2 * Math.PI * progress) / duration) / (2 * Math.PI);
            const yOffset = startPosition + distance * ease;

            window.scrollTo(0, yOffset);

            if (progress < duration) {
                window.requestAnimationFrame(smoothScroll);
            } else {
                window.scrollTo(0, targetPosition);
            }
        }

        window.requestAnimationFrame(smoothScroll);
    });
});

// BTON VER MÁS...
function verMas(button) {
    const galeria = button.previousElementSibling; // Selecciona el div de galería antes del botón

    // Alterna la clase 'expandido' y aplica altura dinámica
    if (galeria.classList.contains('expandido')) {
        galeria.style.maxHeight = '110px';  // Contracción suave
        button.innerText = 'Ver más...';
    } else {
        galeria.style.maxHeight = galeria.scrollHeight + 'px'; // Expande a su altura completa
        button.innerText = 'Ver menos...';
    }

    galeria.classList.toggle('expandido');
}

// MEJORAS
// Selección del modal y elementos relacionados
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");
const closeModal = document.getElementById("closeModal");

// Abrir el modal al hacer clic en una imagen
document.querySelectorAll(".galeria img").forEach(img => {
    img.addEventListener("click", function () {
        modal.style.display = "flex"; // Muestra el modal solo al hacer clic en la imagen
        modalImage.src = this.src;
    });
});

// Cerrar el modal al hacer clic en el botón de cierre
closeModal.onclick = function () {
    modal.style.display = "none";
}

// Cerrar el modal al hacer clic fuera de la imagen
modal.onclick = function (e) {
    if (e.target === modal) {
        modal.style.display = "none";
    }
}

// Asegúrate de que el modal esté oculto al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    modal.style.display = "none";
});
