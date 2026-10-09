const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "OutsideFlow API is running",
  });
});

app.post("/api/generate-plan", async (req, res) => {
  try {
    const { time, mood, environment, note } = req.body;

    if (!time || !mood || !environment) {
      return res.status(400).json({
        success: false,
        message: "Time, mood, and environment are required",
      });
    }

    const prompt = `
You are the AI engine for OutsideFlow.

Your job is to create a simple outdoor activity plan that gets the user away from the screen and into the real world.

Return ONLY valid JSON.
Do not include markdown.
Do not include explanations.
Do not include code fences.

Return this exact structure:

{
  "title": "Short outdoor plan title",
  "goal": "One short sentence describing the goal",
  "activities": [
    {
      "step": 1,
      "activity": "Clear outdoor activity",
      "duration": "10 min"
    }
  ]
}

User preferences:

Available time: ${time} minutes
Mood: ${mood}
Environment: ${environment}
Extra note: ${note || "None"}

Rules:

- The total duration of all activities must not exceed ${time} minutes.
- Keep the plan practical and realistic.
- The user should spend as little time as possible looking at the screen.
- Activities should mainly happen outdoors.
- Avoid expensive activities unless the user asks for them.
- Avoid unsafe, illegal, or high-risk activities.
- Keep instructions simple.
- Prefer activities that can start immediately.
- Use 3 to 5 activities.
- Use whole-minute durations.
- If the environment is "Anywhere", choose activities that can work in most outdoor settings.
- Respect the user's mood.
- Do not suggest using the phone unless it is essential.
- Do not include indoor-only activities.
`;

    const ollamaResponse = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gemma3:1b",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        stream: false,
        format: "json",
        options: {
          temperature: 0.4,
        },
      }),
    });

    if (!ollamaResponse.ok) {
      throw new Error(`Ollama request failed: ${ollamaResponse.status}`);
    }

    const ollamaData = await ollamaResponse.json();

    const content = ollamaData.message?.content;

    if (!content) {
      throw new Error("No response received from Gemma");
    }

    let parsed;

    try {
      parsed = JSON.parse(content);
    } catch (error) {
      console.error("Invalid Gemma response:", content);

      return res.status(500).json({
        success: false,
        message: "AI returned invalid JSON",
        raw: content,
      });
    }

    const plan =
      parsed.plan && typeof parsed.plan === "object" ? parsed.plan : parsed;

    if (
      !plan ||
      typeof plan !== "object" ||
      !plan.title ||
      !Array.isArray(plan.activities)
    ) {
      return res.status(422).json({
        success: false,
        message: "AI returned an invalid outdoor plan",
        raw: parsed,
      });
    }

    const normalizedPlan = {
      title: plan.title || "Your Outdoor Session",

      goal: plan.goal || "Spend some meaningful time outside.",

      activities: plan.activities
        .filter((item) => item && typeof item.activity === "string")
        .map((item, index) => ({
          step: index + 1,
          activity: item.activity.trim(),
          duration: item.duration || "5 min",
        })),
    };

    if (normalizedPlan.activities.length === 0) {
      return res.status(422).json({
        success: false,
        message: "AI did not generate any activities",
      });
    }

    return res.json({
      success: true,
      plan: normalizedPlan,
    });
  } catch (error) {
    console.error("OutsideFlow AI Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to generate outdoor plan",
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`OutsideFlow API running on port ${PORT}`);
});
