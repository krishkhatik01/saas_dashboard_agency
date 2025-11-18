// /server/routes/dataRoutes.js

const express = require('express');
const { protect } = require('../middleware/authMiddleware'); // सुरक्षा लागू करें
const { getSalesData } = require('../controllers/dataController');

const router = express.Router();

// यह रूट सुरक्षित है और केवल टोकन के साथ एक्सेस किया जा सकता है
router.route('/sales').get(protect, getSalesData);

module.exports = router;