import { useState } from "react";

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkReadiness = async () => {
    setLoading(true);
    const res = await fetch("https://stunning-spork-7wx96g76r4p3px4r-5000.app.github.dev/check-readiness");
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div>
      <h1 align="center">Agentic Release Readiness Dashboard</h1>
      <button
        onClick={checkReadiness}
        disabled={loading}
        style={{
          padding: "12px 24px",
          marginTop: "1rem",
          background: "#561257",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        {loading ? "Checking..." : "Run Readiness Check"}
      </button>

      {result && (
        <div style={{ marginTop: "2rem" }}>
          <h2>
            {result.decision === "GO"
              ? "✅ GO"
              : result.decision === "CAUTION"
              ? "⚠️ CAUTION"
              : "❌ NO-GO"}
          </h2>
          <p>{result.reason}</p>
          <pre style={{ textAlign: "left", display: "inline-block", marginTop: "1rem" }}>
            {JSON.stringify(result.details, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}