import React, { useState } from 'react';
import { login } from '../api/api'; // Import the login function from the API module
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('api/auth/login', { email, password });
     //  const data = await login(email, password); // Call the backend login API
      //console.log('Login successful:', data);
      //localStorage.setItem('token', data.token); // Save the token to localStorage
      //localStorage.setItem('isAdmin', data.isAdmin);
      localStorage.setItem('token', response.data.token);
            localStorage.setItem('isAdmin', response.data.isAdmin);
      setError(null); // Clear any previous errors
      // Redirect or update the UI as needed after successful login
      if (response.data.isAdmin) {
        navigate('/admin');
    } else {
        navigate('/');
    }
    } catch (err) {
      setError(err.message || 'Failed to log in. Please try again.');
    }
  };


  
  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Access your account</p>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">Log In</button>
        </form>
        {error && <p className="login-error">{error}</p>} {/* Display error message */}
        <div className="login-footer">
          <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
