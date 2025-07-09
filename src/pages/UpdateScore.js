import React, { useState } from 'react';
import axios from 'axios';
import '../Form.css'; // Correct path

const UpdateScore = () => {
  const [formData, setFormData] = useState({
    batsman: '',
    bowler: '',
    runs: '',
    ballType: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Updating...');

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/scores/update`, formData);
      setStatus('✅ Score updated');
      setFormData({ batsman: '', bowler: '', runs: '', ballType: '' });
    } catch (err) {
      console.error(err);
      setStatus('❌ Failed to update score');
    }
  };

  return (
    <div className="form-container">
      <h2>Update Score (Admin only)</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="batsman" placeholder="Batsman Name" required onChange={handleChange} value={formData.batsman} />
        <input type="text" name="bowler" placeholder="Bowler Name" required onChange={handleChange} value={formData.bowler} />
        <input type="number" name="runs" placeholder="Runs" required onChange={handleChange} value={formData.runs} />
        <select name="ballType" required onChange={handleChange} value={formData.ballType}>
          <option value="">Select Ball Type</option>
          <option value="normal">Normal</option>
          <option value="wide">Wide</option>
          <option value="no-ball">No Ball</option>
          <option value="bye">Bye</option>
        </select>
        <button type="submit">Update</button>
      </form>
      <p>{status}</p>
    </div>
  );
};

export default UpdateScore;
