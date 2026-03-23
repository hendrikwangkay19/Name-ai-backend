export default async function handler(req, res) {
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    // Parse body dengan lebih aman
    let body;
    try {
      body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    } catch (parseError) {
      return res.status(400).json({ error: "Invalid JSON body" });
    }

    const { product } = body || {};
    if (!product || typeof product !== 'string' || product.trim().length === 0) {
      return res.status(400).json({ error: "Product wajib diisi dan tidak boleh kosong" });
    }

    // Validasi API key
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "OpenAI API key tidak dikonfigurasi" });
    }

    const sanitizedProduct = product.trim();

    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `Kamu adalah copywriter profesional spesialis social media marketing. 
            Buat caption promosi yang:
            1. Menarik perhatian dalam 3 detik pertama
            2. Menggunakan emoji yang relevan (maksimal 5 emoji)
            3. Menonjolkan 3-5 benefit utama produk
            4. Mengandung CTA (Call To Action) yang kuat
            5. Cocok untuk Instagram/TikTok (max 150 kata)
            6. Tone: energik, persuasif, dan trustworthy
            Format: Caption + 3-5 hashtags relevan`
          },
          {
            role: "user",
            content: `Buat caption promosi untuk produk ini: "${sanitizedProduct}"`
          }
        ],
        max_tokens: 300,
        temperature: 0.8
      })
    });

    // Check OpenAI response status
    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json();
      console.error('OpenAI API Error:', errorData);
      return res.status(400).json({ 
        error: "Gagal mendapatkan caption dari AI", 
        detail: errorData.error?.message || 'Unknown error' 
      });
    }

    const data = await openaiResponse.json();

    if (!data.choices || data.choices.length === 0) {
      return res.status(500).json({ error: "Tidak ada respons dari AI" });
    }

    return res.status(200).json({
      success: true,
      result: data.choices[0].message.content,
      usage: data.usage,
      product: sanitizedProduct
    });

  } catch (err) {
    console.error('Promo handler error:', err);
    return res.status(500).json({ 
      error: "Server error", 
      detail: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error' 
    });
  }
}