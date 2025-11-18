// /server/models/Client.js

const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: true,
        unique: true
    },
    // यह क्लाइंट डेटा का मालिक कौन है (आपके agency user का ID)
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    // क्लाइंट का मुख्य KPI (उदाहरण के लिए)
    monthlyRevenue: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;