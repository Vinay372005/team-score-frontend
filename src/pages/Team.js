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
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      <h2 style={{ fontWeight: "bold", fontSize: "24px", marginBottom: "1rem" }}>👥 Team Members</h2>

      {players.length > 0 ? (
        players.map(player => (
          <div key={player._id} style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
            backgroundColor: "#fff",
            padding: "1rem",
            borderRadius: "10px",
            boxShadow: "0 0 8px rgba(0,0,0,0.1)"
          }}>
            <img src={player.photoURL} alt={player.name} width="80" height="80" style={{ borderRadius: "50%", marginRight: "1rem" }} />
            <div>
              <p style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>{player.name}</p>
              <p style={{ margin: 0 }}>{player.role}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No players added yet.</p>
      )}
    </div>
  );
};

export default Team;
