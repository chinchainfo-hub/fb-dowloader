export default async function handler(req, res) {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'Falta la URL' });

    const apiKey = '6d670f29d2msh5ec78c92dc17ff4p1a2332jsn07491138181e';
    const apiHost = 'social-media-video-downloader.p.rapidapi.com';

    try {
        const response = await fetch(`https://${apiHost}/youtube/v3/video/details?url=${encodeURIComponent(url)}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': apiHost
            }
        });

        const data = await response.json();
        
        // Imprimimos en la consola de Vercel para ver qué llega
        console.log("Respuesta API:", JSON.stringify(data));

        // Enviamos la respuesta tal cual para que el navegador la procese
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error de servidor' });
    }
}
