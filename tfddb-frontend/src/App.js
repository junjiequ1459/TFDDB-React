// App.js
import React, { useState } from 'react';
import './App.css';

// Use the secure base URL and correct function path
const BASE_URL = 'https://tfddb-fraacnc0b8a3dcfh.eastus2-01.azurewebsites.net';


function App() {
    const [username, setUsername] = useState('');
    const [ouid, setOuid] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setOuid(null);
        if (!username) return;

        const encoded = encodeURIComponent(username);
        try {
            const response = await fetch(
                `${BASE_URL}/api/tfd/ouid?user_name=${encoded}`
            );
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            setOuid(data.ouid);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="app-container">
            <h1>Search OUID</h1>
            <form onSubmit={handleSubmit} className="search-form">
                <input
                    type="text"
                    placeholder="Enter username (e.g., RexQu#1629)"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="search-input"
                />
                <button type="submit" className="search-button">
                    Search
                </button>
            </form>
            {error && <div className="error">Error: {error}</div>}
            {ouid && <div className="result">OUID: {ouid}</div>}
        </div>
    );
}

export default App;