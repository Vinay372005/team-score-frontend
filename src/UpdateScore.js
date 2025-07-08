import React, { useState } from 'react';
import axios from 'axios';

const UpdateScore = () => {
  const [form, setForm] = useState({
    runs: '',
    overs: '',
    batsman: '',
    bowler: '',
    status: 'Live'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/scores`, form);
      alert("✅ Score updated & SMS sent if innings started/ended");
    } catch (err) {
      console.error("❌ Error updating score", err);
      alert("❌ Failed to update score");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "auto" }}>
      <h2 style={{ fontWeight: "bold", fontSize: "24px", marginBottom: "1rem" }}>📊 Update Score</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" placeholder="Runs" value={form.runs} onChange={e => setForm({ ...form, runs: e.target.value })} required style={inputStyle} />
        <input type="number" placeholder="Overs" value={form.overs} onChange={e => setForm({ ...form, overs: e.target.value })} required style={inputStyle} />
        <input type="text" placeholder="Batsman" value={form.batsman} onChange={e => setForm({ ...form, batsman: e.target.value })} style={inputStyle} />
        <input type="text" placeholder="Bowler" value={form.bowler} onChange={e => setForm({ ...form, bowler: e.target.value })} style={inputStyle} />
        <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} style={inputStyle}>
          <option value="Live">Live</option>
          <option value="Finished">Finished</option>
          <option value="Not Started">Not Started</option>
        </select>
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
  backgroundColor: "#33691E",
  color: "white",
  padding: "0.75rem 1.5rem",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

export default UpdateScore;
