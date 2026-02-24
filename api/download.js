export default async function handler(req, res) {
    // 1. Extraemos la URL de la consulta que viene de tu index.html
    const videoUrl = req.query.url;

    if (!videoUrl) {
        return res.status(400).json({ error: 'Debes pegar una URL de Facebook' });
    }

    const apiKey = '6d670f29d2msh5ec78c92dc17ff4p1a2332jsn07491138181e';
    const apiHost = 'social-media-video-downloader.p.rapidapi.com';

    // 2. Construimos la URL de la API asegurando que el parámetro ?url= esté presente
    const targetApi = `https://${apiHost}/youtube/v3/video/details?url=${encodeURIComponent(videoUrl)}`;

    try {
        const response = await fetch(targetApi, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': apiHost
            }
        });

        const data = await response.json();

        // 3. Devolvemos la respuesta al navegador
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error de conexión con la API', detallles: error.message });
    }
}
