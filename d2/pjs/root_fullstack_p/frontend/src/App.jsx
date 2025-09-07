import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [reply, setReply] = useState("");

  // ✅ use environment variable
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  // GET example
  useEffect(() => {
    fetch(`${API_BASE}/api/hello`)
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("Error fetching:", err));
  }, [API_BASE]);

  // POST example
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE}/api/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();
      setReply(data.reply);
    } catch (error) {
      console.error("POST error:", error);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Vite + React + Express</h1>

      <p>GET response: {message}</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>

      {reply && <p>POST response: {reply}</p>}
    </div>
  );
}

export default App;
