import React, { useState } from 'react';
import axios from 'axios';

const UpdateScore = () => {
  const [form, setForm] = useState({ runs: '', wickets: '', overs: '', status: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/scores`, form);
      alert("Score updated!");
    } catch (err) {
      alert("Failed to update score");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Admin - Update Score</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" placeholder="Runs" onChange={e => setForm({ ...form, runs: e.target.value })} required /><br />
        <input type="number" placeholder="Wickets" onChange={e => setForm({ ...form, wickets: e.target.value })} required /><br />
        <input type="text" placeholder="Overs" onChange={e => setForm({ ...form, overs: e.target.value })} required /><br />
        <input type="text" placeholder="Status (e.g. 1st Innings)" onChange={e => setForm({ ...form, status: e.target.value })} required /><br />
        <input type="password" placeholder="Admin Password" onChange={e => setForm({ ...form, password: e.target.value })} required /><br />
        <button type="submit">Submit Score</button>
      </form>
    </div>
  );
};

export default UpdateScore;
