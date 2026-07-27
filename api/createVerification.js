// api/createVerification.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const response = await fetch("https://veridocid.azure-api.net/api/id/v3/createVerification", {
      method: "POST",
      headers: {
        "x-api-key": process.env.SUMA_PRIVATE_KEY, // Se lee desde las Variables de Entorno de Vercel
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: `poc_v2_${Date.now()}`,
        options: {
          checks: {
            selfie: false,      // Cambiar a true si deseas probar face-autocapture
            onlyVerifyID: true,
          },
        },
      }),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}