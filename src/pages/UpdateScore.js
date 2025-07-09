import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { isAdmin } from '../utils/admin';

const UpdateScore = () => {
  const [runs, setRuns] = useState('');
  const [wickets, setWickets] = useState('');
  const [overs, setOvers] = useState('');
  const [adminPin, setAdminPin] = useState('');

  useEffect(() => {
    const fetchScore = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/scores`);
      if (res.data.length > 0) {
        const latest = res.data[res.data.length - 1];
        setRuns(latest.runs);
        setWickets(latest.wickets);
        setOvers(latest.overs);
      }
    };
    fetchScore();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin(adminPin)) {
      alert("❌ Unauthorized! Incorrect admin PIN.");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/scores`, { runs, wickets, overs });
      alert("✅ Score updated!");
    } catch (err) {
      alert("❌ Failed to update score");
    }
  };

  return (
    <div className="form-container">
      <h2>Update Live Score</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" placeholder="Runs" value={runs} onChange={(e) => setRuns(e.target.value)} required />
        <input type="number" placeholder="Wickets" value={wickets} onChange={(e) => setWickets(e.target.value)} required />
        <input type="text" placeholder="Overs" value={overs} onChange={(e) => setOvers(e.target.value)} required />
        <input type="password" placeholder="Admin PIN" value={adminPin} onChange={(e) => setAdminPin(e.target.value)} required />
        <button type="submit">Update Score</button>
      </form>
    </div>
  );
};

export default UpdateScore;
