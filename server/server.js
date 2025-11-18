// /server/server.js

// 1. आवश्यक Imports
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors'); 
const connectDB = require('./config/db');

// Routes Imports (Level 21 - Level 70)
const authRoutes = require('./routes/authRoutes');     // Login, Register
const userRoutes = require('./routes/userRoutes');     // Protected User Data (Dashboard)
const dataRoutes = require('./routes/dataRoutes');     // Sales Data (Charts)
const clientRoutes = require('./routes/clientRoutes'); // Client Management (Admin only)


// 2. पर्यावरण वैरिएबल लोड करें
dotenv.config();

// 3. डेटाबेस से कनेक्ट करें
connectDB();

// 4. एक्सप्रेस एप्लिकेशन इनिशियलाइज़ करें
const app = express();

// 5. बुनियादी मिडलवेयर
app.use(express.json()); // JSON बॉडी parsing
app.use(cors());         // CORS को सक्षम करें

// 6. रूट्स को माउंट करें (Mount Routes)
app.use('/api/auth', authRoutes);   // पब्लिक रूट्स
app.use('/api/users', userRoutes);   // सुरक्षित यूज़र डेटा
app.use('/api/data', dataRoutes);     // सुरक्षित सेल्स डेटा
app.use('/api/clients', clientRoutes); // सुरक्षित क्लाइंट मैनेजमेंट


// 7. बेस रूट (स्टेटस चेक)
app.get('/api/status', (req, res) => {
    res.json({ 
        message: '🚀 सर्वर चल रहा है!', 
        databaseStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

// 8. सर्वर पोर्ट पर सुनें
const PORT = process.env.PORT || 5000;

app.listen(PORT, '127.0.0.0.1', () => {
    console.log(`🌍 Server running on 127.0.0.1:${PORT}.`);
});