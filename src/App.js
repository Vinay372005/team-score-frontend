import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddPlayer from './AddPlayer';
import UpdateScore from './UpdateScore';
import LiveScore from './LiveScore';
import Team from './Team';

const App = () => {
  return (
    <Router>
      <nav style={{ backgroundColor: "#003366", padding: "1rem" }}>
        <Link to="/" style={linkStyle}>🏏 Live Score</Link>
        <Link to="/add-player" style={linkStyle}>➕ Add Player</Link>
        <Link to="/update-score" style={linkStyle}>✏️ Update Score</Link>
        <Link to="/team" style={linkStyle}>👥 Team</Link>
      </nav>
      <Routes>
        <Route path="/" element={<LiveScore />} />
        <Route path="/add-player" element={<AddPlayer />} />
        <Route path="/update-score" element={<UpdateScore />} />
        <Route path="/team" element={<Team />} />
      </Routes>
      <footer style={{ textAlign: "center", marginTop: "2rem", padding: "1rem", backgroundColor: "#f0f0f0" }}>
        Made with ❤️ by Vinay
      </footer>
    </Router>
  );
};

const linkStyle = {
  color: "white",
  marginRight: "1.5rem",
  textDecoration: "none",
  fontWeight: "bold"
};

export default App;
