export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).send('Metodo no permitido');
    
    const videoUrl = req.query.url;
    if (!videoUrl) return res.status(400).json({ error: 'Falta la URL' });

    // SUSTITUYE ESTA API KEY SI TIENES OTRA, PERO ESTA ES LA TUYA:
    const apiKey = '6d670f29d2msh5ec78c92dc17ff4p1a2332jsn07491138181e';
    
    // Cambiaremos el Host a uno más compatible (FB Video Downloader)
    const apiHost = 'facebook-video-downloader.p.rapidapi.com';

    const options = {
        method: 'POST', // Usamos POST para mayor estabilidad
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': apiHost
        },
        body: new URLSearchParams({
            url: videoUrl
        })
    };

    try {
        const response = await fetch(`https://${apiHost}/`, options);
        const data = await response.json();
        
        // Enviamos la respuesta limpia al index.html
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Fallo de conexion con RapidAPI', detalle: error.message });
    }
}
