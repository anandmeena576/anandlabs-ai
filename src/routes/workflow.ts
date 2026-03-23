import express from "express";
import { generateAIResponse } from "../services/gemini";

const router = express.Router();

router.post("/generate", async (req, res) => {
  const { text } = req.body;

  const result = await generateAIResponse(text);

  res.json({ data: result });
});

export default router;