# OutsideFlow AI

OutsideFlow AI is a local AI-powered outdoor activity planner built for the **Hacktoberfest 2026 Open-Source AI Challenge Week 1: Touch Grass**.

The goal is simple:

> Spend less time planning. Spend more time outside.

OutsideFlow asks the user for a few preferences, generates a personalized outdoor plan using a locally running open-weight AI model, and then encourages the user to put the phone away and actually go outside.

---

## Challenge Theme

This project was built for the Hacktoberfest 2026 theme:

**Touch Grass**

The challenge asks participants to build something with open-source AI that gets people off the screen and into the real world.

OutsideFlow is designed specifically around that idea.

The screen is only used for a short planning step.

After the outdoor plan is generated, the user starts the session and is encouraged to:

> Put your phone away and go 🌿

---

## The Problem

People often want to take a break, exercise, explore, or simply spend some time outside, but deciding what to do can become another small barrier.

Someone may think:

- I only have 30 minutes.
- I want something relaxing.
- I do not want to spend money.
- I do not know where to go.
- I want something simple near my neighborhood.

They may then spend more time searching for ideas than actually going outside.

OutsideFlow removes that friction.

---

## The Solution

OutsideFlow allows the user to choose:

- Available time
- Mood
- Environment
- Optional personal preferences

For example:

```text
Available time: 30 minutes
Mood: Relax
Environment: Neighborhood

Extra note:
I want something quiet and I don't want to spend money.
```

The application sends those preferences to a local Gemma model running through Ollama.

The AI generates a practical outdoor plan such as:

```text
30-Minute Neighborhood Reset

Goal:
Slow down, get some fresh air, and take a short break from screens.

1. Walk outside without headphones — 10 min
2. Notice three things you normally ignore — 7 min
3. Sit somewhere quiet and observe your surroundings — 8 min
4. Walk home at a comfortable pace — 5 min
```

The user can then click:

```text
Start Outdoor Session
```

and OutsideFlow displays the final plan with the message:

```text
Put your phone away and go 🌿
```

---

## Features

- AI-generated outdoor activity plans
- Available time selection
- Mood selection
- Environment selection
- Optional free-text preferences
- Personalized activity generation
- Local AI inference
- No paid AI API required
- Simple outdoor session mode
- Minimal screen interaction
- Mobile-friendly interface
- Privacy-first design

---

## Tech Stack

### Frontend

- React
- Vite
- CSS

### Backend

- Node.js
- Express

### AI

- Ollama
- Gemma 3 1B

---

## How It Works

OutsideFlow follows this flow:

```text
User Preferences
       ↓
React Frontend
       ↓
Node.js / Express API
       ↓
Ollama
       ↓
Gemma 3 1B
       ↓
Structured Outdoor Plan
       ↓
React Plan Screen
       ↓
Start Outdoor Session
       ↓
Put the phone away and go outside
```

The user does not need to write a detailed prompt.

OutsideFlow gathers the necessary information through a simple interface and creates the AI prompt automatically.

---

## AI Input

The backend sends information such as:

```json
{
  "time": "30",
  "mood": "Relax",
  "environment": "Neighborhood",
  "note": "I want something peaceful and I don't want to spend money."
}
```

Gemma is instructed to return structured JSON.

Example:

```json
{
  "title": "30-Minute Quiet Neighborhood Reset",
  "goal": "Relax outside with a calm and simple walking session.",
  "activities": [
    {
      "step": 1,
      "activity": "Walk slowly around your neighborhood without headphones",
      "duration": "10 min"
    },
    {
      "step": 2,
      "activity": "Notice three plants or details you usually ignore",
      "duration": "7 min"
    },
    {
      "step": 3,
      "activity": "Sit somewhere quiet and observe your surroundings",
      "duration": "8 min"
    },
    {
      "step": 4,
      "activity": "Walk home at a comfortable pace",
      "duration": "5 min"
    }
  ]
}
```

The backend validates and normalizes this response before sending it to React.

---

## Why Local AI?

OutsideFlow uses **Gemma 3 1B** locally through Ollama.

This was an intentional design decision.

The application does not need to send the user's preferences to a closed cloud AI provider.

This provides several benefits.

### Privacy

The user's personal preferences can remain on their own computer.

### No Per-Request API Cost

Once the model is installed, OutsideFlow does not need to pay for every generated outdoor plan.

### Offline-Friendly

The AI model runs locally.

Once Ollama and Gemma are installed, the core AI generation does not depend on an external AI API.

### Model Flexibility

The application can be changed to use another Ollama-supported model in the future.

### User Control

The user controls where the model runs and how their data is processed.

---

## Why Open Innovation Matters

Open-source and open-weight AI are important to OutsideFlow because the AI is not just an optional extra.

It is the part of the application that creates personalized outdoor plans.

A hard-coded list could suggest generic activities, but it would not adapt naturally to combinations such as:

```text
15 minutes + Exercise + Beach
```

or:

```text
60 minutes + Explore + Park + no spending
```

Using an open-weight model makes the experience flexible while still allowing the application to run locally.

It also means the project is not permanently tied to one commercial AI provider.

---

## The Touch Grass Idea

The main goal of OutsideFlow is not to keep the user inside the application.

The application should be the shortest part of the experience.

The intended flow is:

```text
Choose preferences
       ↓
Generate plan
       ↓
Start session
       ↓
Put phone away
       ↓
Go outside
```

This design directly follows the Hacktoberfest theme:

> Get people off the screen and into the world.

---

## Project Structure

```text
outsideflow-ai/
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── server/
│   ├── index.js
│   ├── package.json
│   └── ...
│
├── docs/
│   ├── outsideflow-input.png
│   ├── outsideflow-plan.png
│   └── outsideflow-session.png
│
├── README.md
└── LICENSE
```

---

## Requirements

Before running OutsideFlow, install:

- Node.js
- npm
- Ollama

---

## Install Ollama

Download and install Ollama from:

```text
https://ollama.com
```

Verify the installation:

```bash
ollama --version
```

---

## Download Gemma

OutsideFlow currently uses:

```text
gemma3:1b
```

Download the model:

```bash
ollama pull gemma3:1b
```

You can test it with:

```bash
ollama run gemma3:1b
```

---

## Run the Backend

Open a terminal:

```bash
cd server
npm install
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

Test the API:

```text
GET http://localhost:5000/api/health
```

Expected response:

```json
{
  "success": true,
  "message": "OutsideFlow API is running"
}
```

---

## Run the Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Vite will display the local frontend URL.

Usually:

```text
http://localhost:5173
```

---

## Main API

### Generate Outdoor Plan

```text
POST /api/generate-plan
```

Example request:

```json
{
  "time": "30",
  "mood": "Relax",
  "environment": "Neighborhood",
  "note": "I want something quiet and free."
}
```

Example response:

```json
{
  "success": true,
  "plan": {
    "title": "Quiet Neighborhood Reset",
    "goal": "Take a calm break outside.",
    "activities": [
      {
        "step": 1,
        "activity": "Walk slowly around your neighborhood",
        "duration": "10 min"
      }
    ]
  }
}
```

---

## Screenshots

### Outdoor Planner

![OutsideFlow input screen](docs/outsideflow-input.png)

### AI-Generated Plan

![OutsideFlow generated plan](docs/outsideflow-plan.png)

### Outdoor Session Mode

![OutsideFlow session screen](docs/outsideflow-session.png)

---

## Testing OutsideFlow in the Real World

OutsideFlow is designed to be used outside, not just demonstrated on a screen.

For the Hacktoberfest challenge, the goal is to test at least one generated session in the real world and compare the generated plan with the actual experience.

Example test:

```text
Time: 30 minutes
Mood: Relax
Environment: Neighborhood
Preference: Quiet and no spending
```

The important question is not only:

> Did the AI generate a valid plan?

It is also:

> Did the plan actually help me stop looking at the screen and go outside?

---

## What I Learned

Building OutsideFlow helped me learn more about using open-weight AI as a real application feature.

I practiced:

- Running Gemma locally with Ollama
- Connecting React to a Node.js AI backend
- Designing structured AI prompts
- Requesting JSON output from a language model
- Validating AI responses
- Building around local inference
- Designing an AI experience that intentionally reduces screen time

One of the most interesting lessons was that AI does not always need to increase screen interaction.

It can also help reduce it.

---

## Hacktoberfest 2026

OutsideFlow AI was built for:

**Hacktoberfest 2026 Open-Source AI Challenge Week 1: Touch Grass**

The challenge asks participants to build something using open-source AI that encourages people to leave the screen and interact with the real world.

OutsideFlow was created specifically around that goal.

---

## AI Model

OutsideFlow currently uses:

**Gemma 3 1B**

through:

**Ollama**

---

## Status

The current version supports:

- Personalized AI outdoor plans
- Time selection
- Mood selection
- Environment selection
- Additional user preferences
- Local Gemma inference
- Outdoor session mode

---

## Future Ideas

Possible future improvements include:

- Weather-aware activity suggestions
- GPS-based environment suggestions
- Outdoor session history
- Completion tracking
- User feedback after returning
- More environment types
- Accessibility preferences
- Different local AI models
- Seasonal outdoor activity suggestions

---

## License

MIT
