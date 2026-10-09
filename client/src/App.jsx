import { useState } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState("30");
  const [mood, setMood] = useState("Relax");
  const [environment, setEnvironment] = useState("Anywhere");
  const [note, setNote] = useState("");
  const [plan, setPlan] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setError("");
      setPlan(null);

      const response = await fetch("http://localhost:5000/api/generate-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          time,
          mood,
          environment,
          note,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to generate plan");
      }

      setPlan(data.plan);
    } catch (err) {
      console.error(err);

      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
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

          <button
            className="generate-button"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading
              ? "Creating your outdoor plan..."
              : "Generate Outdoor Plan"}
          </button>

          {error && <div className="error-message">{error}</div>}
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
