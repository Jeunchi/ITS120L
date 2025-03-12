import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/mapua_logo.svg';
import './Records.css';

function Records() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:8081/records')
            .then(res => res.json())
            .then(data => {
                console.log("Fetched Data:", data);
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                console.log("Fetch error:", err);
                setLoading(false);
            });
    }, []);
    
    const filteredData = data.filter(record => 
        record.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.course?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="records-page">
            {/* Navigation Bar */}
            <header className="nav-header">
                <div className="nav-container">
                    <h1 className="nav-title">MAPUA MAKATI LIBRARY</h1>
                    <nav className="nav-links">
                        <Link to="/records" className="nav-link active">Records</Link>
                        <Link to="/validator" className="nav-link">Validator</Link>
                    </nav>
                </div>
            </header>

            {/* Main content area */}
            <div className="records-content">
                <div className="records-container">
                    <h2 className="records-title">Student Records</h2>
                    
                    <div className="search-bar">
                        <input 
                            type="text" 
                            placeholder="Search by name, email, or course..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    {loading ? (
                        <div className="loading">Loading records...</div>
                    ) : (
                        <div className="table-container">
                            <table className="records-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Course</th>
                                        <th>Year Level</th> 
                                        <th>Time In</th>
                                        <th>Time Out</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.length > 0 ? (
                                        filteredData.map((d, index) => (
                                            <tr key={index}>
                                                <td>{d.id}</td>
                                                <td className="name-cell">{d.name}</td>
                                                <td>{d.email}</td>
                                                <td>{d.course}</td>
                                                <td className="year-cell">{d.year_level}</td> 
                                                <td>{d.time_in}</td>
                                                <td>{d.time_out}</td>
                                                <td>{new Date(d.date).toLocaleDateString()}</td>
                                            </tr>    
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="no-records">No records found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                    
                    <div className="records-footer-stats">
                        <p>Total Records: {filteredData.length}</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="site-footer">
                <div className="footer-container">
                    <div className="footer-left">
                        <Link to="/about" className="footer-link">About</Link>
                    </div>
                    <div className="footer-right">
                        <Link to="/logout" className="footer-link">Sign Out</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Records;