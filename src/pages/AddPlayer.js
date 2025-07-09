import React, { useState } from 'react';
import axios from 'axios';

const AddPlayer = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    photo: null,
    phoneNumber: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/players`, data);
      setMessage('✅ Player added successfully!');
      setFormData({ name: '', role: '', photo: null, phoneNumber: '' });
    } catch (error) {
      console.error('❌ Error adding player:', error);
      setMessage('❌ Failed to add player. Please try again.');
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
    backgroundColor: '#4CAF50',
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
      <h2 style={{ textAlign: 'center' }}>Add Player</h2>
      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Player Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <label style={labelStyle}>Role (e.g., Batsman/Bowler)</label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <label style={labelStyle}>Phone Number</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <label style={labelStyle}>Player Photo</label>
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>Add Player</button>
      </form>
      {message && <div style={messageStyle}>{message}</div>}
    </div>
  );
};

export default AddPlayer;
