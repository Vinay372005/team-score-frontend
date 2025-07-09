import React, { useState } from 'react';
import axios from 'axios';

const UpdateScore = () => {
  const [formData, setFormData] = useState({
    batsman: '',
    bowler: '',
    runs: '',
    ballType: '',
    over: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/score/update`, formData);
      setMessage('✅ Score updated successfully!');
      setFormData({ batsman: '', bowler: '', runs: '', ballType: '', over: '' });
    } catch (error) {
      console.error('❌ Error updating score:', error);
      setMessage('❌ Failed to update score. Please try again.');
    }
  };

  const containerStyle = {
    maxWidth: '400px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: '#f7f7f7',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '0.5rem 0 1rem',
    border: '1px solid #ccc',
    borderRadius: '8px'
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#2196F3',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  };

  const labelStyle = {
    fontWeight: 'bold'
  };

  const messageStyle = {
    marginTop: '1rem',
    color: message.includes('success') ? 'green' : 'red',
    textAlign: 'center'
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center' }}>Update Score</h2>
      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Batsman Name</label>
        <input
          type="text"
          name="batsman"
          value={formData.batsman}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <label style={labelStyle}>Bowler Name</label>
        <input
          type="text"
          name="bowler"
          value={formData.bowler}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <label style={labelStyle}>Runs</label>
        <input
          type="number"
          name="runs"
          value={formData.runs}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <label style={labelStyle}>Ball Type (Normal, Wide, No Ball)</label>
        <input
          type="text"
          name="ballType"
          value={formData.ballType}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <label style={labelStyle}>Over Number</label>
        <input
          type="text"
          name="over"
          value={formData.over}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>Submit</button>
      </form>
      {message && <div style={messageStyle}>{message}</div>}
    </div>
  );
};

export default UpdateScore;
