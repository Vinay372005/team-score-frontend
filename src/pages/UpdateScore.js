import React, { useState } from 'react';
import axios from 'axios';
import { isAdmin } from '../utils/admin';

const UpdateScore = () => {
  const [form, setForm] = useState({
    teamA: '',
    teamB: '',
    battingTeam: '',
    runs: '',
    wickets: '',
    overs: '',
    status: '',
  });
  const [adminPin, setAdminPin] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAdmin(adminPin)) {
      alert("❌ Unauthorized! Incorrect admin PIN.");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/scores`, form);
      alert("✅ Score updated!");
      setForm({
        teamA: '',
        teamB: '',
        battingTeam: '',
        runs: '',
        wickets: '',
        overs: '',
        status: '',
      });
    } catch (err) {
      alert("❌ Failed to update score");
    }
  };

  return (
    <div className="form-container">
      <h2>📝 Update Live Score</h2>
      <form onSubmit={handleSubmit}>
        <input type="password" placeholder="Enter Admin PIN" value={adminPin} onChange={e => setAdminPin(e.target.value)} required />
        <input type="text" placeholder="Team A" value={form.teamA} onChange={e => setForm({ ...form, teamA: e.target.value })} required />
        <input type="text" placeholder="Team B" value={form.teamB} onChange={e => setForm({ ...form, teamB: e.target.value })} required />
        <input type="text" placeholder="Batting Team" value={form.battingTeam} onChange={e => setForm({ ...form, battingTeam: e.target.value })} required />
        <input type="number" placeholder="Runs" value={form.runs} onChange={e => setForm({ ...form, runs: e.target.value })} required />
        <input type="number" placeholder="Wickets" value={form.wickets} onChange={e => setForm({ ...form, wickets: e.target.value })} required />
        <input type="text" placeholder="Overs" value={form.overs} onChange={e => setForm({ ...form, overs: e.target.value })} required />
        <input type="text" placeholder="Match Status" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} required />
        <button type="submit">Update Score</button>
      </form>
    </div>
  );
};

export default UpdateScore;

