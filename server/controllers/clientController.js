// /server/controllers/clientController.js

const Client = require('../models/Client');

// @desc    सभी क्लाइंट्स प्राप्त करें (केवल Admin के लिए)
// @route   GET /api/clients
// @access  Private/Admin
exports.getClients = async (req, res) => {
    // सुरक्षा: सुनिश्चित करें कि केवल 'admin' ही इस रूट को एक्सेस कर सकता है
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'केवल एडमिन ही क्लाइंट्स को देख सकते हैं' });
    }
    
    try {
        const clients = await Client.find({}).select('-owner');
        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: 'सर्वर त्रुटि' });
    }
};

// @desc    नया क्लाइंट बनाएँ (केवल Admin के लिए)
// @route   POST /api/clients
// @access  Private/Admin
exports.createClient = async (req, res) => {
    // सुरक्षा: केवल एडमिन ही क्लाइंट बना सकता है
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'केवल एडमिन ही क्लाइंट्स बना सकते हैं' });
    }
    
    const { clientName, monthlyRevenue } = req.body;
    
    try {
        const client = await Client.create({
            clientName,
            monthlyRevenue,
            owner: req.user._id // क्लाइंट बनाने वाले एडमिन को मालिक सेट करें
        });
        res.status(201).json(client);
    } catch (error) {
        res.status(400).json({ message: 'अमान्य डेटा या क्लाइंट नाम पहले से मौजूद है' });
    }
};