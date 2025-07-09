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
        alert("❌ Failed to load team");
      }
    };
    fetchPlayers();
  }, []);

  return (
    <div className="team-container">
      <h2>👥 Team Players</h2>
      {players.length === 0 ? (
        <p>No players added yet.</p>
      ) : (
        <div className="player-grid">
          {players.map((player, idx) => (
            <div key={idx} className="player-card">
              <img src={player.photo} alt={player.name} className="player-photo" />
              <h4>{player.name}</h4>
              <p>{player.role}</p>
              <p>{player.team}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Team;
