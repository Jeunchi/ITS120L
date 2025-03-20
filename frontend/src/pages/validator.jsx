import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/mapua_logo.svg';
import { Link } from 'react-router-dom';
import Validation from "./RecordsValidation";
import { client, ID } from '../lib/appwrite';
import { databases, Query } from '../lib/appwrite';

function Validator() {
    const [values, setValues] = useState({
        studentNumber: '',
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
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [existingDocId, setExistingDocId] = useState(null);
    const [formState, setFormState] = useState('initial'); // 'initial', 'checkin', 'checkout'
    
    // Specify your database ID and collection IDs
    const DATABASE_ID = '67da128c00360aebffad';
    const ATTENDANCE_COLLECTION_ID = '67da12c50024066b85ca';
    const STUDENT_INFO_COLLECTION_ID = '67db5798003af10f90dc';
    
    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };
    
    // Function to format current time as HH:MM
    const getCurrentTime = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };
    
    // Function to format current date as YYYY-MM-DD
    const getCurrentDate = () => {
        const now = new Date();
        return now.toISOString().split('T')[0];
    };
    
    // Function to fetch student data from studentinfo collection
    const fetchStudentData = async () => {
        if (!values.studentNumber) return;

        try {
            console.log("Searching for student number:", values.studentNumber);
            
            const studentResponse = await databases.listDocuments(
                DATABASE_ID,
                STUDENT_INFO_COLLECTION_ID,
                [Query.equal('student_ID', values.studentNumber)]
            );

            console.log("Student response:", studentResponse);

            if (studentResponse.documents.length === 0) {
                setErrors({ ...errors, studentNumber: "Student number not found in database" });
                return;
            }

            const studentInfo = studentResponse.documents[0];
            console.log("Found student info:", studentInfo);

            const today = getCurrentDate();
            const attendanceResponse = await databases.listDocuments(
                DATABASE_ID,
                ATTENDANCE_COLLECTION_ID,
                [Query.equal('student_ID', values.studentNumber), Query.equal('date', today)]
            );

            console.log("Attendance response:", attendanceResponse);

            if (attendanceResponse.documents.length > 0) {
                const latestEntry = attendanceResponse.documents[attendanceResponse.documents.length - 1];

                if (!latestEntry.time_in) {
                    // First submission - no time in yet
                    setExistingDocId(latestEntry.$id);
                    setFormState('checkin');
                    setIsCheckingOut(false);
                    
                    setValues({
                        studentNumber: values.studentNumber,
                        name: studentInfo.name,
                        email: studentInfo.student_email,
                        course: studentInfo.course,
                        yearlevel: studentInfo.year_level?.toString() || '',
                        timein: '',
                        timeout: '',
                        date: getCurrentDate()
                    });
                } else if (!latestEntry.time_out) {
                    // Second submission - add time out
                    setExistingDocId(latestEntry.$id);
                    setFormState('checkout');
                    setIsCheckingOut(true);

                    setValues({
                        studentNumber: values.studentNumber,
                        name: studentInfo.name,
                        email: studentInfo.student_email,
                        course: studentInfo.course,
                        yearlevel: studentInfo.year_level?.toString() || '',
                        timein: latestEntry.time_in,
                        timeout: '',
                        date: latestEntry.date
                    });
                } else {
                    // Third submission - reset to new entry
                    setExistingDocId(null);
                    setFormState('initial');
                    setIsCheckingOut(false);

                    setValues({
                        studentNumber: values.studentNumber,
                        name: studentInfo.name,
                        email: studentInfo.student_email,
                        course: studentInfo.course,
                        yearlevel: studentInfo.year_level?.toString() || '',
                        timein: '',
                        timeout: '',
                        date: getCurrentDate()
                    });
                }
            } else {
                // No attendance record yet -> First submission
                setExistingDocId(null);
                setFormState('initial');
                setIsCheckingOut(false);

                setValues({
                    studentNumber: values.studentNumber,
                    name: studentInfo.name,
                    email: studentInfo.student_email,
                    course: studentInfo.course,
                    yearlevel: studentInfo.year_level?.toString() || '',
                    timein: '',
                    timeout: '',
                    date: getCurrentDate()
                });
            }
        } catch (error) {
            console.error("Error fetching student data:", error);
            setErrors({ ...errors, studentNumber: "Error fetching student data" });
        }
    };

    // Custom validation function that respects the form state
    const customValidation = (values) => {
        let errors = {};

        // Always validate student number
        if (!values.studentNumber) {
            errors.studentNumber = "Student Number is required";
        }

        // For checkin state, validate time in
        if (formState === 'checkin') {
            // We'll automatically set time in, so no validation needed here
        }

        // For checkout state, validate time out
        if (formState === 'checkout') {
            // We'll automatically set time out, so no validation needed here
        }

        return errors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Use custom validation instead of imported Validation
        const validationErrors = customValidation(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        try {
            const currentTime = getCurrentTime();
            
            if (formState === 'initial') {
                // First submission - create record without time in
                await databases.createDocument(DATABASE_ID, ATTENDANCE_COLLECTION_ID, ID.unique(), {
                    student_ID: values.studentNumber,
                    name: values.name,
                    email: values.email,
                    course: values.course,
                    year_level: parseInt(values.yearlevel, 10) || 0,
                    time_in: '',
                    time_out: '',
                    date: getCurrentDate(),
                });
                console.log("Created initial record");
                setFormState('checkin');
            } else if (formState === 'checkin') {
                // Second submission - update with time in
                await databases.updateDocument(DATABASE_ID, ATTENDANCE_COLLECTION_ID, existingDocId, {
                    time_in: currentTime,
                });
                console.log("Updated with time in");
                setFormState('checkout');
                setIsCheckingOut(true);
            } else if (formState === 'checkout') {
                // Third submission - update with time out
                await databases.updateDocument(DATABASE_ID, ATTENDANCE_COLLECTION_ID, existingDocId, {
                    time_out: currentTime,
                });
                console.log("Updated with time out");
                setFormState('initial');
                setIsCheckingOut(false);
            }

            resetForm();
        } catch (error) {
            console.error("Error processing request:", error);
        }
    };

    const resetForm = () => {
        setValues({
            studentNumber: '',
            name: '',
            email: '',
            course: '',
            yearlevel: '',
            timein: '',
            timeout: '',
            date: ''
        });
        setExistingDocId(null);
        // Don't reset formState here to maintain the cycle
    };

    const handleStudentNumberBlur = () => {
        // Clear previous form state
        setValues({
            studentNumber: values.studentNumber, // Keep the student number
            name: '',
            email: '',
            course: '',
            yearlevel: '',
            timein: '',
            timeout: '',
            date: ''
        });
        setExistingDocId(null);
        setFormState('initial');
        setIsCheckingOut(false);
        setErrors({}); // Clear previous errors
    
        fetchStudentData();
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
                    <h2 className="text-white text-xl font-bold mt-1">
                        {formState === 'initial' ? "Registration" : (formState === 'checkin' ? "Check In" : "Check Out")}
                    </h2>
                </div>
        
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="studentNumber">
                            Student Number
                        </label>
                        <input 
                            type="text" 
                            name="studentNumber" 
                            id="studentNumber"
                            value={values.studentNumber}
                            onChange={handleInput}
                            onBlur={handleStudentNumberBlur}
                            className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Enter your student number"
                        />
                        {errors.studentNumber && <p className="text-red-500 text-xs mt-1">{errors.studentNumber}</p>}
                    </div>
        
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
                            readOnly
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
                            readOnly
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
                            readOnly
                        />
                        {errors.course && <p className="text-red-500 text-xs mt-1">{errors.course}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="yearlevel">
                            Year Level
                        </label>
                        <input 
                            type="number"
                            name="yearlevel" 
                            id="yearlevel"
                            value={values.yearlevel}
                            onChange={handleInput}
                            className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Enter your Year Level"
                            readOnly
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
                            value={formState === 'checkout' ? values.timein : ''}
                            onChange={handleInput}
                            className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            readOnly
                        />
                        {/* Remove the error display for time in */}
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
                            readOnly
                        />
                        {/* Remove the error display for time out */}
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
                            readOnly
                        />
                        {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                    </div>       
        
                    <div className="flex space-x-2 mb-4">
                        <button 
                            type="submit" 
                            className={`flex-1 ${formState === 'checkout' ? 'bg-red-500 hover:bg-red-600' : 'bg-yellow-500 hover:bg-yellow-600'} text-black font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300`}
                        >
                            {formState === 'initial' ? "Register" : (formState === 'checkin' ? "Check In" : "Check Out")}
                        </button>              
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}

export default Validator;