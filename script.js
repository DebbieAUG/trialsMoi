const API_KEY = "AIzaSyCwI3dcFDKUs0paUn79C4WJgzbpWgzXglo"; // public

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
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=" + API_KEY,
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

    let html = data.candidates?.[0]?.content?.parts?.text || "<h3>Error Generating...</h3>";

    html = html.replace(/```html|```/g, "");

    document.getElementById("code").innerText = html;
    document.getElementById("preview").srcdoc = html;

} catch(error) {document.getElementById("code").innerText = "ERROR"; }

}
