// backend/server.js
import express from "express";
import cors from "cors";
import fs from "fs";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

app.get("/check-readiness", async (req, res) => {
  const data = JSON.parse(fs.readFileSync("./mock_project_data.json", "utf-8"));
  
  const prompt = `
  You are an AI release readiness advisor.
  Analyze the following project data and decide if the system is ready for deployment.
  Respond in JSON format with the fields: decision (GO, CAUTION, or NO-GO) and reason.
  Do not include any other text outside the JSON object.
  Avoid formatting your response with code blocks or markdown; only output raw JSON.

  Data:
  ${JSON.stringify(data)}
  `;
  
  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const parsed = JSON.parse(text); // Gemini outputs valid JSON most of the time
    res.json({ ...parsed, details: text });
  } catch (err) {
    console.error("Gemini Error:", err);
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    res.json({
      decision: "CAUTION",
      reason: "Agent reasoning failed, fallback mode",
      details: text
    });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Backend with Gemini Agent running on port ${PORT}`));
