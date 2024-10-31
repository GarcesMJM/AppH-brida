const { default: Swal } = require("sweetalert2");

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
    }, 1000);
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
    refs["ubicacion"] = document.getElementById("ubicacion");
    refs["comentarios"] = document.getElementById("comentarios");
    refs["cambiar"] = document.getElementById("cambiar");
    refs["contacto"] = document.getElementById("contacto");

    btns["btn_forgetpw"] = document.getElementById("btn_forgetpw");
    btns["btn_register"] = document.getElementById("btn_register");
    btns["btn_login"] = document.getElementById("btn_login");
    btns["btn_home"] = document.getElementById("btn_home");
    btns["btn_perfil"] = document.getElementById("btn_perfil");
    btns["btn_reservas"] = document.getElementById("btn_reservas");
    btns["btn_agregar-reserva"] = document.getElementById("btn_agregar-reserva");
    btns["btn_ubicacion"] = document.getElementById("btn_ubicacion");
    btns["btn_comentarios"] = document.getElementById("btn_comentarios");
    btns["btn_cambiar_pwd"] = document.getElementById("btn_cambiar_pwd");
    btns["btn_contacto"] = document.getElementById("btn_contacto");

    asignarEventosMenu();
    asignarVolver();
}

// Función para asignar el evento "click" a los botones de volver
function asignarVolver() {
    let btns_volver_login = document.querySelectorAll(".volver_login");
    btns_volver_login.forEach((btn) => {
        btn.addEventListener("click", () => {
            cargarSeccion("login");
        });
    });

    let btns_volver_home = document.querySelectorAll(".volver_home");
    btns_volver_home.forEach((btn) => {
        btn.addEventListener("click", () => {
            cargarSeccion("home");
        });
    });

    let btn_volver_reservas = document.querySelector(".volver_reservas");
    btn_volver_reservas.addEventListener("click", () => {
            cargarSeccion("reservas");
        });

    let btn_volver_perfil = document.querySelector(".volver_perfil");
    btn_volver_perfil.addEventListener("click", () => {
            cargarSeccion("perfil");
        });

}



// Función para asignar eventos a los botones del menú
function asignarEventosMenu() {

    if (btns["btn_login"]) {
        btns["btn_login"].addEventListener("click", cambiarSeccion);
    }
    if (btns["btn_forgetpw"]) {
        btns["btn_forgetpw"].addEventListener("click", cambiarSeccion);
    }
    if (btns["btn_register"]) {
        btns["btn_register"].addEventListener("click", cambiarSeccion);
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
    if (btns["btn_ubicacion"]) {
        btns["btn_ubicacion"].addEventListener("click", cambiarSeccion);
    }
    if (btns["btn_comentarios"]) {
        btns["btn_comentarios"].addEventListener("click", cambiarSeccion);
    }
    if (btns["btn_cambiar_pwd"]) {
        btns["btn_cambiar_pwd"].addEventListener("click", cambiarSeccion);
    }
    if (btns["btn_contacto"]) {
        btns["btn_contacto"].addEventListener("click", cambiarSeccion);
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
        // Evento de clic en el botón de menú
        menuToggle.addEventListener('click', function() {
            sidebarMenu.classList.add('activarmenu');
            menuToggle.classList.add('hidden'); // Opcional: ocultar el botón cuando el menú está activo
        });

        // Si deseas cerrar el menú haciendo clic dentro de él
        sidebarMenu.addEventListener('click', function() {
            sidebarMenu.classList.remove('activarmenu');
            menuToggle.classList.remove('hidden'); // Mostrar el botón nuevamente
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
const ViewReservationsSection = {
    elements: {
        calendarDays: document.getElementById('calendar-days'),
        dateTitle: document.getElementById('dateTitle'),
        eventList: document.getElementById('eventList'),
        monthSelect: document.getElementById('monthSelect'),
        yearSelect: document.getElementById('yearSelect')
    },

    state: {
        currentDate: new Date(),
        displayedMonth: new Date().getMonth(),
        displayedYear: new Date().getFullYear(),
        editingBookingIndex: null
    },

    initialize() {
        this.populateMonthYearDropdowns();
        this.initializeEventListeners();
        this.updateDateTitle(this.state.currentDate);
        this.generateCalendar(this.state.displayedYear, this.state.displayedMonth);
    },

    populateMonthYearDropdowns() {
        if (!this.elements.monthSelect || !this.elements.yearSelect) return;

        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                       'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        
        months.forEach((month, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = month;
            this.elements.monthSelect.appendChild(option);
        });

        const currentYear = new Date().getFullYear();
        for (let year = currentYear - 10; year <= currentYear + 10; year++) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            this.elements.yearSelect.appendChild(option);
        }

        this.elements.monthSelect.value = this.state.displayedMonth;
        this.elements.yearSelect.value = this.state.displayedYear;
    },

    generateCalendar(year, month) {
        if (!this.elements.calendarDays) return;
        this.elements.calendarDays.innerHTML = '';

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < (firstDay + 6) % 7; i++) {
            this.elements.calendarDays.appendChild(document.createElement('div'));
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.textContent = day;
            dayElement.classList.add('day');

            if (day === this.state.currentDate.getDate() && 
                month === this.state.currentDate.getMonth() && 
                year === this.state.currentDate.getFullYear()) {
                dayElement.classList.add('today');
            }

            dayElement.addEventListener('click', () => {
                this.state.currentDate = new Date(year, month, day);
                this.updateDateTitle(this.state.currentDate);
                this.generateCalendar(year, month);
                this.updateEventList(this.state.currentDate);
            });

            this.elements.calendarDays.appendChild(dayElement);
        }

        this.updateEventList(this.state.currentDate);
    },

    updateDateTitle(date) {
        if (!this.elements.dateTitle) return;
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        this.elements.dateTitle.textContent = date.toLocaleDateString('en-US', options);
    },

    updateEventList(date) {
        if (!this.elements.eventList) return;
        this.elements.eventList.innerHTML = '';

        const bookings = BookingManager.getBookings();
        const dateStr = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;

        const dayBookings = bookings.filter(booking => {
            const bookingDate = booking.check_in.split(' ')[1];
            return bookingDate === dateStr;
        });

        dayBookings.forEach((booking, index) => {
            const event = document.createElement('div');
            event.className = 'event';
            event.innerHTML = `
                <div class="event-icon">👤</div>
                <div class="event-info">
                    <div>Sr. ${booking.user}</div>
                    <div>${booking.check_in}</div>
                    <div>${booking.check_out}</div>
                    <div>PAX: ${booking.pax}</div>
                    <div class="icons">
                        <button class="edit-btn" data-index="${index}">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button class="delete-btn" data-index="${index}">
                            <i class="bi bi-trash"></i></i>
                        </button>
                    </div>
                </div>
            `;

            const deleteBtn = event.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => this.handleDeleteBooking(index));

            const editBtn = event.querySelector('.edit-btn');
            editBtn.addEventListener('click', () => this.handleEditBooking(index));

            this.elements.eventList.appendChild(event);
        });
    },

    handleDeleteBooking(index) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const deleted = BookingManager.deleteBooking(index);
                if (deleted) {
                    Swal.fire(
                        '¡Eliminado!',
                        'La reserva ha sido eliminada.',
                        'success'
                    );
                    this.updateEventList(this.state.currentDate);
                } else {
                    Swal.fire(
                        'Error',
                        'No se pudo eliminar la reserva.',
                        'error'
                    );
                }
            }
        });
    },

    handleEditBooking(index) {
        const bookings = BookingManager.getBookings();
        const booking = bookings[index];
        if (!booking) return;

        // Extraer fechas del booking
        const checkInDate = booking.check_in.match(/(\d{2}-\d{2}-\d{4})/)[1];
        const checkOutDate = booking.check_out.match(/(\d{2}-\d{2}-\d{4})/)[1];

        Swal.fire({
            title: 'Editar Reserva',
            html: `
                <div class="edit-booking-form">
                    <div class="form-group">
                        <label>Check-in:</label>
                        <input type="date" id="edit-check-in" 
                               value="${this.formatDateForInput(checkInDate)}" class="swal2-input">
                    </div>
                    <div class="form-group">
                        <label>Check-out:</label>
                        <input type="date" id="edit-check-out" 
                               value="${this.formatDateForInput(checkOutDate)}" class="swal2-input">
                    </div>
                    <div class="form-group">
                        <label>PAX:</label>
                        <input type="number" id="edit-pax" value="${booking.pax}" 
                               min="1" max="10" class="swal2-input">
                    </div>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const checkIn = document.getElementById('edit-check-in').value;
                const checkOut = document.getElementById('edit-check-out').value;
                const pax = document.getElementById('edit-pax').value;

                if (!checkIn || !checkOut || !pax) {
                    Swal.showValidationMessage('Por favor completa todos los campos');
                    return false;
                }

                return {
                    checkIn: this.formatDateForStorage(checkIn),
                    checkOut: this.formatDateForStorage(checkOut),
                    pax: parseInt(pax)
                };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedBooking = {
                    ...booking,
                    check_in: `Check-in: ${result.value.checkIn} 12:00`,
                    check_out: `Check-out: ${result.value.checkOut} 03:00`,
                    pax: result.value.pax
                };

                try {
                    const updated = BookingManager.updateBooking(index, updatedBooking);
                    if (updated) {
                        Swal.fire(
                            '¡Actualizado!',
                            'La reserva ha sido actualizada.',
                            'success'
                        );
                        this.updateEventList(this.state.currentDate);
                    }
                } catch (error) {
                    Swal.fire(
                        'Error',
                        error.message,
                        'error'
                    );
                }
            }
        });
    },

    formatDateForInput(dateStr) {
        // Convertir DD-MM-YYYY a YYYY-MM-DD para input type="date"
        const [day, month, year] = dateStr.split('-');
        return `${year}-${month}-${day}`;
    },

    formatDateForStorage(dateStr) {
        // Convertir YYYY-MM-DD a DD-MM-YYYY
        const [year, month, day] = dateStr.split('-');
        return `${day}-${month}-${year}`;
    },

    initializeEventListeners() {
        this.elements.monthSelect?.addEventListener('change', () => {
            this.state.displayedMonth = parseInt(this.elements.monthSelect.value);
            this.generateCalendar(this.state.displayedYear, this.state.displayedMonth);
        });

        this.elements.yearSelect?.addEventListener('change', () => {
            this.state.displayedYear = parseInt(this.elements.yearSelect.value);
            this.generateCalendar(this.state.displayedYear, this.state.displayedMonth);
        });
    }
};


// Funcionalidad para la sección de agregar reserva
// Shared utility functions and classes
class BookingManager {
    static getBookings() {
        return JSON.parse(localStorage.getItem('bookings')) || [];
    }

    static deleteBooking(bookingIndex) {
        const bookings = this.getBookings();
        if (bookingIndex >= 0 && bookingIndex < bookings.length) {
            bookings.splice(bookingIndex, 1);
            localStorage.setItem('bookings', JSON.stringify(bookings));
            return true;
        }
        return false;
    }

    static updateBooking(bookingIndex, updatedBooking) {
        const bookings = this.getBookings();
        if (bookingIndex >= 0 && bookingIndex < bookings.length) {
            // Verificar si las nuevas fechas no coinciden con otras reservas (excluyendo la actual)
            const otherBookings = bookings.filter((_, index) => index !== bookingIndex);
            const hasConflict = this.checkDateConflict(updatedBooking, otherBookings);
            
            if (hasConflict) {
                throw new Error('Las fechas seleccionadas se solapan con otra reserva existente');
            }

            bookings[bookingIndex] = updatedBooking;
            localStorage.setItem('bookings', JSON.stringify(bookings));
            return true;
        }
        return false;
    }

    static checkDateConflict(booking, existingBookings) {
        const checkInMatch = booking.check_in.match(/(\d{2}-\d{2}-\d{4})/);
        const checkOutMatch = booking.check_out.match(/(\d{2}-\d{2}-\d{4})/);
        
        if (!checkInMatch || !checkOutMatch) return false;

        const [checkInDay, checkInMonth, checkInYear] = checkInMatch[1].split('-');
        const [checkOutDay, checkOutMonth, checkOutYear] = checkOutMatch[1].split('-');
        
        const newCheckIn = new Date(checkInYear, checkInMonth - 1, checkInDay);
        const newCheckOut = new Date(checkOutYear, checkOutMonth - 1, checkOutDay);

        return existingBookings.some(existingBooking => {
            const existingCheckInMatch = existingBooking.check_in.match(/(\d{2}-\d{2}-\d{4})/);
            const existingCheckOutMatch = existingBooking.check_out.match(/(\d{2}-\d{2}-\d{4})/);
            
            if (!existingCheckInMatch || !existingCheckOutMatch) return false;
            
            const [existingInDay, existingInMonth, existingInYear] = existingCheckInMatch[1].split('-');
            const [existingOutDay, existingOutMonth, existingOutYear] = existingCheckOutMatch[1].split('-');
            
            const existingCheckIn = new Date(existingInYear, existingInMonth - 1, existingInDay);
            const existingCheckOut = new Date(existingOutYear, existingOutMonth - 1, existingOutDay);
            
            return (
                (newCheckIn >= existingCheckIn && newCheckIn < existingCheckOut) ||
                (newCheckOut > existingCheckIn && newCheckOut <= existingCheckOut) ||
                (newCheckIn <= existingCheckIn && newCheckOut >= existingCheckOut)
            );
        });
    }

    static addBooking(booking) {
        const bookings = this.getBookings();
        
        // Extraer las fechas de los strings de check-in y check-out
        const checkInMatch = booking.check_in.match(/(\d{2}-\d{2}-\d{4})/);
        const checkOutMatch = booking.check_out.match(/(\d{2}-\d{2}-\d{4})/);
        
        if (!checkInMatch || !checkOutMatch) {
            throw new Error('Formato de fecha inválido');
        }

        // Convertir las fechas a objetos Date para comparación
        const [checkInDay, checkInMonth, checkInYear] = checkInMatch[1].split('-');
        const [checkOutDay, checkOutMonth, checkOutYear] = checkOutMatch[1].split('-');
        
        const newCheckIn = new Date(checkInYear, checkInMonth - 1, checkInDay);
        const newCheckOut = new Date(checkOutYear, checkOutMonth - 1, checkOutDay);
        
        // Verificar si hay conflicto con alguna reserva existente
        const hasConflict = bookings.some(existingBooking => {
            const existingCheckInMatch = existingBooking.check_in.match(/(\d{2}-\d{2}-\d{4})/);
            const existingCheckOutMatch = existingBooking.check_out.match(/(\d{2}-\d{2}-\d{4})/);
            
            if (!existingCheckInMatch || !existingCheckOutMatch) return false;
            
            const [existingInDay, existingInMonth, existingInYear] = existingCheckInMatch[1].split('-');
            const [existingOutDay, existingOutMonth, existingOutYear] = existingCheckOutMatch[1].split('-');
            
            const existingCheckIn = new Date(existingInYear, existingInMonth - 1, existingInDay);
            const existingCheckOut = new Date(existingOutYear, existingOutMonth - 1, existingOutDay);
            
            return (
                // Nueva reserva comienza durante una existente
                (newCheckIn >= existingCheckIn && newCheckIn < existingCheckOut) ||
                // Nueva reserva termina durante una existente
                (newCheckOut > existingCheckIn && newCheckOut <= existingCheckOut) ||
                // Nueva reserva engloba una existente
                (newCheckIn <= existingCheckIn && newCheckOut >= existingCheckOut)
            );
        });

        if (hasConflict) {
            throw new Error('Ya existe una reserva para estas fechas');
        }

        bookings.push(booking);
        localStorage.setItem('bookings', JSON.stringify(bookings));
    }

    static isDateRangeAvailable(startDate, endDate) {
        const bookings = this.getBookings();
        
        // Asegurarse de que las fechas sean objetos Date
        const checkIn = startDate instanceof Date ? startDate : new Date(startDate);
        const checkOut = endDate instanceof Date ? endDate : new Date(endDate);
        
        // Verificar si hay conflicto con alguna reserva existente
        const hasConflict = bookings.some(existingBooking => {
            const existingCheckInMatch = existingBooking.check_in.match(/(\d{2}-\d{2}-\d{4})/);
            const existingCheckOutMatch = existingBooking.check_out.match(/(\d{2}-\d{2}-\d{4})/);
            
            if (!existingCheckInMatch || !existingCheckOutMatch) return false;
            
            const [existingInDay, existingInMonth, existingInYear] = existingCheckInMatch[1].split('-');
            const [existingOutDay, existingOutMonth, existingOutYear] = existingCheckOutMatch[1].split('-');
            
            const existingCheckIn = new Date(existingInYear, existingInMonth - 1, existingInDay);
            const existingCheckOut = new Date(existingOutYear, existingOutMonth - 1, existingOutDay);
            
            return (
                (checkIn >= existingCheckIn && checkIn < existingCheckOut) ||
                (checkOut > existingCheckIn && checkOut <= existingCheckOut) ||
                (checkIn <= existingCheckIn && checkOut >= existingCheckOut)
            );
        });

        return !hasConflict;
    }
}
// Section 1: Add Reservations (agregar-reserva)
const AddReservationSection = {
    elements: {
        calendarDays: document.getElementById('calendarDays'),
        dateRange: document.getElementById('dateRange'),
        monthSelect: document.getElementById('mSelect'),
        yearSelect: document.getElementById('ySelect'),
        paxCount: document.getElementById('paxCount'),
        menosBtn: document.getElementById('menos'),
        masBtn: document.getElementById('mas'),
        confirmBtn: document.getElementById('btn-agregar-reserva')
    },

    state: {
        today: dayjs(),
        currentMonth: dayjs(),
        startDate: null,
        endDate: null,
        pax: 1
    },

    initialize() {
        this.initializeMonthYearSelects();
        this.initializeEventListeners();
        this.renderCalendar();
    },

    initializeMonthYearSelects() {
        if (!this.elements.monthSelect || !this.elements.yearSelect) return;

        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                       'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        
        months.forEach((month, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = month;
            this.elements.monthSelect.appendChild(option);
        });

        const currentYear = this.state.today.year();
        for (let year = currentYear; year <= currentYear + 5; year++) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            this.elements.yearSelect.appendChild(option);
        }

        this.elements.monthSelect.value = this.state.currentMonth.month();
        this.elements.yearSelect.value = this.state.currentMonth.year();
    },

    renderCalendar() {
        if (!this.elements.calendarDays) return;
        this.elements.calendarDays.innerHTML = '';

        const firstDayOfMonth = this.state.currentMonth.startOf('month').day();
        const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
        const daysInMonth = this.state.currentMonth.daysInMonth();

        // Add empty cells for days before first day of month
        for (let i = 0; i < adjustedFirstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('empty-day');
            this.elements.calendarDays.appendChild(emptyDay);
        }

        // Create calendar days
        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('div');
            day.classList.add('day');
            day.textContent = i;
            
            const currentDate = this.state.currentMonth.date(i);
            this.addDayClasses(day, currentDate);
            
            day.onclick = () => this.selectDate(i);
            this.elements.calendarDays.appendChild(day);
        }

        this.updateDateRange();
    },

    addDayClasses(dayElement, date) {
        if (this.state.startDate && date.isSame(this.state.startDate, 'day')) {
            dayElement.classList.add('selected', 'start-date');
        }
        if (this.state.endDate && date.isSame(this.state.endDate, 'day')) {
            dayElement.classList.add('selected', 'end-date');
        }
        if (this.state.startDate && this.state.endDate && 
            date.isAfter(this.state.startDate) && date.isBefore(this.state.endDate)) {
            dayElement.classList.add('in-range');
        }
        if (date.isBefore(this.state.today, 'day')) {
            dayElement.classList.add('disabled');
            dayElement.onclick = null;
        }
    },

    selectDate(day) {
        const selectedDate = this.state.currentMonth.date(day);
        
        if (selectedDate.isBefore(this.state.today, 'day')) return;

        if (!this.state.startDate || (this.state.startDate && this.state.endDate)) {
            this.state.startDate = selectedDate;
            this.state.endDate = null;
        } else if (selectedDate.isAfter(this.state.startDate)) {
            this.state.endDate = selectedDate;
        } else {
            this.state.endDate = this.state.startDate;
            this.state.startDate = selectedDate;
        }
        
        this.renderCalendar();
    },

    updateDateRange() {
        if (!this.elements.dateRange) return;
        this.elements.dateRange.innerHTML = '';

        if (this.state.startDate) {
            const checkIn = document.createElement('div');
            checkIn.id = 'check-in';
            checkIn.textContent = `Check-in: ${this.state.startDate.format('DD-MM-YYYY')} 12:00`;
            this.elements.dateRange.appendChild(checkIn);
        }

        if (this.state.endDate) {
            const checkOut = document.createElement('div');
            checkOut.id = 'check-out';
            checkOut.textContent = `Check-out: ${this.state.endDate.format('DD-MM-YYYY')} 03:00`;
            this.elements.dateRange.appendChild(checkOut);
        }
    },

    initializeEventListeners() {
        this.elements.monthSelect?.addEventListener('change', () => {
            this.state.currentMonth = dayjs()
                .year(parseInt(this.elements.yearSelect.value))
                .month(parseInt(this.elements.monthSelect.value));
            this.renderCalendar();
        });

        this.elements.yearSelect?.addEventListener('change', () => {
            this.state.currentMonth = dayjs()
                .year(parseInt(this.elements.yearSelect.value))
                .month(parseInt(this.elements.monthSelect.value));
            this.renderCalendar();
        });

        this.elements.menosBtn?.addEventListener('click', () => {
            this.state.pax = Math.max(1, this.state.pax - 1);
            this.elements.paxCount.textContent = this.state.pax;
        });

        this.elements.masBtn?.addEventListener('click', () => {
            this.state.pax = Math.min(10, this.state.pax + 1);
            this.elements.paxCount.textContent = this.state.pax;
        });

        this.elements.confirmBtn?.addEventListener('click', () => this.handleReservationConfirm());
    },

    handleReservationConfirm() {
        const usuario = JSON.parse(localStorage.getItem('logueo_exitoso')) || {};
        
        if (!this.state.startDate || !this.state.endDate) {
            return Swal.fire({
                title: 'Error!',
                text: 'Seleccione las fechas',
                icon: 'error',
            });
        }

        try {
            const newBooking = {
                user: usuario.user,
                check_in: `Check-in: ${this.state.startDate.format('DD-MM-YYYY')} 12:00`,
                check_out: `Check-out: ${this.state.endDate.format('DD-MM-YYYY')} 03:00`,
                pax: this.state.pax
            };

            BookingManager.addBooking(newBooking);

            Swal.fire({
                title: 'Éxito!',
                text: 'Reserva exitosa',
                icon: 'success',
            }).then(() => {
                // Limpiar el estado
                this.state.startDate = null;
                this.state.endDate = null;
                this.state.pax = 1;
                
                // Actualizar la UI
                this.elements.paxCount.textContent = '1';
                this.renderCalendar();
                
                // Cambiar a la sección de reservas
                cargarSeccion('reservas');
            });
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
            });
        }
    }
};

// Initialize both sections when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Add Reservation section
    if (document.getElementById('agregar-reserva')) {
        AddReservationSection.initialize();
    }
    
    // Initialize View Reservations section
    if (document.getElementById('reservas')) {
        ViewReservationsSection.initialize();
    }
});


//Registro con localstorage
const register_form = document.getElementById("register_form");

register_form.addEventListener('submit', (e) => {
    e.preventDefault()

    const user = document.getElementById('user').value;
    const last_name = document.getElementById('last_name').value;
    const mail = document.getElementById('mail').value;
    const pwd = document.getElementById('pwd').value;
    const r_pwd = document.getElementById('r_pwd').value;

    const Users = JSON.parse(localStorage.getItem('users')) || []
    const usuario_registrados = Users.find(user => user.mail === mail)
    
    if(pwd !== r_pwd) {
        return Swal.fire({
            title: 'Error!',
            text: 'Las contraseñas deben de coincidir',
            icon: 'error',
          })
    }else if(usuario_registrados){
        return Swal.fire({
            title: 'Error!',
            text: 'El usuario ya esta registrado',
            icon: 'error',
          })
    } else {
        Users.push({user: user, last_name: last_name, mail: mail, pwd:pwd,r_pwd: r_pwd})
        localStorage.setItem('users', JSON.stringify(Users))
        
        Swal.fire({
            title: 'exito!',
            text: 'El registro fue exitoso',
            icon: 'success',
          })
        
       document.getElementById('register_form').reset();
       cargarSeccion('login');


    }
})


//Logueo con localstorage
const login_form = document.getElementById('login_form')
login_form.addEventListener('submit', (e) =>{
    e.preventDefault()

    const mail = document.getElementById('mail_login').value;
    const pwd = document.getElementById('pwd_login').value;

    const Users = JSON.parse(localStorage.getItem('users')) || []
    const usuario_valido = Users.find(user => user.mail === mail && user.pwd === pwd)
    if(!usuario_valido){
        return Swal.fire({
            title: 'Error!',
            text: 'El usuario y/o contraseña son incorrectos',
            icon: 'error',
          })
    }
    else{
        Swal.fire({
            title: 'exito!',
            text: 'El logueo fue exitoso',
            icon: 'success',
          })
        localStorage.setItem('logueo_exitoso', JSON.stringify(usuario_valido))
        document.getElementById('login_form').reset()
        cargarSeccion('home')
    }
})

//Poner el nombre del ususuario en el home
const menu = document.getElementById('menu-toggle');
menu.addEventListener('click', () =>{
    const usuario_logueado = JSON.parse(localStorage.getItem('logueo_exitoso')) || []
    const nombre_usuario = document.getElementById('user_home')
    nombre_usuario.textContent = usuario_logueado.user
});

//funcionalidad para cerrar sesion
const btn_logout = document.getElementById('btn_logout')
btn_logout.addEventListener('click', () =>{
    localStorage.removeItem('logueo_exitoso')
    Swal.fire({
        title: 'exito!',
        text: 'Sesion cerrada',
        icon: 'success',
      })
    cargarSeccion('login')

});

//Traer los datos del usuario logueado a la seccion de perfil
const btn_perfil = document.getElementById('btn_perfil')
btn_perfil.addEventListener('click', () =>{
    const usuario_logueado = JSON.parse(localStorage.getItem('logueo_exitoso')) || []
    document.getElementById('user_name').textContent = usuario_logueado.user;
    document.getElementById('user_perfil').value = usuario_logueado.user;
    document.getElementById('last_name_perfil').value = usuario_logueado.last_name;
    document.getElementById('mail_perfil').value = usuario_logueado.mail;
});

//Funcionalidad para cambiar la contraseña de un usuario logueado
const btn_cambiar_pwd = document.getElementById('btn_cambiar_pwd')
btn_cambiar_pwd.addEventListener('click', ()=>{
    usuario_logueado = JSON.parse(localStorage.getItem('logueo_exitoso')) || []
    document.getElementById('pwd_vieja').value = usuario_logueado.pwd;
    
})

const cambiar_pwd_form = document.getElementById('cambiar_contraseña')
cambiar_pwd_form.addEventListener('submit', (e) =>{
    e.preventDefault()

    const pwd_vieja = document.getElementById('pwd_vieja').value;
    const pwd_nueva = document.getElementById('pwd_nueva').value;
    const pwd_nueva_r = document.getElementById('pwd_nueva_r').value;

    const usuario_logueado = JSON.parse(localStorage.getItem('logueo_exitoso')) || []
    const usuarios = JSON.parse(localStorage.getItem('users')) || []

    if(pwd_nueva === pwd_nueva_r){

        if(pwd_nueva === pwd_vieja || pwd_nueva_r === pwd_vieja)
        {
            return Swal.fire({
                title: 'Error!',
                text: 'La nueva contraseña no puede ser igual a la anterior',
                icon: 'error',
              }) 
        }
        else
        {
            usuario_logueado.pwd = pwd_nueva;
            usuario_logueado.r_pwd = pwd_nueva;
        
            //Se busca el usuario para cambiar el correo
            usuarios.forEach(function(usuario){
                if(usuario.mail === usuario_logueado.mail)
                {
                    usuario.pwd = pwd_nueva;
                    usuario.r_pwd = pwd_nueva;
                }
            })

            localStorage.setItem('logueo_exitoso', JSON.stringify(usuario_logueado))
            localStorage.setItem('users', JSON.stringify(usuarios))
            Swal.fire({
                title: 'exito!',
                text: 'La contraseña fue cambiada exitosamente',
                icon: 'success',
              })
        }
    }
    else {

        return Swal.fire({
            title: 'Error!',
            text: 'Las contraseñas deben de coincidir',
            icon: 'error',
          })
    }
    document.getElementById('pwd_nueva').value = '';
    document.getElementById('pwd_nueva_r').value = '';
    cargarSeccion('login');


})

//Funcionalidad para la sección de contacto
const contactForm = document.getElementById('contactForm'); 
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const contact = { name, email, message };
    console.log(contact);
    Swal.fire({
        title: 'Mensaje enviado!',
        text: 'Gracias por contactarnos',
        icon: 'success',
      })
    contactForm.reset();
});

// Datos iniciales de comentarios (puedes cargarlos desde localStorage o un backend)
let commentsData = [
    { username: "Usuario 1", rating: 5, text: "Excelente servicio, muy recomendado.", date: "2023-09-15" },
    { username: "Usuario 2", rating: 4, text: "Buena experiencia en general.", date: "2023-09-10" },
];

// Función para crear elementos de estrellas
function createStars(rating) {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starsHTML += '<span class="star" data-rating="' + i + '">★</span>';
        } else {
            starsHTML += '<span class="star" data-rating="' + i + '" style="color: #ccc;">★</span>';
        }
    }
    return starsHTML;
}

// Función para renderizar comentarios
function renderComments() {
    const container = document.getElementById('commentsContainer');
    // Limpiar comentarios existentes
    container.innerHTML = '';

    // Renderizar cada comentario
    commentsData.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `
            <div class="user-info">
                <div class="avatar">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-liejoin="round"/>
                    </svg>
                </div>
                <div class="username">${comment.username}</div>
            </div>
            <div class="stars">${createStars(comment.rating)}</div>
            <div class="comment-text">${comment.text}</div>
            <div class="comment-date">${comment.date}</div>
        `;
        container.appendChild(commentElement);
    });
}

// Función para mostrar el modal de agregar comentario
function showAddCommentModal() {
    // Crear el modal dinámicamente
    const modalHTML = `
        <div id="addCommentModal" class="modal">
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>Agregar Comentario</h2>
                <form id="addCommentForm">
                    <div class="form-group">
                        <label for="username">Nombre de usuario</label>
                        <input type="text" id="username" name="username" required>
                    </div>
                    <div class="form-group">
                        <label>Calificación</label>
                        <div id="ratingStars" class="rating-stars">
                            ${createStars(0)}
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="commentText">Comentario</label>
                        <textarea id="commentText" name="commentText" required></textarea>
                    </div>
                    <button type="submit" class="submit-btn">Enviar Comentario</button>
                </form>
            </div>
        </div>
    `;

    // Insertar el modal en el DOM
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer.firstChild);

    // Configurar interactividad de estrellas
    const ratingStars = document.querySelectorAll('#ratingStars .star');
    let selectedRating = 0;

    ratingStars.forEach(star => {
        star.addEventListener('mouseover', () => {
            const rating = parseInt(star.dataset.rating);
            ratingStars.forEach((s, index) => {
                if (index < rating) {
                    s.style.color = 'gold';
                } else {
                    s.style.color = '#ccc';
                }
            });
        });

        star.addEventListener('mouseout', () => {
            ratingStars.forEach((s, index) => {
                if (index < selectedRating) {
                    s.style.color = 'gold';
                } else {
                    s.style.color = '#ccc';
                }
            });
        });

        star.addEventListener('click', () => {
            selectedRating = parseInt(star.dataset.rating);
            ratingStars.forEach((s, index) => {
                if (index < selectedRating) {
                    s.style.color = 'gold';
                } else {
                    s.style.color = '#ccc';
                }
            });
        });
    });

    // Configurar evento de envío de formulario
    const form = document.getElementById('addCommentForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Obtener valores del formulario
        const username = document.getElementById('username').value;
        const commentText = document.getElementById('commentText').value;

        // Validar que se haya seleccionado una calificación
        if (selectedRating === 0) {
            alert('Por favor, selecciona una calificación');
            return;
        }

        // Crear nuevo comentario
        const newComment = {
            username: username,
            rating: selectedRating,
            text: commentText,
            date: new Date().toISOString().split('T')[0]
        };

        // Agregar comentario a los datos
        commentsData.push(newComment);

        // Renderizar comentarios actualizados
        renderComments();

        // Cerrar modal
        closeAddCommentModal();
    });

    // Configurar botón de cierre
    const closeButton = document.querySelector('.close-modal');
    closeButton.addEventListener('click', closeAddCommentModal);
}

// Función para cerrar el modal de agregar comentario
function closeAddCommentModal() {
    const modal = document.getElementById('addCommentModal');
    if (modal) {
        modal.remove();
    }
}

// Evento para abrir el modal de agregar comentario
document.getElementById('btn_agregar-comentario').addEventListener('click', showAddCommentModal);

// Renderizar comentarios al cargar la página
renderComments();


//Funcionalidad para la sección de la ubicación
function initMap() {
    // Coordenadas de ejemplo (puedes cambiarlas a la ubicación que desees)
    const location = { lat: 40.416775, lng: -3.703790 };
    
    const map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 15
    });

    const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: 'Ubicación'
    });

    // Obtener la dirección basada en las coordenadas
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: location }, (results, status) => {
        if (status === 'OK') {
            if (results[0]) {
                document.getElementById('address').textContent = results[0].formatted_address;
            } else {
                document.getElementById('address').textContent = 'Dirección no encontrada';
            }
        } else {
            document.getElementById('address').textContent = 'Error al obtener la dirección';
        }
    });
}