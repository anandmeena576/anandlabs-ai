import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { generateWorkflow } from "./openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
  try {
    const { text } = req.body;
    const result = await generateWorkflow(text);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});