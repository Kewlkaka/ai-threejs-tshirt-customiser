import express from "express";
import * as dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const HF_API_TOKEN = process.env.HUGGING_FACE_API_TOKEN;

if (!HF_API_TOKEN) {
  console.error(
    "HUGGING_FACE_API_TOKEN is not set in the environment variables."
  );
  process.exit(1);
}

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from DALL-E ROUTES" });
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    console.log("Received prompt:", prompt);

    const response = await fetch(
      "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
      {
        headers: { Authorization: `Bearer ${HF_API_TOKEN}` },
        method: "POST",
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    console.log("HF API Response:", response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");

    if (!base64Image) {
      throw new Error("No Image Generated");
    }

    res.status(200).json({ photo: base64Image });
  } catch (error) {
    console.error("DALL-E API ERROR", error);
    console.error("Full error object:", JSON.stringify(error, null, 2));
    res.status(500).json({
      message: error.message || "An error occurred while generating the image",
      details: error.response?.data || error.stack,
    });
  }
});

export default router;
