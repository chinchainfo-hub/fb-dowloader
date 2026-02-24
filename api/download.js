export default async function handler(req, res) {
    const { url } = req.query;
    
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    // Usamos URLSearchParams para asegurar que el parámetro sea reconocido
    const params = new URLSearchParams({
        url: url,
        renderableFormats: '720p,highres',
        urlAccess: 'proxied'
    });

    const apiKey = '6d670f29d2msh5ec78c92dc17ff4p1a2332jsn07491138181e';
    const apiHost = 'social-media-video-downloader.p.rapidapi.com';

    try {
        const response = await fetch(`https://${apiHost}/youtube/v3/video/details?${params.toString()}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': apiHost
            }
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Server Error', details: error.message });
    }
}
