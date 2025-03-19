import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/mapua_logo.svg';
import { Link } from 'react-router-dom';
import Validation from "./RecordsValidation";
import { client, ID } from '../lib/appwrite';
import { databases } from '../lib/appwrite';

function Validator() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        course: '',
        yearlevel: '',
        timein: '',
        timeout: '',
        date: ''
    });
    
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    

    
    // Specify your database ID and collection ID
    const DATABASE_ID = '67da128c00360aebffad'; // Replace with your actual database ID
    const COLLECTION_ID = '67da12c50024066b85ca'; // Replace with your actual collection ID
    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);
        
        const hasErrors = Object.values(validationErrors).some(error => error !== "");
        
        if (!hasErrors) {
          const dataToSend = {
            name: values.name,
            email: values.email,
            course: values.course,
            year_level: parseInt(values.yearlevel, 10) || 0, // Convert to integer, default to 0 if invalid
            time_in: values.timein,
            time_out: values.timeout,
            date: values.date
        };
        
            
            // Create document in Appwrite database
            databases.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(), // Generate a unique ID for the document
                dataToSend
            )
            .then(response => {
                console.log("Document created:", response);
                
                // Reset form fields after successful submission
                setValues({
                    name: '',
                    email: '',
                    course: '',
                    yearlevel: '',
                    timein: '',
                    timeout: '',
                    date: ''
                });
                
                navigate('/validator'); // If you want to navigate after submitting
            })
            .catch(error => {
                console.error("Error creating document:", error);
            });
        }
    };
    
    return (
        <motion.div 
            className="flex items-center justify-center min-h-screen bg-gray-900"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.5 }}
        >
            <motion.div 
                className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-md"
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.5 }}
            >
                <Link 
                    to="/login" 
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 text-center"
                >
                    ADMIN
                </Link>
                
                <div className="flex flex-col items-center mb-6">
                    <img src={logo} alt="Mapua Logo" className="h-16 mb-2" />
                    <h1 className="text-white text-2xl font-bold">MAPUA LIBRARY</h1>
                    <h2 className="text-white text-xl font-bold mt-1">Check in</h2>
                </div>
        
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input 
                            type="text" 
                            name="name" 
                            id="name"
                            value={values.name}
                            onChange={handleInput}
                            className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Enter your name"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
        
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                            E-mail
                        </label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email"
                            value={values.email}
                            onChange={handleInput}
                            className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
        
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="course">
                            Course
                        </label>
                        <input 
                            type="text" 
                            name="course" 
                            id="course"
                            value={values.course}
                            onChange={handleInput}
                            className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Enter your course code"
                        />
                        {errors.course && <p className="text-red-500 text-xs mt-1">{errors.course}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="yearlevel">
                            Year Level
                        </label>
                        <input 
                            type="number"  // Changed from "text" to "number"
                            name="yearlevel" 
                            id="yearlevel"
                            value={values.yearlevel}
                            onChange={handleInput}
                            className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Enter your Year Level"
                        />

                        {errors.yearlevel && <p className="text-red-500 text-xs mt-1">{errors.yearlevel}</p>}
                    </div>                            

                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="timein">
                            Time in
                        </label>
                        <input 
                            type="time" 
                            name="timein" 
                            id="timein"
                            value={values.timein}
                            onChange={handleInput}
                            className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        {errors.timein && <p className="text-red-500 text-xs mt-1">{errors.timein}</p>}
                    </div>     

                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="timeout">
                            Time Out
                        </label>
                        <input 
                            type="time" 
                            name="timeout" 
                            id="timeout"
                            value={values.timeout}
                            onChange={handleInput}
                            className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        {errors.timeout && <p className="text-red-500 text-xs mt-1">{errors.timeout}</p>}
                    </div>     

                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="date">
                            Date
                        </label>
                        <input 
                            type="date" 
                            name="date" 
                            id="date"
                            value={values.date}
                            onChange={handleInput}
                            className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                    </div>       
        
                    <div className="flex space-x-2 mb-4">
                        <button 
                            type="submit" 
                            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
                        >
                            Submit
                        </button>              
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}

export default Validator;