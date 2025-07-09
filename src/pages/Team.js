import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Team = () => {
  const [players, setPlayers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/players`);
      setPlayers(res.data);
    } catch (err) {
      console.error("Failed to load players", err);
      setMessage("❌ Failed to load players");
    }
  };

  const handleDelete = async (id) => {
    const adminPass = prompt("Enter admin password to delete:");
    if (adminPass !== "admin123") {
      alert("Unauthorized!");
      return;
    }

    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/players/${id}`);
      setPlayers(players.filter(p => p._id !== id));
      setMessage("✅ Player deleted successfully!");
    } catch (err) {
      console.error("Failed to delete", err);
      setMessage("❌ Error deleting player");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2 style={{ textAlign: "center" }}>Team Players</h2>
      {message && <p style={{ textAlign: "center", color: message.includes("✅") ? "green" : "red" }}>{message}</p>}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {players.map((player) => (
          <div key={player._id} style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "1rem",
            margin: "1rem",
            textAlign: "center",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
          }}>
            <img src={player.photo} alt={player.name} style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }} />
            <h3>{player.name}</h3>
            <p>{player.role}</p>
            <button onClick={() => handleDelete(player._id)} style={{
              padding: "6px 12px",
              backgroundColor: "#e53935",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
