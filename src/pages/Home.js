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
    <div style={{ padding: "1rem" }}>
      <h2>Live Match Score</h2>
      {score ? (
        <p>{score.runs}/{score.wickets} in {score.overs} overs ({score.status})</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Home;
