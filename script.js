const API_KEY = "AIzaSyBM34RbyinMO8ryEPvATSXUiSAxYYou8eI"; // ⚠️ exposed (restrict it)

async function generate() {
  const prompt = document.getElementById("prompt").value;

  if (!prompt) {
    alert("Please enter a prompt!");
    return;
  }

  const fullPrompt = `
Generate a complete HTML5 webpage:
"${prompt}"

Rules:
- Output ONLY HTML
- Include <html>, <head>, <body>
- Use inline CSS
`;

  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }]
        })
      }
    );

    const data = await res.json();

    let html =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "<h3>Error generating page</h3>";

    // Clean markdown fences if present
    html = html.replace(/```html|```/g, "");

    document.getElementById("code").innerText = html;
    document.getElementById("preview").srcdoc = html;

  } catch (error) {
    document.getElementById("code").innerText = "Error: " + error.message;
  }
}