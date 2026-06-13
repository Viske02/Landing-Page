document.getElementById('leadForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const data = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value, // Ahora lo toma directamente del nuevo campo
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        fecha: new Date().toLocaleString()
    };

    const url = 'https://script.google.com/macros/s/AKfycby-oXjH2XMP4LDESioaMkDE5uE7F9eZY9a49DPTbD5_M79UKYNZoSSVNmo9Hm6sMR9U/exec';

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
