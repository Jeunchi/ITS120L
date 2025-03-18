import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/mapua_logo.svg";
import { Link } from "react-router-dom";
import validation from "./SignupValidation";
import { account, ID } from "../lib/appwrite";

function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validation(values);
    setErrors(validationErrors);

    if (validationErrors.name === "" && validationErrors.email === "" && validationErrors.password === "") {
      try {
        // Create user account with Appwrite
        await account.create(
          ID.unique(),
          values.email,
          values.password,
          values.name
        );
        
        // Optionally login the user immediately after signup
        // await account.createEmailPasswordSession(values.email, values.password);
        
        // Navigate to login page
        navigate('/');
      } catch (error) {
        alert("Registration failed: " + error.message);
        console.error("Registration error:", error);
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
              onChange={handleInput}
              className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your email"
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
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div className="flex space-x-2 mb-4">
            <button 
              type="submit" 
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              Sign Up
            </button>
            <Link 
              to="/Login" 
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