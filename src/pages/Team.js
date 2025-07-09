import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Team = () => {
  const [players, setPlayers] = useState([]);
  const [message, setMessage] = useState('');

  const fetchPlayers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/players`);
      setPlayers(res.data);
    } catch (error) {
      console.error('❌ Error fetching players:', error);
      setMessage('❌ Failed to load players.');
    }
  };

  const handleDelete = async (id) => {
    const isAdmin = prompt("Enter admin password to delete player:");
    if (isAdmin !== "admin123") {
      alert("❌ Unauthorized");
      return;
    }

    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/players/${id}`);
      setPlayers(players.filter(player => player._id !== id));
      setMessage('✅ Player deleted successfully!');
    } catch (error) {
      console.error('❌ Error deleting player:', error);
      setMessage('❌ Failed to delete player.');
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '1rem',
    margin: '1rem',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  };

  const imageStyle = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '10px'
  };

  const buttonStyle = {
    padding: '8px 12px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
  };

  const teamStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  };

  const headingStyle = {
    textAlign: 'center',
    marginTop: '1rem'
  };

  const messageStyle = {
    textAlign: 'center',
    color: message.includes('success') ? 'green' : 'red',
    marginBottom: '1rem'
  };

  return (
    <div>
      <h2 style={headingStyle}>Team Players</h2>
      {message && <p style={messageStyle}>{message}</p>}
      <div style={teamStyle}>
        {players.map((player) => (
          <div key={player._id} style={cardStyle}>
            <img src={player.photo} alt={player.name} style={imageStyle} />
            <h3>{player.name}</h3>
            <p>{player.role}</p>
            <button style={buttonStyle} onClick={() => handleDelete(player._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
