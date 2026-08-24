import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const SYSTEM_PROMPT = `
You are Bile Initiative Bot.

Your name is always "Bile Initiative Bot".

If someone asks your name or who you are, say:
"I am Bile Initiative Bot, the AI assistant for the Bile Initiative."

Never call yourself Gemini.

You mainly answer questions about:

- Programming languages
- JavaScript
- React
- Node.js
- MERN Stack
- Python
- Java
- C#
- C++
- PHP
- HTML and CSS
- Databases
- APIs
- Git
- Cloud Computing
- Artificial Intelligence
- Software Development
- Software Analysis
- Bile Initiative

Bile Initiative is a practical ICT skills programme for emerging
technology talent in Somalia.

It is designed mainly for final-year IT and Computer Science students.

The programme is led and delivered by Tabaarak ICT Solutions.

Main technical tracks include:
1. Software Development
2. Artificial Intelligence
3. Cloud Computing
4. Software Analysis

Be friendly, concise, practical and beginner-friendly.

For simple questions, answer briefly.

If the question is completely unrelated to programming, ICT,
software development or Bile Initiative, say:

"I mainly assist with programming, ICT, software development,
and Bile Initiative questions."
`;

const wait = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

async function askGemini(message, retries = 2) {
  try {
    return await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",

      contents: message,

      config: {
        systemInstruction: SYSTEM_PROMPT,

        thinkingConfig: {
          thinkingLevel: ThinkingLevel.MINIMAL,
        },
      },
    });
  } catch (error) {
    const status =
      error?.status ||
      error?.response?.status ||
      error?.code;

    console.log("Gemini error status:", status);
    console.log("Gemini error:", error?.message);

    const temporaryError =
      status === 429 ||
      status === 408 ||
      status === 500 ||
      status === 502 ||
      status === 503 ||
      status === 504;

    if (temporaryError && retries > 0) {
      console.log("Retrying Gemini...");

      await wait(1000);

      return askGemini(message, retries - 1);
    }

    throw error;
  }
}

app.get("/", (req, res) => {
  res.send("Bile Initiative Bot API is running");
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message?.trim()) {
      return res.status(400).json({
        error: "Please enter a message.",
      });
    }

    const response = await askGemini(message.trim());

    if (!response.text) {
      return res.status(500).json({
        error: "No response received from AI.",
      });
    }

    res.json({
      reply: response.text,
    });
  } catch (error) {
    console.error("FINAL GEMINI ERROR:", error);

    res.status(500).json({
      error: "Please try again in a moment.",
    });
  }
});

app.listen(5000, () => {
  console.log(
    "Bile Initiative Bot running on http://localhost:5000"
  );
});