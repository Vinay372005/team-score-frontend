// src/pages/LiveScore.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LiveScore = () => {
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/scores`);
        setScore(res.data);
      } catch (err) {
        alert("❌ Failed to load live score");
      }
    };

    fetchScore();
    const interval = setInterval(fetchScore, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  if (!score) return <p style={{ padding: "2rem" }}>Loading live score...</p>;

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2 style={{ fontWeight: "bold", fontSize: "24px", marginBottom: "1rem" }}>🏏 Live Match Score</h2>
      <div style={{
        backgroundColor: "#fff",
        padding: "1.5rem",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        display: "inline-block"
      }}>
        <h3 style={{ fontSize: "28px", color: "#003366" }}>{score.runs}/{score.wickets}</h3>
        <p style={{ fontSize: "20px" }}>{score.overs} overs</p>
        <p>Status: <strong>{score.status}</strong></p>
      </div>
    </div>
  );
};

export default LiveScore;
