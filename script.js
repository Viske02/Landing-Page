const horariosDisponibles = [
  "08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00",
  "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00"
];

// Botón para mostrar horarios
document.getElementById('btnVerHorarios').addEventListener('click', function() {
  const fecha = document.getElementById('fecha').value;
  if (!fecha) { alert("Selecciona una fecha primero."); return; }

  const selectHora = document.getElementById('hora');
  selectHora.innerHTML = '';
  horariosDisponibles.forEach(function(h) {
    let opt = document.createElement('option');
    opt.value = h; opt.text = h;
    selectHora.add(opt);
  });
  document.getElementById('contenedorHorarios').style.display = 'block';
});

// Envío del formulario
document.getElementById('leadForm').addEventListener('submit', function(event) {
  event.preventDefault(); 
  const mensaje = document.getElementById('mensaje');
  mensaje.innerText = "Enviando...";

  const data = {
    nombre: document.getElementById('nombre').value,
    apellido: document.getElementById('apellido').value,
    email: document.getElementById('email').value,
    telefono: document.getElementById('telefono').value,
    fecha: document.getElementById('fecha').value,
    hora: document.getElementById('hora').value
  };

  // Usamos un formulario para enviar los datos (esto es lo que mejor lee Google Apps Script)
  const formData = new FormData();
  for (let key in data) { formData.append(key, data[key]); }

  fetch('https://script.google.com/macros/s/AKfycbwRtLu1pr-MN40Kl4aaBH1qwuO14wjQNkV9mX-zLxPUL8ul-MZeDOwd45NJObwv4r-n/exec', {
    method: 'POST',
    body: formData // Enviamos el formulario directamente
  })
  .then(() => {
    mensaje.innerText = "¡Gracias! Cita agendada.";
    document.getElementById('leadForm').reset();
    document.getElementById('contenedorHorarios').style.display = 'none';
  })
  .catch(err => {
    console.error(err);
    mensaje.innerText = "Error. Intenta de nuevo.";
  });
});
