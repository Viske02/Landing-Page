document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que la página se recargue

    const data = {
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        fecha: document.getElementById('fecha').value
    };

    // Aquí irá tu URL de Webhook de n8n
    fetch('https://garland-fraying-unify.ngrok-free.dev/webhook/ac4126e5-ce24-4bd7-a6b8-3cc8ff0c15e6/webhook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('mensaje').innerText = "¡Gracias! Tu solicitud ha sido enviada.";
        } else {
            document.getElementById('mensaje').innerText = "Hubo un error, intenta de nuevo.";
        }
    })
    .catch(error => {
        document.getElementById('mensaje').innerText = "Error de conexión.";
    });
});
