import { useState } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState("30");
  const [mood, setMood] = useState("Relax");
  const [environment, setEnvironment] = useState("Anywhere");
  const [note, setNote] = useState("");
  const [plan, setPlan] = useState(null);

  const handleGenerate = () => {
    setPlan({
      title: "30-Minute Outdoor Reset",
      goal: "Relax and get some fresh air",
      activities: [
        {
          step: 1,
          activity: "Walk outside without headphones",
          duration: "10 min",
        },
        {
          step: 2,
          activity: "Find and photograph 3 interesting plants",
          duration: "10 min",
        },
        {
          step: 3,
          activity: "Sit somewhere quiet and observe your surroundings",
          duration: "5 min",
        },
        {
          step: 4,
          activity: "Walk back using a different route",
          duration: "5 min",
        },
      ],
    });
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <div>
            <h1>OutsideFlow AI</h1>
            <p>Spend less time planning. Spend more time outside.</p>
          </div>

          <div className="local-ai-badge">
            <span className="status-dot"></span>
            Local AI
          </div>
        </header>

        <section className="planner-card">
          <h2>Create your outdoor plan</h2>
          <p className="subtext">
            Tell OutsideFlow what kind of break you want.
          </p>

          <div className="field-group">
            <label>Available time</label>

            <div className="option-row">
              {["15", "30", "60"].map((value) => (
                <button
                  key={value}
                  className={`option-button ${time === value ? "active" : ""}`}
                  onClick={() => setTime(value)}
                >
                  {value} min
                </button>
              ))}
            </div>
          </div>

          <div className="field-group">
            <label>Mood</label>

            <div className="option-row">
              {["Relax", "Exercise", "Explore", "Social"].map((value) => (
                <button
                  key={value}
                  className={`option-button ${mood === value ? "active" : ""}`}
                  onClick={() => setMood(value)}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          <div className="field-group">
            <label>Environment</label>

            <select
              value={environment}
              onChange={(e) => setEnvironment(e.target.value)}
            >
              <option>Anywhere</option>
              <option>Neighborhood</option>
              <option>Park</option>
              <option>Garden</option>
              <option>Beach</option>
            </select>
          </div>

          <div className="field-group">
            <label>Anything else?</label>

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Example: I don't want to spend money and I prefer something quiet."
              rows={4}
            />
          </div>

          <button className="generate-button" onClick={handleGenerate}>
            Generate Outdoor Plan
          </button>
        </section>

        {plan && (
          <section className="plan-card">
            <span className="eyebrow">YOUR OUTDOOR PLAN</span>

            <h2>{plan.title}</h2>

            <p className="goal">{plan.goal}</p>

            <div className="activity-list">
              {plan.activities.map((item) => (
                <div className="activity-item" key={item.step}>
                  <div className="step-number">{item.step}</div>

                  <div className="activity-content">
                    <h3>{item.activity}</h3>
                    <span>{item.duration}</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="start-button">Start Outdoor Session</button>

            <p className="phone-away">Put your phone away and go 🌿</p>
          </section>
        )}
      </div>
    </div>
  );
}

export default App;
