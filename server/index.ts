import express from "express";
import type { Request, Response } from "express"; // ✅ FIX
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

// Route
app.post("/api/chat", async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Message is required" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const result = await model.generateContent(message);
    const response = result.response.text();

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