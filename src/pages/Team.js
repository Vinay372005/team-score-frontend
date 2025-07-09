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
      console.error("Error fetching players:", err);
      setMessage("❌ Failed to load players");
    }
  };

  const handleDelete = async (id) => {
    const adminPass = prompt("Enter admin password to delete:");
    if (adminPass !== "admin123") {
      alert("Unauthorized access");
      return;
    }

    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/players/${id}`);
      setPlayers(players.filter(p => p._id !== id));
      setMessage("✅ Player deleted");
    } catch (err) {
      console.error("Error deleting player:", err);
      setMessage("❌ Error deleting player");
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ textAlign: 'center' }}>Team Players</h2>
      {message && <p style={{ color: message.includes('✅') ? 'green' : 'red', textAlign: 'center' }}>{message}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {players.map(player => (
          <div key={player._id} style={{
            border: '1px solid #ccc',
            padding: '1rem',
            margin: '1rem',
            borderRadius: '10px',
            textAlign: 'center',
            width: '180px'
          }}>
            <img src={player.photo} alt={player.name} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
            <h4>{player.name}</h4>
            <p>{player.role}</p>
            <button onClick={() => handleDelete(player._id)} style={{
              backgroundColor: '#e74c3c',
              color: 'white',
              padding: '6px 10px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
