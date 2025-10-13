import { useState } from "react";

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkReadiness = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:5000/check-readiness");
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div style={{ fontFamily: "sans-serif", textAlign: "center", marginTop: "3rem" }}>
      <h1>🚀 Agentic Release Readiness Dashboard</h1>
      <button
        onClick={checkReadiness}
        disabled={loading}
        style={{
          padding: "12px 24px",
          marginTop: "1rem",
          background: "#2563eb",
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