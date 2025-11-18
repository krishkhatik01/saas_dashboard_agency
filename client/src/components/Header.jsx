// /src/components/Header.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  // Level 55: यहाँ यूज़र का नाम या रोल दिखा सकते हैं
  const userName = localStorage.getItem('userName') || 'Agency User';

  const handleLogout = () => {
    localStorage.removeItem('agencyToken');
    localStorage.removeItem('userName');
    // नेविगेट करने के लिए window.location का उपयोग करें
    window.location.href = '/login'; 
  };

  return (
    <header style={headerStyle}>
      <div style={logoStyle}>
        <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
          SaaS Dashboard
        </Link>
      </div>
      <div style={navStyle}>
        <span style={{ marginRight: '15px' }}>{userName}</span>
        <button onClick={handleLogout} style={buttonStyle}>
          Logout
        </button>
      </div>
    </header>
  );
};

// --- सरल CSS स्टाइल (आप बाद में CSS फ़ाइल में बदल सकते हैं) ---
const headerStyle = {
  background: '#333',
  color: '#fff',
  padding: '10px 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '60px',
};

const logoStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
};

const navStyle = {
    display: 'flex',
    alignItems: 'center',
};

const buttonStyle = {
    padding: '8px 12px',
    backgroundColor: '#ff6347',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};

export default Header;