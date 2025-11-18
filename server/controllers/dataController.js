// /server/controllers/dataController.js

// डमी डेटा (असल डेटाबेस से डेटा आने तक इसका उपयोग करें)
const liveData = [
    { name: 'Jan', Sales: 6500, Users: 3200 },
    { name: 'Feb', Sales: 4200, Users: 2100 },
    { name: 'Mar', Sales: 7800, Users: 10500 }, // Peak performance!
    { name: 'Apr', Sales: 5100, Users: 4900 },
    { name: 'May', Sales: 5900, Users: 5500 },
    { name: 'Jun', Sales: 6100, Users: 6000 },
];

// @desc    डैशबोर्ड के लिए लाइव बिक्री डेटा प्राप्त करें
// @route   GET /api/data/sales
// @access  Private (JWT Protect)
exports.getSalesData = async (req, res) => {
    // यहाँ आप MongoDB से जटिल Aggregation Query चला सकते हैं
    // लेकिन अभी के लिए, हम डमी डेटा वापस भेजते हैं
    res.json(liveData);
};