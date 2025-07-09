import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Form.css';
import { isAdmin } from '../utils/admin';

const UpdateScore = () => {
  const [score, setScore] = useState({
    teamA: '',
    teamB: '',
    battingTeam: '',
    runs: '',
    wickets: '',
    overs: '',
    status: '',
    adminPin: ''
  });

  const handleChange = (e) => {
    setScore({ ...score, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAdmin(score.adminPin)) {
      alert("❌ Unauthorized! Incorrect admin PIN.");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/scores`, score);
      alert("✅ Score updated!");
      setScore({
        teamA: '',
        teamB: '',
        battingTeam: '',
        runs: '',
        wickets: '',
        overs: '',
        status: '',
        adminPin: ''
      });
    } catch (err) {
      alert("❌ Failed to update score");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Update Match Score</h2>
      <input type="text" name="teamA" placeholder="Team A" value={score.teamA} onChange={handleChange} required />
      <input type="text" name="teamB" placeholder="Team B" value={score.teamB} onChange={handleChange} required />
      <input type="text" name="battingTeam" placeholder="Batting Team" value={score.battingTeam} onChange={handleChange} required />
      <input type="number" name="runs" placeholder="Runs" value={score.runs} onChange={handleChange} required />
      <input type="number" name="wickets" placeholder="Wickets" value={score.wickets} onChange={handleChange} required />
      <input type="text" name="overs" placeholder="Overs" value={score.overs} onChange={handleChange} required />
      <input type="text" name="status" placeholder="Match Status" value={score.status} onChange={handleChange} required />
      <input type="password" name="adminPin" placeholder="Admin PIN" value={score.adminPin} onChange={handleChange} required />
      <button type="submit">Update Score</button>
    </form>
  );
};

export default UpdateScore;
