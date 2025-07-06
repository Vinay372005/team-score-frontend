import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Team from './pages/Team';
import AddPlayer from './pages/AddPlayer';
import UpdateScore from './pages/UpdateScore';

const App = () => {
  return (
    <BrowserRouter>
      <nav style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
        <Link to="/">Live Score</Link>
        <Link to="/team">Team</Link>
        <Link to="/add-player">Add Player</Link>
        <Link to="/update-score">Admin</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<Team />} />
        <Route path="/add-player" element={<AddPlayer />} />
        <Route path="/update-score" element={<UpdateScore />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
