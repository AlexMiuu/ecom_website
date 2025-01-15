// src/pages/AccountPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Account.css'; // Import the CSS file

function Account() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    shipmentAddress: '',
    // Add other fields as necessary
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/auth/user', { // Adjust endpoint as necessary
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData({
          username: response.data.username,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber || '',
          shipmentAddress: response.data.shipmentAddress || '',
          // Populate other fields
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUserData({ 
      ...userData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('/api/auth/user', userData, { // Adjust endpoint as necessary
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage('Account updated successfully!');
    } catch (error) {
      console.error('Error updating account:', error);
      setMessage('Failed to update account. Please try again.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="account-page">
      <h2>My Account</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input 
            type="text" 
            name="username" 
            value={userData.username} 
            onChange={handleChange} 
            required 
          />
        </label>

        <label>
          Email:
          <input 
            type="email" 
            name="email" 
            value={userData.email} 
            onChange={handleChange} 
            required 
          />
        </label>

        <label>
          Phone Number:
          <input 
            type="tel" 
            name="phoneNumber" 
            value={userData.phoneNumber} 
            onChange={handleChange} 
          />
        </label>

        <label>
          Shipment Address:
          <textarea 
            name="shipmentAddress" 
            value={userData.shipmentAddress} 
            onChange={handleChange} 
          />
        </label>

        {/* Add other fields as necessary */}

        <button type="submit">Update Account</button>
      </form>
    </div>
  );
}

export default Account;
