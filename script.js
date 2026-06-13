document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const data = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value, // Ahora lo toma directamente del nuevo campo
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        fecha: new Date().toLocaleString()
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
        document.getElementById('mensaje').innerText = "¡Gracias! Tu solicitud ha sido enviada.";
        document.getElementById('leadForm').reset();
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('mensaje').innerText = "Hubo un error de conexión. Intenta de nuevo.";
    });
});
