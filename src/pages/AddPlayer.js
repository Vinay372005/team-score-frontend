// src/pages/AddPlayer.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Form.css';
import { isAdmin } from '../utils/admin';

const AddPlayer = () => {
  const [player, setPlayer] = useState({
    name: '',
    role: '',
    team: '',
    photo: '',
    adminPin: ''
  });

  const handleChange = (e) => {
    setPlayer({ ...player, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAdmin(player.adminPin)) {
      alert("❌ Unauthorized! Incorrect admin PIN.");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/players`, player);
      alert('✅ Player added!');
      setPlayer({
        name: '',
        role: '',
        team: '',
        photo: '',
        adminPin: ''
      });
    } catch (err) {
      alert('❌ Failed to add player');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Add Player</h2>
      <input type="text" name="name" placeholder="Name" value={player.name} onChange={handleChange} required />
      <input type="text" name="role" placeholder="Role (Batsman/Bowler)" value={player.role} onChange={handleChange} required />
      <input type="text" name="team" placeholder="Team" value={player.team} onChange={handleChange} required />
      <input type="text" name="photo" placeholder="Photo URL" value={player.photo} onChange={handleChange} required />
      <input type="password" name="adminPin" placeholder="Admin PIN" value={player.adminPin} onChange={handleChange} required />
      <button type="submit">Add Player</button>
    </form>
  );
};

export default AddPlayer;
