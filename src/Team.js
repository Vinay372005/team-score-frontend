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
        console.error("❌ Failed to fetch players", err);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ fontWeight: "bold", fontSize: "24px", marginBottom: "1rem" }}>👥 Team Members</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
        {players.map((player) => (
          <div key={player._id} style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "1rem",
            backgroundColor: "#f9f9f9",
            textAlign: "center"
          }}>
            <img src={`${process.env.REACT_APP_API_URL}/${player.photo}`} alt={player.name} style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }} />
            <h3 style={{ margin: "0.5rem 0" }}>{player.name}</h3>
            <p>📛 {player.role}</p>
            <p>📞 {player.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
