import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/mapua_logo.svg';
import './records.css';
import CsvDownloader from 'react-csv-downloader';


function perhour() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        // Start fade in animation after component mounts
        setFadeIn(true);
        
        setLoading(true);
        fetch('http://localhost:8081/userperhour')
            .then(res => res.json())
            .then(data => {
                // Debug the exact structure
                console.log("Sample data:", JSON.stringify(data[0], null, 2));
                console.log("Data keys:", Object.keys(data[0]));
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Fetch error:", err);
                setLoading(false);
            });
    }, []);
    
    // First, update your filter logic to match your actual data fields:
    const filteredData = searchTerm === '' ? data : data.filter(record => 
        // Search in fields that actually exist in your data
        (record.TimeRange && record.TimeRange.toLowerCase().includes(searchTerm.toLowerCase())) ||
        String(record.ABM).includes(searchTerm) ||
        String(record.ACMAN).includes(searchTerm) ||
        String(record.ADA).includes(searchTerm) ||
        // Add other fields as needed
        String(record.GrandTotal).includes(searchTerm)
    );
    console.log("Filtered data for rendering:", filteredData);
    
    return (
        <div className={`records-page ${fadeIn ? 'fade-in' : ''}`}>
            {/* Navigation Bar */}
            <header className="bg-red-800 text-yellow-500 py-4 px-6 flex justify-between items-center fade-in-element">
                <h1 className="font-serif font-bold text-3xl md:text-4xl">MAPUA MAKATI LIBRARY</h1>
                <nav className="flex gap-6">
                    <Link 
                        to="/home" 
                        className="font-medium hover:underline text-lg text-decoration-none"
                    >
                        <p className="text-yellow-500 ">Home</p>
                    </Link>
                    <Link 
                        to="/percourse" 
                        className="font-medium hover:underline text-lg text-decoration-none"
                    >
                        <p className="text-yellow-500 ">Per Program</p>
                    </Link>
                    <Link 
                        to="/perhour" 
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
            <div className="records-content fade-in-element">
                <div className="records-container">
                    <h2 className="records-title">Student Records</h2>
                    
                    <div className="search-bar fade-in-element">
                        <input 
                            type="text" 
                            placeholder="Search by name, email, or course..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    {loading ? (
                        <div className="loading fade-in-element">Loading records...</div>
                    ) : (
                        <div className={`table-container fade-in-element ${searchTerm ? 'fade-update' : ''}`}>
                            
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
                                        <tr key={index} className="table-row-fade">
                                            <td>{new Date(d.date || d.Date).toLocaleDateString()}</td>
                                            <td className="year-cell">{d.TimeRange}</td>
                                            <td className="year-cell">{parseInt(d.ABM) || 0}</td>
                                            <td className="year-cell">{parseInt(d.ACMAN) || 0}</td>
                                            <td className="year-cell">{parseInt(d.ADA) || 0}</td>
                                            <td className="year-cell">{parseInt(d.AMPSY) || 0}</td>
                                            <td className="year-cell">{parseInt(d.BIO) || 0}</td>
                                            <td className="year-cell">{parseInt(d.BMCS) || 0}</td>
                                            <td className="year-cell">{parseInt(d.CS) || 0}</td>
                                            <td className="year-cell">{parseInt(d.CE) || 0}</td>
                                            <td className="year-cell">{parseInt(d.CS_O) || 0}</td>
                                            <td className="year-cell">{parseInt(d.IE) || 0}</td>
                                            <td className="year-cell">{parseInt(d.IE_O) || 0}</td>
                                            <td className="year-cell">{parseInt(d.IS) || 0}</td>
                                            <td className="year-cell">{parseInt(d.IT) || 0}</td>
                                            <td className="year-cell">{parseInt(d.GrandTotal) || 0}</td>
                                        </tr>    
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="16" className="no-records">No records found</td>
                                    </tr>
                                )}

                                </tbody>
                            </table>
                            <CsvDownloader 
                                filename="student_perhour.csv"
                                extension=".csv"
                                separator=","
                                wrapColumnChar='"'
                                columns={[
                                    { id: 'date', displayName: 'Date' },
                                    { id: 'TimeRange', displayName: 'TimeRange' },
                                    { id: 'ABM', displayName: 'ABM' },
                                    { id: 'ACMAN', displayName: 'ACMAN' },
                                    { id: 'AMPSY', displayName: 'AMPSY' },
                                    { id: 'BIO', displayName: 'BIO' },
                                    { id: 'BMCS', displayName: 'BMCS' },
                                    { id: 'CS', displayName: 'CS' },
                                    { id: 'CE', displayName: 'CE' },
                                    { id: 'CS_O', displayName: 'CS_O' },
                                    { id: 'IE', displayName: 'IE' },
                                    { id: 'IE_O', displayName: 'IE_O' },
                                    { id: 'IS', displayName: 'IS' },
                                    { id: 'IT', displayName: 'AITBM' },
                                    { id: 'GrandTotal', displayName: 'GrandTotal' },
                                ]}
                                datas={filteredData.map(record => ({
                                    ...record,
                                    date: new Date(record.date).toLocaleDateString()
                                }))} 
                            >
                                <button className="mt-4 w-full px-6 py-3 bg-yellow-500 text-black font-semibold rounded-b-lg shadow-md hover:bg-yellow-400 transition duration-300">
                                    Download CSV
                                </button>
                            </CsvDownloader>                            
                        </div>
                    )}
                    
                    <div className="records-footer-stats fade-in-element">
                        <p>Total Records: {filteredData.length}</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="site-footer fade-in-element">
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

export default perhour;