import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { isAdmin } from '../utils/admin';

const Team = () => {
  const [players, setPlayers] = useState([]);
  const [adminPin, setAdminPin] = useState('');

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/players`);
        setPlayers(res.data);
      } catch (err) {
        console.error("Failed to load players");
      }
    };
    fetchPlayers();
  }, []);

  const handleDelete = async (id) => {
    if (!isAdmin(adminPin)) {
      alert("❌ Unauthorized! Incorrect admin PIN.");
      return;
    }

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/players/${id}`);
      alert("✅ Player deleted!");
      setPlayers(players.filter(p => p._id !== id));
    } catch (err) {
      alert("❌ Failed to delete player");
    }
  };

  return (
    <div className="team-container">
      <h2>🏏 Team Players</h2>
      <input
        type="password"
        placeholder="Enter Admin PIN to delete"
        value={adminPin}
        onChange={(e) => setAdminPin(e.target.value)}
        style={{ marginBottom: '1rem', padding: '0.5rem', borderRadius: '6px' }}
      />
      {players.length === 0 ? (
        <p>No players added yet.</p>
      ) : (
        <div className="player-grid">
          {players.map(player => (
            <div key={player._id} className="player-card">
              <img src={`${process.env.REACT_APP_API_URL}/${player.photo}`} alt={player.name} className="player-photo" />
              <h4>{player.name}</h4>
              <p>{player.role}</p>
              <p>📞 {player.phone}</p>
              <button onClick={() => handleDelete(player._id)} className="delete-btn">Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Team;
