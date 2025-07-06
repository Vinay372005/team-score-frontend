import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [score, setScore] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/scores`)
      .then(res => setScore(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h2 style={{ fontWeight: "bold", fontSize: "24px", marginBottom: "1rem" }}>
        🏏 Live Match Score
      </h2>

      {score ? (
        <div style={{
          backgroundColor: "#ffffff",
          padding: "1rem",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          fontSize: "18px"
        }}>
          <p><strong>{score.runs}/{score.wickets}</strong> in <strong>{score.overs}</strong> overs</p>
          <p>Status: <strong>{score.status}</strong></p>
        </div>
      ) : (
        <p>Loading score...</p>
      )}
    </div>
  );
};

export default Home;
