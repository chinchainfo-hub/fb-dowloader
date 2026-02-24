export default async function handler(req, res) {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'URL requerida' });

    const apiKey = '6d670f29d2msh5ec78c92dc17ff4p1a2332jsn07491138181e';
    const apiHost = 'social-media-video-downloader.p.rapidapi.com';

    try {
        const response = await fetch(`https://${apiHost}/youtube/v3/video/details?url=${encodeURIComponent(url)}`, {
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': apiHost
            }
        });

        const data = await response.json();
        // Esto enviará TODO lo que diga la API a tu navegador para analizarlo
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error en la conexión con la API' });
    }
}
