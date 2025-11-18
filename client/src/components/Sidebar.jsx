// /src/components/Sidebar.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div style={sidebarStyle}>
            <div style={menuHeaderStyle}>Menu</div>
            <Link to="/dashboard" style={linkStyle}>
                Dashboard
            </Link>
            <Link to="/clients" style={linkStyle}>
                Clients (Level 65)
            </Link>
            <Link to="/reports" style={linkStyle}>
                Reports (Level 65)
            </Link>
        </div>
    );
};

// --- सरल CSS स्टाइल ---
const sidebarStyle = {
    width: '220px',
    background: '#2c3e50', // Darker background
    color: '#ecf0f1',
    height: 'calc(100vh - 60px)', // Full height minus header
    paddingTop: '20px',
    position: 'fixed',
    top: '60px', // Below the header
};

const menuHeaderStyle = {
    padding: '0 15px 15px 15px',
    fontSize: '18px',
    fontWeight: 'bold',
    borderBottom: '1px solid #34495e',
    marginBottom: '15px',
};

const linkStyle = {
    display: 'block',
    padding: '10px 15px',
    color: '#ecf0f1',
    textDecoration: 'none',
    transition: 'background 0.3s',
};

export default Sidebar;