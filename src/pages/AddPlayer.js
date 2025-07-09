import React, { useState } from 'react';
import axios from 'axios';

// Correct path

const AddPlayer = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    photo: null,
    phoneNumber: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'photo' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Uploading...');

    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/players`, data);
      setStatus('✅ Player added successfully!');
      setFormData({ name: '', role: '', photo: null, phoneNumber: '' });
    } catch (err) {
      console.error(err);
      setStatus('❌ Error adding player');
    }
  };

  return (
    <div className="form-container">
      <h2>Add Player</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="name" placeholder="Name" required onChange={handleChange} />
        <input type="text" name="role" placeholder="Role (Batsman/Bowler/Allrounder)" required onChange={handleChange} />
        <input type="text" name="phoneNumber" placeholder="Phone Number" required onChange={handleChange} />
        <input type="file" name="photo" accept="image/*" required onChange={handleChange} />
        <button type="submit">Add</button>
      </form>
      <p>{status}</p>
    </div>
  );
};

export default AddPlayer;

