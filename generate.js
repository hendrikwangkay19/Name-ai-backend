export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { topic } = req.body || {};
    if (!topic) {
      return res.status(400).json({ error: "Topic wajib diisi" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.OPENAI_API_KEY
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "user", content: "Buat ide produk digital tentang " + topic }
        ]
      })
    });

    const data = await response.json();

    return res.status(200).json({
      result: data?.choices?.[0]?.message?.content || "Tidak ada hasil"
    });

  } catch (err) {
    return res.status(500).json({ error: "Server error", detail: err.message });
  }
}