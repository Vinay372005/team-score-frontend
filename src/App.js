import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddPlayer from './pages/AddPlayer';
import Team from './pages/Team';
import LiveScore from './pages/LiveScore';
import UpdateScore from './pages/UpdateScore';

const App = () => {
  const navStyle = {
    backgroundColor: '#2c3e50',
    padding: '1rem',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  };

  const navLinks = {
    display: 'flex',
    gap: '1rem',
    listStyleType: 'none',
    padding: 0,
  };

  const footerStyle = {
    backgroundColor: '#2c3e50',
    color: 'white',
    textAlign: 'center',
    padding: '0.5rem',
    marginTop: '2rem'
  };

  return (
    <Router>
      <div>
        <nav style={navStyle}>
          <h2>🏏 My Cricket Team</h2>
          <ul style={navLinks}>
            <li><Link style={{ color: 'white', textDecoration: 'none' }} to="/">Live Score</Link></li>
            <li><Link style={{ color: 'white', textDecoration: 'none' }} to="/add">Add Player</Link></li>
            <li><Link style={{ color: 'white', textDecoration: 'none' }} to="/team">Team</Link></li>
            <li><Link style={{ color: 'white', textDecoration: 'none' }} to="/update">Update Score</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<LiveScore />} />
          <Route path="/add" element={<AddPlayer />} />
          <Route path="/team" element={<Team />} />
          <Route path="/update" element={<UpdateScore />} />
        </Routes>

        <footer style={footerStyle}>
          <p>Made by Vinay © 2025</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
