// Desplazamiento suave al hacer clic en el menú
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Desplazamiento suave desde el botón "Ver Servicios"
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

// Efecto hover en el botón de la sección principal (hero)
const heroButton = document.querySelector('#hero button');
heroButton.addEventListener('mouseenter', () => {
    heroButton.style.transform = 'scale(1.1)';
    heroButton.style.backgroundColor = '#e0a800';
    heroButton.style.transition = 'transform 0.3s, background-color 0.3s';
});

heroButton.addEventListener('mouseleave', () => {
    heroButton.style.transform = 'scale(1)';
    heroButton.style.backgroundColor = '#ffc107';
});

// Animación de entrada para las imágenes de servicios al hacer scroll
const serviciosImages = document.querySelectorAll('.imagenes img');

function checkPosition() {
    serviciosImages.forEach(img => {
        const imgPosition = img.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (imgPosition < screenHeight) {
            img.style.opacity = 1;
            img.style.transform = 'translateY(0)';
            img.style.transition = 'opacity 1s, transform 1s';
        }
    });
}

// Añadir efecto de animación cuando las imágenes entran en la vista
window.addEventListener('scroll', checkPosition);

// Establecer el estado inicial de las imágenes
serviciosImages.forEach(img => {
    img.style.opacity = 0;
    img.style.transform = 'translateY(50px)';
});

// Llamar a la función al cargar la página para las imágenes visibles desde el inicio
window.onload = checkPosition;
// Variables para el modal y la navegación
let modal = document.getElementById('imageModal');
let modalImg = document.getElementById('modalImage');
let captionText = document.getElementById('modalCaption');
let images = document.querySelectorAll('.imagenes img');
let currentIndex = 0;

// Mostrar imagen en el modal
function openModal(index) {
    modal.style.display = 'block';
    currentIndex = index;
    modalImg.src = images[currentIndex].src;
    captionText.innerHTML = images[currentIndex].alt;
}

// Cerrar el modal
document.querySelector('.close').onclick = function() {
    modal.style.display = 'none';
}

// Cambiar a la imagen anterior
document.querySelector('.prev').onclick = function() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    modalImg.src = images[currentIndex].src;
    captionText.innerHTML = images[currentIndex].alt;
}

// Cambiar a la siguiente imagen
document.querySelector('.next').onclick = function() {
    currentIndex = (currentIndex + 1) % images.length;
    modalImg.src = images[currentIndex].src;
    captionText.innerHTML = images[currentIndex].alt;
}

// Cerrar el modal al hacer clic fuera de la imagen
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Añadir eventos de clic a las imágenes para abrir el modal
images.forEach((img, index) => {
    img.onclick = function() {
        openModal(index);
    }
});