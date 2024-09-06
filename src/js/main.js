let refs = {};
let btns = {};

window.onload = init;

function init() {
    // Inicializar el carrusel
    initCarousel();

    // Configurar la navegación entre secciones
    navegar();

    // Configurar el menú desplegable
    desplegarMenu();

    eliminarPlaceholder();

    // Cargar la sección "login" después de 3 segundos
    setTimeout(() => {
        cargarSeccion("login");
    }, 3000);
}

// Función para inicializar el carrusel
function initCarousel() {
    let currentIndex = 0;
    const images = document.querySelectorAll('.carousel-images img');
    const totalImages = images.length;

    if (totalImages === 0) {
        console.error("No se encontraron imágenes en el carrusel.");
        return;
    }

    function updateCarousel() {
        const carouselWidth = document.querySelector('.carousel').offsetWidth;
        const offset = -carouselWidth * currentIndex;
        document.querySelector('.carousel-images').style.transform = `translateX(${offset}px)`;
    }

    window.moveCarousel = function(direction) {
        currentIndex = (currentIndex + direction + totalImages) % totalImages;
        updateCarousel();
    };

    function autoMoveCarousel() {
        moveCarousel(1);
    }

    // Mueve el carrusel automáticamente cada 3 segundos
    let autoMoveInterval = setInterval(autoMoveCarousel, 3000);

    // Pausar el carrusel al hacer hover y reanudarlo al salir
    document.querySelector('.carousel').addEventListener('mouseover', () => {
        clearInterval(autoMoveInterval);
    });

    document.querySelector('.carousel').addEventListener('mouseout', () => {
        autoMoveInterval = setInterval(autoMoveCarousel, 3000);
    });

    // Actualiza el carrusel al cambiar el tamaño de la ventana para mantener el comportamiento responsivo
    window.addEventListener('resize', updateCarousel);

    // Inicia el carrusel
    updateCarousel();
}

// Función para configurar la navegación entre secciones
function navegar() {
    refs["splash"] = document.getElementById("splash");
    refs["home"] = document.getElementById("home");
    refs["login"] = document.getElementById("login");
    refs["register"] = document.getElementById("register");
    refs["forgetpw"] = document.getElementById("forgetpw");
    refs["perfil"] = document.getElementById("perfil");

    btns["btn_forgetpw"] = document.getElementById("btn_forgetpw");
    btns["btn_register"] = document.getElementById("btn_register");
    btns["btn_login"] = document.getElementById("btn_login");
    btns["btn_home"] = document.getElementById("btn_home");

    asignarEventosMenu();
    asignarVolver();
}

// Función para asignar el evento "click" a los botones de volver
function asignarVolver() {
    let btns_volver = document.querySelectorAll(".btn-volver");
    btns_volver.forEach((btn) => {
        btn.addEventListener("click", () => {
            cargarSeccion("login");
        });
    });
}

// Función para asignar eventos a los botones del menú
function asignarEventosMenu() {
    if (btns["btn_forgetpw"]) {
        btns["btn_forgetpw"].addEventListener("click", cambiarSeccion);
    }
    if (btns["btn_register"]) {
        btns["btn_register"].addEventListener("click", cambiarSeccion);
    }
    if (btns["btn_login"]) {
        btns["btn_login"].addEventListener("click", cambiarSeccion);
    }
    if (btns["btn_home"]) {
        btns["btn_home"].addEventListener("click", cambiarSeccion);
    }
}

// Función para cambiar de sección
function cambiarSeccion(e) {
    let seccion = e.target.id.split("_")[1];
    cargarSeccion(seccion);
}

// Función para cargar una sección específica
function cargarSeccion(seccion) {
    ocultar();
    if (refs[seccion]) {
        refs[seccion].classList.remove("ocultar");
        refs[seccion].classList.add("animate__animated", "animate__fadeIn");
    } else {
        console.error("No se encontró la sección:", seccion);
    }
}

// Función para ocultar todas las secciones
function ocultar() {
    for (let key in refs) {
        if (refs[key]) {
            refs[key].classList.add("ocultar");
        }
    }
}

// Función para desplegar el menú
function desplegarMenu() {
    var menuToggle = document.getElementById('menu-toggle');
    var sidebarMenu = document.getElementById('sidebar-menu');

    if (menuToggle && sidebarMenu) {
        menuToggle.addEventListener('click', function() {
            sidebarMenu.classList.toggle('hidden');
            menuToggle.classList.toggle('hidden');
        });

        sidebarMenu.addEventListener('click', function() {
            sidebarMenu.classList.add('hidden');
            menuToggle.classList.remove('hidden');
        });
    } else {
        console.error("No se encontraron los elementos #menu-toggle o #sidebar-menu");
    }
}

function eliminarPlaceholder(){
    // Selecciona todos los campos de texto
const inputs = document.querySelectorAll('.input');

// Añade un event listener para cuando el campo de texto recibe el foco (focus)
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.dataset.placeholder = this.placeholder;
        this.placeholder = '';
    });

    // Restaura el placeholder cuando el usuario sale del campo de texto (blur)
    input.addEventListener('blur', function() {
        this.placeholder = this.dataset.placeholder;
    });
});

}