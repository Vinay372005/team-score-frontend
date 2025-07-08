// src/pages/UpdateScore.js
import React, { useState } from 'react';
import axios from 'axios';
import '../FormStyle.css';

const UpdateScore = () => {
  const [form, setForm] = useState({ runs: '', wickets: '', overs: '', status: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/scores`, form);
      alert("✅ Score updated successfully!");
      setForm({ runs: '', wickets: '', overs: '', status: '' });
    } catch (err) {
      alert("❌ Failed to update score");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "auto" }}>
      <h2 style={{ fontWeight: "bold", fontSize: "24px", marginBottom: "1rem" }}>✍️ Update Match Score</h2>
      <form onSubmit={handleSubmit} style={{
        backgroundColor: "#fff",
        padding: "1.5rem",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}>
        <input type="number" placeholder="Runs" value={form.runs} onChange={e => setForm({ ...form, runs: e.target.value })} required style={inputStyle} />
        <input type="number" placeholder="Wickets" value={form.wickets} onChange={e => setForm({ ...form, wickets: e.target.value })} required style={inputStyle} />
        <input type="text" placeholder="Overs (e.g. 12.3)" value={form.overs} onChange={e => setForm({ ...form, overs: e.target.value })} required style={inputStyle} />
        <input type="text" placeholder="Status (e.g. Inning 1 Started)" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} required style={inputStyle} />
        <button type="submit" style={buttonStyle}>Update Score</button>
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

export default UpdateScore;
