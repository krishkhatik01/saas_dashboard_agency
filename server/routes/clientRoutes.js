// /server/routes/clientRoutes.js

const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getClients, createClient } = require('../controllers/clientController');

const router = express.Router();

router.route('/')
    .get(protect, getClients)    // GET: सभी क्लाइंट्स
    .post(protect, createClient); // POST: नया क्लाइंट बनाएँ

module.exports = router;