// Team.js
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
      <h2 style={{ fontWeight: "bold", fontSize: "24px", marginBottom: "1rem" }}>🏏 Team Members</h2>
      {players.length === 0 ? (
        <p>No players added yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {players.map((player, index) => (
            <li key={index} style={{ marginBottom: "1rem", borderBottom: "1px solid #ccc", paddingBottom: "1rem" }}>
              <strong>{player.name}</strong> – {player.role} 📱 {player.phone}<br />
              {player.photo && (
                <img src={`${process.env.REACT_APP_API_URL}/uploads/${player.photo}`} alt={player.name} style={{ width: "100px", marginTop: "10px" }} />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Team;
