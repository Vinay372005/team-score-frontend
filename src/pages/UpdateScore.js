// === LiveScore.js (React frontend) ===
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LiveScore = () => {
  const [score, setScore] = useState({ runs: 0, overs: 0 });

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/scores`);
        if (res.data) {
          setScore(res.data);
        }
      } catch (err) {
        console.error("❌ Failed to fetch score", err);
      }
    };

    fetchScore();
    const interval = setInterval(fetchScore, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>🏏 Live Score</h1>
      <p style={{ fontSize: "22px" }}>Runs: <strong>{score.runs}</strong></p>
      <p style={{ fontSize: "22px" }}>Overs: <strong>{score.overs}</strong></p>
    </div>
  );
};

export default LiveScore;
