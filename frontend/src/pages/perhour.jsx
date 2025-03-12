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
        fetch('http://localhost:8081/userperhour')
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
      <header className="bg-red-800 text-yellow-500 py-4 px-6 flex justify-between items-center">
        <h1 className="font-serif font-bold text-3xl md:text-4xl">MAPUA MAKATI LIBRARY</h1>
        <nav className="flex gap-6">
            <Link 
            to="/home" 
            className="font-medium hover:underline text-lg text-decoration-none"
          >
            <p className="text-yellow-500 ">Home</p>
          </Link>
          <Link 
            to="/" 
            className="font-medium hover:underline text-lg text-decoration-none"
          >
            <p className="text-yellow-500 ">Per Program</p>
          </Link>
          <Link 
            to="/" 
            className="font-medium hover:underline text-lg text-decoration-none"
          >
            <p className="text-yellow-500 ">Per Hour</p>
          </Link>
          <Link 
            to="/records" 
            className="font-medium hover:underline text-lg text-decoration-none"
          >
            <p className="text-yellow-500 ">Student log</p>
          </Link>
        </nav>
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
                                        <th>Date</th>
                                        <th>Time Range</th>
                                        <th>ABM</th>
                                        <th>ACMAN</th>
                                        <th>ADA</th>
                                        <th>AMPSY</th>
                                        <th>BIO</th>
                                        <th>BMCS</th>
                                        <th>CS</th>
                                        <th>CE</th>
                                        <th>CS_O</th>
                                        <th>IE</th>
                                        <th>IE_O</th>
                                        <th>IS</th> 
                                        <th>IT</th>
                                        <th>GrandTotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.length > 0 ? (
                                        filteredData.map((d, index) => (
                                            <tr key={index}>
                                                <td>{d.Date}</td>
                                                <td>{d.TimeRange}</td>
                                                <td>{d.ABM}</td>
                                                <td>{d.ACMAN}</td>
                                                <td>{d.ADA}</td>
                                                <td>{d.AMPSY}</td>
                                                <td>{d.BIO}</td>
                                                <td>{d.BMCS}</td>
                                                <td>{d.CS}</td>
                                                <td>{d.CE}</td>
                                                <td>{d.CS_O}</td>
                                                <td>{d.IE}</td>
                                                <td>{d.IE_O}</td>
                                                <td>{d.IS}</td>
                                                <td>{d.IT}</td>
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
                        <Link to="https://library.mapua.edu.ph/About/Default.aspx" className="footer-link">About</Link>
                    </div>
                    <div className="footer-right">
                        <Link to="/login" className="footer-link">Sign Out</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Records;