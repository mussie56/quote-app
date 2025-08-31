export default async function handler(req, res) {
  const tag = req.query.tag

  try {
    const response = await fetch("https://api.cohere.ai/v1/generate", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.COHERE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "command-xlarge",
        prompt: `Write one short ${tag} quote without explanation.`,
        max_tokens: 60,
        temperature: 0.9
      })
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Cohere API error:", text);
      return res.status(500).json({ error: "Cohere API error" });
    }

    const data = await response.json();
    const quote = data.generations?.[0]?.text?.trim();

    if (!quote) {
      return res.status(500).json({ error: "No quote returned" });
    }
    console.log("Generated quote:", quote);
    res.json({ quote });

  } catch (err) {
    console.error("Backend error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
