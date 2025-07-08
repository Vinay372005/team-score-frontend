// src/pages/Team.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Team = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/players`);
        setPlayers(res.data);
      } catch (err) {
        alert("❌ Failed to fetch team");
      }
    };
    fetchPlayers();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ fontWeight: "bold", fontSize: "24px", marginBottom: "1rem" }}>👥 Team Players</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {players.map(player => (
          <div key={player._id} style={{
            backgroundColor: "#f9f9f9",
            padding: "1rem",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            width: "200px",
            textAlign: "center"
          }}>
            <img
              src={`${process.env.REACT_APP_API_URL}/${player.photo}`}
              alt={player.name}
              style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }}
            />
            <h3>{player.name}</h3>
            <p><strong>Role:</strong> {player.role}</p>
            <p><strong>Phone:</strong> {player.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
