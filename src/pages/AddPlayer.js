// src/pages/AddPlayer.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Form.css';

const AddPlayer = () => {
  const [form, setForm] = useState({ name: '', role: '', phone: '', photo: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', form.name);
    data.append('role', form.role);
    data.append('phone', form.phone);
    data.append('photo', form.photo);

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/players`, data);
      alert('✅ Player added and SMS sent!');
      setForm({ name: '', role: '', phone: '', photo: null });
    } catch (err) {
      alert('❌ Failed to add player');
    }
  };

  return (
    <div className="form-container">
      <h2>➕ Add New Player</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input type="text" placeholder="Role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} required />
        <input type="tel" placeholder="Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
        <input type="file" onChange={e => setForm({ ...form, photo: e.target.files[0] })} required />
        <button type="submit">Add Player</button>
      </form>
    </div>
  );
};

export default AddPlayer;
