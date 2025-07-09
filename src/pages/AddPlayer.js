// src/pages/AddPlayer.js
import React, { useState } from 'react';
import axios from 'axios';

const AddPlayer = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [photo, setPhoto] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !role || !photo) {
      alert("❌ Please fill in all fields");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/players`, {
        name,
        role,
        photo
      });
      alert("✅ Player added successfully!");
      setName('');
      setRole('');
      setPhoto('');
    } catch (error) {
      alert("❌ Failed to add player");
    }
  };

  return (
    <div className="add-player-container">
      <h2>➕ Add Player</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Player Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Role (Batsman/Bowler)"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <input
          type="text"
          placeholder="Photo URL"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
        />
        <button type="submit">Add Player</button>
      </form>
    </div>
  );
};

export default AddPlayer;
