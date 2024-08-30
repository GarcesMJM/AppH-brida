let refs = [];
let btns = [];

window.onload = init;


function init(){

    let currentIndex = 0;
    const images = document.querySelectorAll('.carousel-images img');
    const totalImages = images.length;

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
    
    navegar();
    desplegarMenu();

    setTimeout(()=>{
        cargarSeccion("login");
    }, 3000);
    
}


function desplegarMenu() {
    var menuToggle = document.getElementById('menu-toggle');
    var sidebarMenu = document.getElementById('sidebar-menu');

    menuToggle.addEventListener('click', function() {
        if (sidebarMenu.classList.contains('hidden')) {
            sidebarMenu.classList.remove('hidden');
            menuToggle.classList.remove('sidebar');
            menuToggle.classList.add('hidden');
        }
    });

    sidebarMenu.addEventListener('click', function(){
        if(menuToggle.classList.contains('hidden')){
            sidebarMenu.classList.add('hidden');
            menuToggle.classList.remove('hidden');
            menuToggle.classList.add('sidebar');
        }
    });
}

function navegar(){
    refs["splash"] = document.getElementById("splash");
    refs["home"] = document.getElementById("home");
    refs["login"] = document.getElementById("login");
    refs["register"] = document.getElementById("register");
    refs["forgetpwd"] = document.getElementById("forgetpwd");
    refs["perfil"] = document.getElementById("perfil");

    btns["btn_forget"] = document.getElementById("btn_forget");
    btns["btn_registro"] = document.getElementById("btn_registro");
    btns["btn_login"] = document.getElementById("btn_login");

    asignarEventosMenu();
    asignarVolver();

}

function asignarVolver(){
    let btns_volver = document.querySelectorAll(".btn-volver");
    for (let i = 0; i < btns_volver.length; i++) {
        btns_volver[i].addEventListener("click", ()=>{
            cargarSeccion("login");
        });
    }
}

function asignarEventosMenu()
{
    btns["btn_forgetpw"].addEventListener("click", cambiarSeccion);
    btns["btn_register"].addEventListener("click", cambiarSeccion);
    btns["btn_login"].addEventListener("click", cambiarSeccion);
}

function cambiarSeccion(e){ 
    let seccion = e.target.id.split("_")[1];
    cargarSeccion(seccion);
}

function cargarSeccion(seccion){
    ocultar();
    refs[seccion].classList.remove("ocultar");
    refs[seccion].classList.add("animate__animated", "animate__fadeIn");
}

function ocultar()
{
    for (let key in refs) {
        refs[key].classList.add("ocultar");
    }
}
