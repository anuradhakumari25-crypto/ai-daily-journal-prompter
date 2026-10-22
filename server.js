import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static("public"));

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.post("/journal-prompt", async (req, res) => {

    try {

        const { mood } = req.body;

        const prompt = `Write a short, encouraging journal prompt for someone feeling ${mood}.`;

        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: prompt
        });

        
        res.json({
            prompt: response.text
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "error.message"
        });

    }

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});