// /client/src/components/ClientListPage.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClientListPage = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClients = async () => {
            const token = localStorage.getItem('agencyToken');
            if (!token) {
                setError("Login required.");
                setLoading(false);
                return;
            }

            try {
                // /api/clients रूट पर GET अनुरोध
                const response = await axios.get('/api/clients', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setClients(response.data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch clients.");
            } finally {
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

    if (loading) return <div style={{padding: '20px'}}>क्लाइंट्स लोड हो रहे हैं...</div>;
    if (error) return <div style={{padding: '20px', color: 'red'}}>त्रुटि: {error}</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>सभी क्लाइंट्स ({clients.length})</h1>
            <p>यह पेज केवल एडमिन यूज़र के लिए दिखना चाहिए।</p>
            
            {clients.length === 0 ? (
                <p>कोई क्लाइंट नहीं मिला। एक नया क्लाइंट बनाएँ।</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {clients.map(client => (
                        <li key={client._id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
                            <strong>{client.clientName}</strong> - Revenue: ${client.monthlyRevenue}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ClientListPage;