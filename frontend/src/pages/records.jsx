import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/mapua_logo.svg';
import './Records.css';
import CsvDownloader from 'react-csv-downloader';

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
                            <CsvDownloader 
                                filename="student_records.csv"
                                extension=".csv"
                                separator=","
                                wrapColumnChar='"'
                                columns={[
                                    { id: 'id', displayName: 'ID' },
                                    { id: 'name', displayName: 'Name' },
                                    { id: 'email', displayName: 'Email' },
                                    { id: 'course', displayName: 'Course' },
                                    { id: 'year_level', displayName: 'Year Level' },
                                    { id: 'time_in', displayName: 'Time In' },
                                    { id: 'time_out', displayName: 'Time Out' },
                                    { id: 'date', displayName: 'Date' }
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