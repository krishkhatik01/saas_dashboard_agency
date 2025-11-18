// /server/routes/userRoutes.js

const express = require('express');
const { protect } = require('../middleware/authMiddleware'); // <--- मिडलवेयर आयात करें

const router = express.Router();

// यह एक सुरक्षित रूट है, जिसे केवल लॉगिन किए हुए यूज़र ही एक्सेस कर सकते हैं।
// 'protect' मिडलवेयर इस रूट पर पहुँचने से पहले चलेगा
router.get('/dashboard', protect, (req, res) => {
    // req.user ऑब्जेक्ट 'protect' मिडलवेयर द्वारा जोड़ा जाता है।
    res.json({
        message: '✅ डैशबोर्ड डेटा एक्सेस सफल!',
        user: req.user.name, // अब हम जानते हैं कि यूज़र कौन है
        role: req.user.role,
        data: "यहां क्लाइंट-स्पेसिफिक डेटा जाएगा"
    });
});

module.exports = router;