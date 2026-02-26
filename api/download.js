export default async function handler(req, res) {
    // 1. Configurar Cabeceras CORS (Permite que Blogger se conecte)
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-rapidapi-key, x-rapidapi-host');

    // 2. Manejar peticiones de verificación (Preflight)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const videoUrl = req.query.url;
    if (!videoUrl) return res.status(400).json({ error: 'URL requerida' });

    const apiKey = '6d670f29d2msh5ec78c92dc17ff4p1a2332jsn07491138181e';
    const apiHost = 'facebook17.p.rapidapi.com';

    try {
        const response = await fetch(`https://${apiHost}/api/facebook/links`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': apiHost
            },
            body: JSON.stringify({ url: videoUrl })
        });

        const data = await response.json();
        
        // 3. Enviar la respuesta final
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error de conexión', details: error.message });
    }
}
