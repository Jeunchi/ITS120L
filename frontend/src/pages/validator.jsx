import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/mapua_logo.svg';
import { Link } from 'react-router-dom';
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
    const [existingDocId, setExistingDocId] = useState(null);
    const [formState, setFormState] = useState('initial'); // 'checkin', 'checkout'

    // Appwrite Database & Collection IDs
    const DATABASE_ID = '67da128c00360aebffad';
    const ATTENDANCE_COLLECTION_ID = '67da12c50024066b85ca';
    const STUDENT_INFO_COLLECTION_ID = '67db5798003af10f90dc';
    
    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const getCurrentTime = () => {
        const now = new Date();
        return now.toTimeString().split(' ')[0].slice(0, 5);
    };

    const getCurrentDate = () => {
        return new Date().toISOString().split('T')[0];
    };

    const fetchStudentData = async () => {
        if (!values.studentNumber) return;

        try {
            const studentResponse = await databases.listDocuments(
                DATABASE_ID,
                STUDENT_INFO_COLLECTION_ID,
                [Query.equal('student_ID', values.studentNumber)]
            );

            if (studentResponse.documents.length === 0) {
                setErrors({ ...errors, studentNumber: "Student number not found in database" });
                return;
            }

            const studentInfo = studentResponse.documents[0];

            const today = getCurrentDate();
            const attendanceResponse = await databases.listDocuments(
                DATABASE_ID,
                ATTENDANCE_COLLECTION_ID,
                [Query.equal('student_ID', values.studentNumber), Query.equal('date', today)]
            );

            if (attendanceResponse.documents.length > 0) {
                const latestEntry = attendanceResponse.documents[attendanceResponse.documents.length - 1];

                if (!latestEntry.time_in) {
                    setExistingDocId(latestEntry.$id);
                    setFormState('checkin');
                } else if (!latestEntry.time_out) {
                    setExistingDocId(latestEntry.$id);
                    setFormState('checkout');
                } else {
                    setExistingDocId(null);
                    setFormState('checkin');
                }
            } else {
                setExistingDocId(null);
                setFormState('checkin');
            }

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
        } catch (error) {
            console.error("Error fetching student data:", error);
            setErrors({ ...errors, studentNumber: "Error fetching student data" });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const currentTime = getCurrentTime();

        try {
            if (formState === 'checkin') {
                if (!existingDocId) {
                    await databases.createDocument(DATABASE_ID, ATTENDANCE_COLLECTION_ID, ID.unique(), {
                        student_ID: values.studentNumber,
                        name: values.name,
                        email: values.email,
                        course: values.course,
                        year_level: parseInt(values.yearlevel, 10) || 0,
                        time_in: currentTime,
                        time_out: '',
                        date: getCurrentDate(),
                    });
                } else {
                    await databases.updateDocument(DATABASE_ID, ATTENDANCE_COLLECTION_ID, existingDocId, {
                        time_in: currentTime,
                    });
                }
                setFormState('checkout');
            } else if (formState === 'checkout') {
                await databases.updateDocument(DATABASE_ID, ATTENDANCE_COLLECTION_ID, existingDocId, {
                    time_out: currentTime,
                });
                setFormState('checkin');
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
                <Link to="/login" className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md text-center">
                    ADMIN
                </Link>

                <div className="flex flex-col items-center mb-6">
                    <img src={logo} alt="Mapua Logo" className="h-16 mb-2" />
                    <h1 className="text-white text-2xl font-bold">MAPUA LIBRARY</h1>
                    <h2 className="text-white text-xl font-bold mt-1">
                        {formState === 'checkin' ? "Check In" : "Check Out"}
                    </h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2">Student Number</label>
                        <input 
                            type="text" 
                            name="studentNumber" 
                            value={values.studentNumber}
                            onChange={handleInput}
                            onBlur={fetchStudentData}
                            className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md"
                            placeholder="Enter student number"
                        />
                        {errors.studentNumber && <p className="text-red-500 text-xs mt-1">{errors.studentNumber}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2">Name</label>
                        <input type="text" name="name" value={values.name} className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md" readOnly />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2">Email</label>
                        <input type="text" email="name" value={values.email} className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md" readOnly />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2">Course</label>
                        <input type="text" course="name" value={values.course} className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md" readOnly />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2">Year Level</label>
                        <input type="text" yearlevel="name" value={values.yearlevel} className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md" readOnly />
                    </div>

                    <div className="flex space-x-2 mb-4">
                        <button 
                            type="submit" 
                            className={`flex-1 ${formState === 'checkout' ? 'bg-red-500 hover:bg-red-600' : 'bg-yellow-500 hover:bg-yellow-600'} text-black font-medium py-2 px-4 rounded-md`}
                        >
                            {formState === 'checkin' ? "Check In" : "Check Out"}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}

export default Validator;
