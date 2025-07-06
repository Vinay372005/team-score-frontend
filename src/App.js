import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Team from './pages/Team';
import AddPlayer from './pages/AddPlayer';
import UpdateScore from './pages/UpdateScore';
import './App.css'; // styling here

const App = () => {
  return (
    <BrowserRouter>
      <div className="main-wrapper">
        <nav className="navbar">
          <Link to="/">🏏 Live Score</Link>
          <Link to="/team">👥 Team</Link>
          <Link to="/add-player">➕ Add Player</Link>
          <Link to="/update-score">🛠️ Admin</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/add-player" element={<AddPlayer />} />
          <Route path="/update-score" element={<UpdateScore />} />
        </Routes>

        <footer className="footer">
          Made with ❤️ by <strong>Vinay</strong>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
