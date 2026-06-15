const todosLosHorarios = [
  "08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00",
  "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00"
];

// URL de tu Web App
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbymwdR-YFCxaPkswhSv6A3MspmwatiuSP7v3zqXmfmsq-K-rQxOGZFlUka_tHGBQlcu/exec';

// Botón para mostrar horarios disponibles
document.getElementById('btnVerHorarios').addEventListener('click', function() {
  const fecha = document.getElementById('fecha').value;
  if (!fecha) { alert("Selecciona una fecha primero."); return; }

  // Consultamos los eventos ocupados en esa fecha
  fetch(`${WEB_APP_URL}?fecha=${fecha}`)
    .then(response => response.json())
    .then(ocupados => {
      const selectHora = document.getElementById('hora');
      selectHora.innerHTML = '';
      
      // Filtramos los horarios: solo mostramos los que NO están ocupados
      todosLosHorarios.forEach(h => {
        if (!ocupados.includes(h)) {
          let opt = document.createElement('option');
          opt.value = h; opt.text = h;
          selectHora.add(opt);
        }
      });
      
      if (selectHora.options.length === 0) {
        alert("Lo sentimos, no hay horarios disponibles para esta fecha.");
      } else {
        document.getElementById('contenedorHorarios').style.display = 'block';
      }
    })
    .catch(err => { console.error(err); alert("Error al consultar disponibilidad."); });
});

// Envío del formulario
document.getElementById('leadForm').addEventListener('submit', function(event) {
  event.preventDefault(); 
  const mensaje = document.getElementById('mensaje');
  mensaje.innerText = "Enviando...";

  const formData = new FormData();
  formData.append('nombre', document.getElementById('nombre').value);
  formData.append('apellido', document.getElementById('apellido').value);
  formData.append('email', document.getElementById('email').value);
  formData.append('telefono', document.getElementById('telefono').value);
  formData.append('fecha', document.getElementById('fecha').value);
  formData.append('hora', document.getElementById('hora').value);

  fetch(WEB_APP_URL, {
    method: 'POST',
    body: formData
  })
  .then(() => {
    mensaje.innerText = "¡Gracias! Cita agendada correctamente.";
    document.getElementById('leadForm').reset();
    document.getElementById('contenedorHorarios').style.display = 'none';
  })
  .catch(err => {
    console.error(err);
    mensaje.innerText = "Error. Intenta de nuevo.";
  });
});
