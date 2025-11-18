const mongoose = require('mongoose');

// डेटाबेस से जुड़ने का पुन: प्रयोज्य फ़ंक्शन
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        
        // सफलतापूर्वक जुड़ने पर जानकारी दें
        console.log(`✅ MongoDB से सफलतापूर्वक जुड़े: ${conn.connection.host}`);
    } catch (error) {
        // त्रुटि होने पर जानकारी दें और सर्वर बंद करें
        console.error(`❌ MongoDB कनेक्शन त्रुटि: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;