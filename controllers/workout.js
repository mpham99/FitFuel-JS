const express = require("express");
const app = express();
const { OpenAI } = require("openai");
require("dotenv").config();
var router = express.Router();
const Model = require("./../models/userinfo.js");
// const mustacheExpress = require("mustache-express");

// Set up OpenAI client
const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_TOKEN,
    baseURL: "https://openrouter.ai/api/v1/",
});

router.get("/", async function (req, res) {
    const results = await Model.getUserByUsername(req.session.username);
    req.TPL.userInfo = Model.transformValue(results);
    res.render("workout_page", req.TPL);
});

router.post("/", async function (req, res) {
    try {
        const results = await Model.getUserByUsername(req.session.username);
        const userInfo = Model.transformValue(results);

        const prompt = generateWorkoutPrompt(userInfo);

        const response = await openai.chat.completions.create({
            model: "deepseek/deepseek-r1-zero:free",
            messages: [
                {
                    role: "system",
                    content: "You are an AI writing assistant that generates a script based on the provided prompt.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ]
        });

        const script = response.choices[0]?.message?.content?.trim() || "No script generated";
        res.json({script});
    } catch (error) {
        console.error("OpenAI error:", error);
        res.status(500).json({error: "Failed to generate script."});
    }
})

function generateWorkoutPrompt(userInfo) {
    const {
        goal,
        sex,
        macroPriority,
        age,
        weight
    } = userInfo;

    return `Create a short, 200-word workout suggestions for ${sex}, age ${age}, current weight ${weight}lbs with ${goal}`
        + `goal and ${macroPriority} and return the response quickest as possible in HTML format`;

}
module.exports = router;