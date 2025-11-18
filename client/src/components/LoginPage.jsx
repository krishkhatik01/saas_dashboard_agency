// /client/src/components/LoginPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // 🚀 Level 45 Fix: Check if the user is already logged in (token exists) and redirect
  useEffect(() => {
    const token = localStorage.getItem('agencyToken');
    if (token) {
      navigate('/dashboard'); 
    }
  }, [navigate]); // navigate dependency is required by React

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      // 1. API Call: Axios uses the Vite proxy to hit http://127.0.0.1:5000/api/auth/login
      const response = await axios.post('/api/auth/login', { email, password });
      
      const { token, name } = response.data;

      // 2. Token Storage: Save the JWT token and user name to browser storage
      localStorage.setItem('agencyToken', token);
      localStorage.setItem('userName', name);

      console.log('Login Successful:', name);
      
      // 3. Redirection: Navigate the user to the protected dashboard
      navigate('/dashboard');

    } catch (err) {
      // Handle 401 Unauthorized or network errors (like the ERR_CONNECTION_REFUSED)
      const errorMessage = err.response?.data?.message || 'Login failed. Please check the network.';
      setError(errorMessage);
    }
  };

  return (
    <div className="login-container" style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Agency Login</h2>
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>} {/* Error Display */}
      <form onSubmit={submitHandler}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
          />
        </div>
        <button 
          type="submit" 
          style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Log In
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default LoginPage;