// Definimos los rangos de hora
const horariosDisponibles = [
  "08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00",
  "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00"
];

// Función para mostrar los horarios al hacer clic en el botón
document.getElementById('btnVerHorarios').addEventListener('click', function() {
  const fechaSeleccionada = document.getElementById('fecha').value;
  
  if (!fechaSeleccionada) {
    alert("Por favor, selecciona una fecha primero.");
    return;
  }

  const selectHora = document.getElementById('hora');
  selectHora.innerHTML = ''; // Limpiamos opciones anteriores
  
  horariosDisponibles.forEach(function(hora) {
    let option = document.createElement('option');
    option.value = hora;
    option.text = hora;
    selectHora.add(option);
  });

  // Mostramos el contenedor de horarios que estaba oculto
  document.getElementById('contenedorHorarios').style.display = 'block';
});

// Lógica de envío del formulario
document.getElementById('leadForm').addEventListener('submit', function(event) {
  event.preventDefault(); 

  const data = {
    nombre: document.getElementById('nombre').value,
    apellido: document.getElementById('apellido').value,
    email: document.getElementById('email').value,
    telefono: document.getElementById('telefono').value,
    fecha: document.getElementById('fecha').value,
    hora: document.getElementById('hora').value
  };

  const url = 'https://script.google.com/macros/s/AKfycbxY3SXKl-0x43n2o7Rb0r3JfTFMXnMFP3O-MmyaJoUCaQ8YmrHVxLKiOiQSmeSPo1YG/exec';

  fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(() => {
    document.getElementById('mensaje').innerText = "¡Gracias! Tu cita ha sido agendada correctamente.";
    document.getElementById('leadForm').reset();
    // Opcional: volvemos a ocultar el selector al enviar
    document.getElementById('contenedorHorarios').style.display = 'none';
  })
  .catch(error => {
    console.error('Error:', error);
    document.getElementById('mensaje').innerText = "Hubo un error de conexión. Intenta de nuevo.";
  });
});
