// /client/src/App.jsx

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LoginPage from './components/LoginPage'; 
import DashboardPage from './components/DashboardPage'; 
import ClientListPage from './components/ClientListPage'; // <--- नया आयात


// Root कॉम्पोनेंट
function App() {
  const location = useLocation(); // वर्तमान URL पथ प्राप्त करने के लिए

  // यह लॉजिक चेक करता है कि वर्तमान रूट लॉगिन पेज है या होम पेज है या नहीं।
  // इन पेजों पर Sidebar और padding की आवश्यकता नहीं होती।
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/';


  return (
    <Router>
      <Header /> 
      
      {/* Sidebar केवल तभी दिखाएं जब यूज़र डैशबोर्ड या क्लाइंट्स पेज पर हो */}
      {!isAuthRoute && <Sidebar />} 
      
      {/* मुख्य सामग्री क्षेत्र। Sidebar होने पर बाईं ओर 220px का मार्जिन जोड़ता है */}
      <div style={{ marginLeft: isAuthRoute ? 0 : '220px', paddingTop: '60px' }}>
        <Routes>
          {/* होम पेज */}
          <Route path="/" element={<h1>एजेंसी डैशबोर्ड होम</h1>} />
          
          {/* लॉगिन पेज */}
          <Route path="/login" element={<LoginPage />} /> 
          
          {/* डैशबोर्ड पेज */}
          <Route path="/dashboard" element={<DashboardPage />} /> 

          {/* क्लाइंट लिस्ट पेज (Level 75) */}
          <Route path="/clients" element={<ClientListPage />} /> 
        </Routes>
      </div>
    </Router>
  );
}

// Browser Router के साथ App कॉम्पोनेंट को रैप करें ताकि 'useLocation' काम कर सके
function Root() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default Root;