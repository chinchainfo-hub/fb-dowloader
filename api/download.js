export default async function handler(req, res) {
    const videoUrl = req.query.url;

    if (!videoUrl) {
        return res.status(400).json({ error: 'Falta la URL' });
    }

    const apiKey = '6d670f29d2msh5ec78c92dc17ff4p1a2332jsn07491138181e';
    const apiHost = 'social-media-video-downloader.p.rapidapi.com';

    // Configuramos los parámetros EXACTOS que pide la API de YouTube/FB v3
    const queryParams = new URLSearchParams({
        url: videoUrl,
        videoId: videoUrl, // Algunas versiones de esta API piden videoId incluso para links
        renderableFormats: '720p,highres',
        urlAccess: 'proxied'
    });

    try {
        const response = await fetch(`https://${apiHost}/youtube/v3/video/details?${queryParams.toString()}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': apiHost
            }
        });

        const data = await response.json();
        
        // Enviamos la respuesta para ver qué dice
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error de servidor', details: error.message });
    }
}
