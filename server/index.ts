require("dotenv").config();

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Gemini setup
// Note: Variable types yahan inline declare kiye gaye hain bina upar import kiye.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

// Route with proper TypeScript types without top-level imports
// isse syntax error nahi aayega strict commonjs mode main.
app.post("/api/chat", async (
  req: import('express').Request, 
  res: import('express').Response
) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Message is required" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const result = await model.generateContent(message);
    const response = await result.response.text();

    res.json({ reply: response });

  } catch (error: any) {
    console.error(error);
    res.status(500).json({ reply: "Error from Gemini API" });
  }
});

// Server start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
