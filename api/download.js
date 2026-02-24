export default async function handler(req, res) {
    const videoUrl = req.query.url;
    if (!videoUrl) return res.status(400).json({ error: 'URL requerida' });

    const apiKey = '6d670f29d2msh5ec78c92dc17ff4p1a2332jsn07491138181e';
    const apiHost = 'social-media-video-downloader.p.rapidapi.com';

    // Intentamos con el endpoint genérico que suele ser más compatible con FB
    const targetUrl = `https://${apiHost}/social/autolink?url=${encodeURIComponent(videoUrl)}`;

    try {
        const response = await fetch(targetUrl, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': apiHost
            }
        });

        const data = await response.json();
        
        // Si este endpoint tampoco funciona, probamos el de detalles de video
        if (data.message === "Missing required parameters" || data.error) {
            const altUrl = `https://${apiHost}/youtube/v3/video/details?url=${encodeURIComponent(videoUrl)}`;
            const altRes = await fetch(altUrl, {
                headers: { 'x-rapidapi-key': apiKey, 'x-rapidapi-host': apiHost }
            });
            const altData = await altRes.json();
            return res.status(200).json(altData);
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error de conexión' });
    }
}
