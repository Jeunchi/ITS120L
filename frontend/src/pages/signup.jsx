// Modified Signup.jsx with integrated security
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/mapua_logo.svg';
import { Link } from 'react-router-dom';
import validation from './SignupValidation';
import api from './api';

function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (event) => {
    setValues(prev => ({ 
      ...prev, 
      [event.target.name]: event.target.name === 'email' 
        ? event.target.value.trim() 
        : event.target.value 
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setIsLoading(true);
        
        // Email domain verification (optional - for institutional emails)
        const emailDomain = values.email.split('@')[1];
        const allowedDomains = ['mapua.edu.ph', 'student.mapua.edu.ph'];
        
        if (!allowedDomains.includes(emailDomain)) {
          setErrors({
            ...validationErrors,
            email: "Please use your institutional email address"
          });
          setIsLoading(false);
          return;
        }
        
        // Implement honeypot technique for bot prevention
        if (document.getElementById('website') && document.getElementById('website').value) {
          // Bot detected (field was filled)
          console.log("Bot submission detected");
          // Simulate success but don't actually register
          setTimeout(() => {
            navigate('/');
            setIsLoading(false);
          }, 2000);
          return;
        }
        
        const response = await api.post('/signup', values);
        
        if (response.data.success) {
          navigate('/');
        } else {
          setErrors({
            ...errors,
            general: response.data.message || "Registration failed"
          });
        }
      } catch (err) {
        console.error("Signup error:", err);
        setErrors({
          ...errors,
          general: "An error occurred during registration. Please try again."
        });
      } finally {
        setIsLoading(false);
      }
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
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Mapua Logo" className="h-16 mb-2" />
          <h1 className="text-white text-2xl font-bold ">MAPUA LIBRARY</h1>
          <h2 className="text-white text-xl font-bold mt-1">Sign Up</h2>
        </div>

        {errors.general && (
          <div className="bg-red-800 text-white p-3 rounded mb-4">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input 
              type="text" 
              name="name" 
              id="name"
              onChange={handleInput}
              className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your full name"
              autoComplete="name"
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
              onChange={handleInput}
              className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your institutional email"
              autoComplete="email"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input 
              type="password" 
              name="password" 
              id="password"
              onChange={handleInput}
              className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your password"
              autoComplete="new-password"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            
            {/* Password strength meter */}
            {values.password && (
              <div className="mt-2">
                <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      values.password.length < 8 ? 'bg-red-500 w-1/4' : 
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(values.password) ? 'bg-green-500 w-full' :
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(values.password) ? 'bg-yellow-500 w-3/4' :
                      'bg-orange-500 w-2/4'
                    }`}
                  ></div>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {values.password.length < 8 ? 'Weak: Too short' : 
                   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(values.password) ? 'Strong: Good job!' :
                   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(values.password) ? 'Moderate: Add special characters' :
                   'Fair: Add uppercase and numbers'}
                </p>
              </div>
            )}
          </div>

          {/* Honeypot field - hidden from regular users but bots might fill it */}
          <div className="hidden">
            <input 
              type="text" 
              id="website" 
              name="website" 
              tabIndex="-1" 
              autoComplete="off"
            />
          </div>

          <div className="flex space-x-2 mb-4">
            <button 
              type="submit" 
              disabled={isLoading}
              className={`flex-1 ${isLoading ? 'bg-gray-500' : 'bg-yellow-500 hover:bg-yellow-600'} text-black font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300`}
            >
              {isLoading ? 'Processing...' : 'Sign Up'}
            </button>
            <Link 
              to="/" 
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 text-center"
            >
              Login
            </Link>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default Signup;
