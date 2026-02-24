export default async function handler(req, res) {
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
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error de conexión', details: error.message });
    }
}
