// /server/models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'कृपया नाम दर्ज करें']
    },
    email: {
        type: String,
        required: [true, 'कृपया ईमेल दर्ज करें'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'कृपया पासवर्ड दर्ज करें'],
        minlength: 8,
        select: false // सुरक्षा के लिए
    },
    role: {
        type: String,
        enum: ['admin', 'client'],
        default: 'client'
    }
}, { timestamps: true });

// Pre-save Hook: सेव करने से पहले पासवर्ड को हैश करें
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Inst. Method: लॉगिन के लिए पासवर्ड की तुलना
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;