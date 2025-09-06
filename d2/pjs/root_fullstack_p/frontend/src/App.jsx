import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [reply, setReply] = useState("");

  // GET example
  useEffect(() => {
    fetch("http://localhost:5000/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  // POST example
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    const data = await res.json();
    setReply(data.reply);
  };

  return (
    <div>
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
