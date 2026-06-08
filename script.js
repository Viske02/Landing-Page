document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que la página se recargue

    // Recopilamos los datos del formulario
    const data = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido') ? document.getElementById('apellido').value : "",
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        fecha: new Date().toLocaleString() // Generamos la fecha actual
    };

    // PEGA AQUÍ TU URL DE GOOGLE APPS SCRIPT (la que termina en /exec)
    const url = 'https://script.google.com/macros/s/AKfycbxrhNW5Vyr2ZW1HA9WTT0v4GUh6D0Cy9LB6vdV7WmacLCQdGysO7JubuVBsBjQNiw4c/exec';

    fetch(url, {
        method: 'POST',
        mode: 'no-cors', // Necesario para evitar bloqueos de seguridad
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(() => {
        // Mostramos el mensaje de éxito
        document.getElementById('mensaje').innerText = "¡Gracias! Tu solicitud ha sido enviada.";
        document.getElementById('leadForm').reset(); // Limpiamos el formulario
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('mensaje').innerText = "Hubo un error de conexión. Intenta de nuevo.";
    });
});
