document.getElementById('leadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const msg = document.getElementById('mensaje');
    
    const data = {
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        fecha: document.getElementById('fecha').value
    };

    // PEGA AQUÍ TU WEBHOOK URL
    const WEBHOOK_URL = ''; 

    try {
        btn.disabled = true;
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error('Error en la conexión con el servidor.');
        
        msg.textContent = '¡Gracias! Nos pondremos en contacto pronto.';
    } catch (error) {
        msg.textContent = 'Hubo un error al enviar. Por favor, intenta de nuevo.';
        console.error('Error:', error);
    } finally {
        btn.disabled = false;
    }
});