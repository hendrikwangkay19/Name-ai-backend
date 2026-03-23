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

    const { topic } = body || {};
    if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
      return res.status(400).json({ error: "Topic wajib diisi dan tidak boleh kosong" });
    }

    // Validasi API key
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "OpenAI API key tidak dikonfigurasi" });
    }

    const sanitizedTopic = topic.trim();

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
            content: "Kamu adalah ahli product manager. Buat 5-7 ide produk digital yang inovatif, praktis, dan marketable terkait topik yang diberikan. Setiap ide harus mencakup: nama produk, deskripsi singkat, target audience, dan potensi monetisasi. Format jawaban dalam bentuk list yang rapi."
          },
          {
            role: "user",
            content: `Buat ide produk digital tentang "${sanitizedTopic}". Berikan ide-ide yang realistis dan bisa diimplementasikan.`
          }
        ],
        max_tokens: 1500,
        temperature: 0.7
      })
    });

    // Check OpenAI response status
    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json();
      console.error('OpenAI API Error:', errorData);
      return res.status(400).json({ 
        error: "Gagal mendapatkan respons dari AI", 
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
      usage: data.usage
    });

  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ 
      error: "Server error", 
      detail: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error' 
    });
  }
}