import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { isAdmin } from '../utils/admin';

const LiveScore = () => {
  const [scores, setScores] = useState([]);
  const [adminPin, setAdminPin] = useState('');

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/scores`);
        setScores(res.data);
      } catch (err) {
        alert("❌ Failed to load score");
      }
    };
    fetchScores();
  }, []);

  const handleDelete = async (id) => {
    if (!isAdmin(adminPin)) {
      alert("❌ Unauthorized! Incorrect admin PIN.");
      return;
    }

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/scores/${id}`);
      alert("✅ Score deleted!");
      setScores(scores.filter(score => score._id !== id));
    } catch (err) {
      alert("❌ Failed to delete score");
    }
  };

  return (
    <div className="score-container">
      <h2>📺 Live Score</h2>
      <input
        type="password"
        placeholder="Enter Admin PIN to delete score"
        value={adminPin}
        onChange={(e) => setAdminPin(e.target.value)}
        style={{ marginBottom: '1rem', padding: '0.5rem', borderRadius: '6px' }}
      />
      {scores.length === 0 ? (
        <p>No score updates yet.</p>
      ) : (
        scores.map((score, idx) => (
          <div key={idx} className="score-card">
            <h3>{score.teamA} 🆚 {score.teamB}</h3>
            <p>🏏 Batting: {score.battingTeam}</p>
            <p>Score: {score.runs}/{score.wickets} in {score.overs} overs</p>
            <p>Status: {score.status}</p>
            {isAdmin(adminPin) && (
              <button onClick={() => handleDelete(score._id)} className="delete-btn">Delete Score</button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default LiveScore;
