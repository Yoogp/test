const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const OPENAI_API_KEY = "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"; // Replace with your OpenAI key

app.post("/chat", async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: prompt }]
            },
            {
                headers: { Authorization: `Bearer ${OPENAI_API_KEY}` }
            }
        );

        res.json({ reply: response.data.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
