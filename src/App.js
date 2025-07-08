// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddPlayer from './pages/AddPlayer';
import LiveScore from './pages/LiveScore';
import Team from './pages/Team';
import UpdateScore from './pages/UpdateScore';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <h2>🏏 My Cricket Team</h2>
          <ul className="nav-links">
            <li><Link to="/">Live Score</Link></li>
            <li><Link to="/add">Add Player</Link></li>
            <li><Link to="/team">Team</Link></li>
            <li><Link to="/update">Update Score</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<LiveScore />} />
          <Route path="/add" element={<AddPlayer />} />
          <Route path="/team" element={<Team />} />
          <Route path="/update" element={<UpdateScore />} />
        </Routes>

        <footer className="footer">
          <p>Made by Vinay © 2025</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
