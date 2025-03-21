import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/mapua_logo.svg';
import './Records.css';
import CsvDownloader from 'react-csv-downloader';
import { databases, Query } from '../lib/appwrite'; // Import from your appwrite config file

function Records() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        // Start fade in animation after component mounts
        setFadeIn(true);
        
        // Fetch data from Appwrite
        const fetchRecords = async () => {
            try {
                setLoading(true);
                
                // Replace these with your actual Appwrite database and collection IDs
                const databaseId = '67da128c00360aebffad';
                const collectionId = '67da12c50024066b85ca'; // Your collection ID
                
                const response = await databases.listDocuments(
                    databaseId,
                    collectionId,
                    [
                        // Optional: Add queries if needed
                        // Query.orderDesc('date'),
                        // Query.limit(100)
                    ]
                );
                
                console.log("Fetched Data:", response.documents);
                setData(response.documents);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching records:", error);
                setLoading(false);
            }
        };
        
        fetchRecords();
    }, []);
    
    const filteredData = data.filter(record => 
        record.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.course?.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
            to="/Percourse" 
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
                                            <tr key={d.$id || index} className="table-row-fade">

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

export default Records;