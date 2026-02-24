export default async function handler(req, res) {
    const videoUrl = req.query.url;

    if (!videoUrl) {
        return res.status(400).json({ error: 'Falta la URL del video' });
    }

    const apiKey = '6d670f29d2msh5ec78c92dc17ff4p1a2332jsn07491138181e';
    const apiHost = 'social-media-video-downloader.p.rapidapi.com';

    // Construimos la URL con el parámetro explícito
    const targetUrl = `https://${apiHost}/youtube/v3/video/details?url=${encodeURIComponent(videoUrl)}`;

    try {
        const response = await fetch(targetUrl, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': apiHost,
                'Accept': 'application/json'
            }
        });

        const data = await response.json();
        
        // Enviamos la respuesta de la API a tu index.html
        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
}
