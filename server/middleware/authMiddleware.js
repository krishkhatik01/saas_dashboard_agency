// /server/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // 1. जाँच करें कि Header में Bearer token है या नहीं
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // टोकन को "Bearer [Token]" स्ट्रिंग से निकालें
            token = req.headers.authorization.split(' ')[1];

            // 2. टोकन को सत्यापित (verify) करें
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. यूज़र को ढूँढें (पासवर्ड को छोड़कर) और उसे request ऑब्जेक्ट से जोड़ें
            req.user = await User.findById(decoded.id).select('-password');

            next(); // सब ठीक है, अगले फ़ंक्शन (रूट) पर जाएँ

        } catch (error) {
            console.error("JWT सत्यापन विफल:", error.message);
            res.status(401).json({ message: 'अधिकृत नहीं, टोकन विफल' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'अधिकृत नहीं, कोई टोकन नहीं' });
    }
};

module.exports = { protect };