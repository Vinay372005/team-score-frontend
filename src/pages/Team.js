import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Team = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/players`)
      .then(res => setPlayers(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Team Members</h2>
      <div>
        {players.map(player => (
          <div key={player._id} style={{ margin: "1rem 0" }}>
            <img src={player.photoURL} alt={player.name} width="100" />
            <p><strong>{player.name}</strong> - {player.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
