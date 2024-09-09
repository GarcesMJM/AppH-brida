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
    refs["reservas"] = document.getElementById("reservas");
    refs["agregar-reserva"] = document.getElementById("agregar-reserva");

    btns["btn_forgetpw"] = document.getElementById("btn_forgetpw");
    btns["btn_register"] = document.getElementById("btn_register");
    btns["btn_login"] = document.getElementById("btn_login");
    btns["btn_home"] = document.getElementById("btn_home");
    btns["btn_perfil"] = document.getElementById("btn_perfil");
    btns["btn_reservas"] = document.getElementById("btn_reservas");
    btns["btn_agregar-reserva"] = document.getElementById("btn_agregar-reserva");

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
    if (btns["btn_perfil"]) {
        btns["btn_perfil"].addEventListener("click", cambiarSeccion);
    }
    if (btns["btn_reservas"]) {
        btns["btn_reservas"].addEventListener("click", cambiarSeccion);
    }
    if (btns["btn_agregar-reserva"]) {
        btns["btn_agregar-reserva"].addEventListener("click", cambiarSeccion);
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

//Funcionalidad para la sección de reservas 
function initCalendar() {
    const calendarDays = document.getElementById('calendar-days');
    const dateTitle = document.getElementById('dateTitle');
    const eventList = document.getElementById('eventList');
    const monthYearDisplay = document.getElementById('monthYearDisplay');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');

    if (!calendarDays || !dateTitle || !eventList || !monthYearDisplay || !prevMonthBtn || !nextMonthBtn) {
        console.error('Uno o más elementos del DOM no se encontraron');
        return;
    }

    let currentDate = new Date();
    let displayedMonth = currentDate.getMonth();
    let displayedYear = currentDate.getFullYear();

    function updateDateTitle(date) {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        dateTitle.textContent = date.toLocaleDateString('es-ES', options);
    }

    function updateMonthYearDisplay() {
        const options = { month: 'long', year: 'numeric' };
        monthYearDisplay.textContent = new Date(displayedYear, displayedMonth).toLocaleDateString('es-ES', options);
    }

    function generateCalendar(year, month) {
        calendarDays.innerHTML = '';
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < (firstDay + 6) % 7; i++) {
            calendarDays.appendChild(document.createElement('div'));
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.textContent = day;
            dayElement.classList.add('day');
            if (day === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
                dayElement.classList.add('selected');
            }
            dayElement.addEventListener('click', () => {
                currentDate = new Date(year, month, day);
                updateDateTitle(currentDate);
                generateCalendar(year, month);
                updateEventList(currentDate);
            });
            calendarDays.appendChild(dayElement);
        }
        updateMonthYearDisplay();
    }

    function updateEventList(date) {
        eventList.innerHTML = '';
        if (date.getDate() === 13 && date.getMonth() === 8 && date.getFullYear() === 2022) {
            const event = document.createElement('div');
            event.className = 'event';
            event.innerHTML = `
                <div class="event-icon">👤</div>
                <div class="event-info">
                    <div>Sr. Juan</div>
                    <div>${date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                    <div>10:00 AM</div>
                </div>
            `;
            eventList.appendChild(event);
        }
    }

    prevMonthBtn.addEventListener('click', () => {
        displayedMonth--;
        if (displayedMonth < 0) {
            displayedMonth = 11;
            displayedYear--;
        }
        generateCalendar(displayedYear, displayedMonth);
    });

    nextMonthBtn.addEventListener('click', () => {
        displayedMonth++;
        if (displayedMonth > 11) {
            displayedMonth = 0;
            displayedYear++;
        }
        generateCalendar(displayedYear, displayedMonth);
    });

    updateDateTitle(currentDate);
    generateCalendar(displayedYear, displayedMonth);
    updateEventList(currentDate);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCalendar);
} else {
    initCalendar();
}


// Funcionalidad para la sección de agregar reserva
const today = dayjs();
        let currentMonth = today;
        let startDate = null;
        let endDate = null;
        let pax = 1;

        function renderCalendar() {
            const calendarDays = document.getElementById('calendarDays');
            calendarDays.innerHTML = '';

            const firstDay = currentMonth.startOf('month').day();
            const daysInMonth = currentMonth.daysInMonth();

            for (let i = 0; i < firstDay; i++) {
                calendarDays.appendChild(document.createElement('div'));
            }

            for (let i = 1; i <= daysInMonth; i++) {
                const day = document.createElement('div');
                day.classList.add('day');
                day.textContent = i;
                day.onclick = () => selectDate(i);
                const currentDate = currentMonth.date(i);
                if (startDate && currentDate.isSame(startDate, 'day')) {
                    day.classList.add('selected');
                }
                if (endDate && currentDate.isSame(endDate, 'day')) {
                    day.classList.add('selected');
                }
                if (startDate && endDate && currentDate.isAfter(startDate) && currentDate.isBefore(endDate)) {
                    day.classList.add('in-range');
                }
                calendarDays.appendChild(day);
            }

            updateDateRange();
        }

        function selectDate(day) {
            const selectedDate = currentMonth.date(day);
            if (!startDate || (startDate && endDate)) {
                startDate = selectedDate;
                endDate = null;
            } else if (selectedDate.isAfter(startDate)) {
                endDate = selectedDate;
            } else {
                endDate = startDate;
                startDate = selectedDate;
            }
            renderCalendar();
        }

        function updateDateRange() {
            const dateRange = document.getElementById('dateRange');
            dateRange.innerHTML = '';
            if (startDate) {
                const checkIn = document.createElement('div');
                checkIn.textContent = `Check-in: ${startDate.format('DD-MM-YYYY HH:mm')}`;
                dateRange.appendChild(checkIn);
            }
            if (endDate) {
                const checkOut = document.createElement('div');
                checkOut.textContent = `Check-out: ${endDate.add(1, 'day').format('DD-MM-YYYY HH:mm')}`;
                dateRange.appendChild(checkOut);
            }
            if (!startDate && !endDate) {
                dateRange.textContent = 'Seleccione el numero de dias';
            }
        }

        function changePax(delta) {
            pax = Math.max(1, pax + delta);
            document.getElementById('paxCount').textContent = pax;
        }

        function populateMonthYearSelects() {
            const monthSelect = document.getElementById('monthSelect');
            const yearSelect = document.getElementById('yearSelect');

            const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
            months.forEach((month, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.textContent = month;
                monthSelect.appendChild(option);
            });

            const currentYear = today.year();
            for (let year = currentYear; year <= currentYear + 5; year++) {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year;
                yearSelect.appendChild(option);
            }

            monthSelect.value = currentMonth.month();
            yearSelect.value = currentMonth.year();

            monthSelect.onchange = updateMonth;
            yearSelect.onchange = updateMonth;
        }

        function updateMonth() {
            const monthSelect = document.getElementById('monthSelect');
            const yearSelect = document.getElementById('yearSelect');
            currentMonth = dayjs().year(parseInt(yearSelect.value)).month(parseInt(monthSelect.value));
            renderCalendar();
        }

        populateMonthYearSelects();
        renderCalendar();