// src/pages/AddPlayer.js
import React, { useState } from 'react';
import axios from 'axios';

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
      alert("✅ Player added and SMS sent!");
      setForm({ name: '', role: '', phone: '', photo: null });
    } catch (err) {
      alert("❌ Failed to add player");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "auto" }}>
      <h2 style={{ fontWeight: "bold", fontSize: "24px", marginBottom: "1rem" }}>➕ Add New Player</h2>
      <form onSubmit={handleSubmit} style={{
        backgroundColor: "#fff",
        padding: "1.5rem",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}>
        <input type="text" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required style={inputStyle} />
        <input type="text" placeholder="Role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} required style={inputStyle} />
        <input type="tel" placeholder="Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required style={inputStyle} />
        <input type="file" onChange={e => setForm({ ...form, photo: e.target.files[0] })} required style={{ marginBottom: "1rem" }} />
        <button type="submit" style={buttonStyle}>Add Player</button>
      </form>
    </div>
  );
};

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "0.75rem",
  marginBottom: "1rem",
  border: "1px solid #ccc",
  borderRadius: "6px"
};

const buttonStyle = {
  backgroundColor: "#003366",
  color: "white",
  padding: "0.75rem 1.5rem",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

export default AddPlayer;
