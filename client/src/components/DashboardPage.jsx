// /client/src/components/DashboardPage.jsx (Level 55: Data Visualization Added)

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'; // <--- Recharts आयात करें

// अस्थाई डेटा (Dummy Data)
const mockData = [
  { name: 'Jan', Sales: 4000, Users: 2400 },
  { name: 'Feb', Sales: 3000, Users: 1398 },
  { name: 'Mar', Sales: 2000, Users: 9800 },
  { name: 'Apr', Sales: 2780, Users: 3908 },
];

// /client/src/components/DashboardPage.jsx (अंतिम अपडेट)

// ... पुराने imports और mockData को रहने दें ...

// const mockData... (इसे डिलीट न करें, यह फ़ॉलबैक के लिए अच्छा है)

const DashboardPage = () => {
    const [chartData, setChartData] = useState(mockData); // नया स्टेट
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            const token = localStorage.getItem('agencyToken');

            if (!token) { 
                setLoading(false);
                return; 
            }

            try {
                // 🚀 नया API कॉल: /api/data/sales (सुरक्षित रूट)
                const response = await axios.get('/api/data/sales', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // चार्ट डेटा को लाइव डेटा से अपडेट करें
                setChartData(response.data); 
            } catch (error) {
                console.error("Failed to fetch live data.");
                // विफलता पर डमी डेटा का उपयोग करें
                setChartData(mockData); 
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <div style={{padding: '20px'}}>डैशबोर्ड लोड हो रहा है...</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>डैशबोर्ड में आपका स्वागत है!</h1>
            
            {/* ... Chart Visualization Code (data={chartData} का उपयोग करें) ... */}
            <div style={{ width: '100%', height: 300, marginTop: '20px' }}>
                <h3>मासिक बिक्री और यूज़र (लाइव डेटा)</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        {/* ... Rest of BarChart components remain the same ... */}
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Sales" fill="#8884d8" />
                        <Bar dataKey="Users" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            
            {/* ... Logout Button ... */}
        </div>
    );
};

export default DashboardPage;