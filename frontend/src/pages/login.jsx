import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/mapua_logo.svg";
import { Link } from "react-router-dom";
import validation from "./LoginValidation";
import api from "./api"; // Use the secure API instance
import { createRateLimiter } from "./ratelimit";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState(null);
  
  const navigate = useNavigate();
  
  // Rate limiter: 5 attempts per 15 minutes (900000 ms)
  const checkRateLimit = createRateLimiter(5, 900000);
  
  useEffect(() => {
    // Check if account is locked
    const storedLockout = localStorage.getItem("loginLockout");
    if (storedLockout) {
      const lockTime = parseInt(storedLockout);
      if (lockTime > Date.now()) {
        setLockoutUntil(new Date(lockTime));
      } else {
        localStorage.removeItem("loginLockout");
      }
    }
    
    // Clear sensitive data when component mounts
    return () => {
      setValues({
        email: "",
        password: "",
      });
    };
  }, []);

  const handleInput = (event) => {
    setValues((prev) => ({ 
      ...prev, 
      [event.target.name]: event.target.name === "email" 
        ? event.target.value.trim() 
        : event.target.value 
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Check if account is locked
    if (lockoutUntil && lockoutUntil > new Date()) {
      const timeRemaining = Math.ceil((lockoutUntil - new Date()) / 60000);
      alert(`Account temporarily locked. Try again in ${timeRemaining} minutes.`);
      return;
    }
    
    // Check rate limit
    if (!checkRateLimit(values.email)) {
      alert("Too many login attempts. Please try again later.");
      return;
    }
    
    const validationErrors = validation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setIsLoading(true);
        
        // Implement login delay to prevent timing attacks
        const minDelay = 1000; // 1 second minimum response time
        const startTime = Date.now();
        
        const response = await api.post("/login", values);
        
        // Ensure minimum delay has passed
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < minDelay) {
          await new Promise(resolve => setTimeout(resolve, minDelay - elapsedTime));
        }
        
        if (response.data === "Success") {
          // Reset login attempts on success
          setLoginAttempts(0);
          localStorage.removeItem("loginLockout");
          
          // Set session timeout (30 minutes)
          const sessionTimeout = Date.now() + 30 * 60 * 1000;
          localStorage.setItem("sessionExpires", sessionTimeout);
          
          navigate("/home");
        } else {
          const newAttempts = loginAttempts + 1;
          setLoginAttempts(newAttempts);
          
          // Lock account after 5 failed attempts
          if (newAttempts >= 5) {
            const lockoutTime = Date.now() + 15 * 60 * 1000; // 15 minutes
            localStorage.setItem("loginLockout", lockoutTime.toString());
            setLockoutUntil(new Date(lockoutTime));
            alert("Too many failed login attempts. Your account is locked for 15 minutes.");
          } else {
            alert(`Invalid credentials. Attempts: ${newAttempts}/5`);
          }
        }
      } catch (err) {
        console.error("Login error:", err);
        alert("An error occurred during login. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen bg-gray-900"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-md"
      >
        {/* Logo and title section remains the same */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-6"
        >
          <motion.img
            src={logo}
            alt="Mapua Logo"
            className="h-16 mb-2"
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.5 }}
          />
          <h1 className="text-white text-2xl font-bold">MAPUA LIBRARY</h1>
        </motion.div>

        {lockoutUntil && lockoutUntil > new Date() ? (
          <div className="bg-red-800 text-white p-4 rounded mb-4">
            <p className="text-center">
              Account temporarily locked due to too many failed attempts.
              <br />
              Please try again after {Math.ceil((lockoutUntil - new Date()) / 60000)} minutes.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-4"
            >
              <label
                className="block text-gray-300 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Username
              </label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleInput}
                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your username"
                autoComplete="username"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-6"
            >
              <label
                className="block text-gray-300 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleInput}
                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex space-x-2 mb-4"
            >
              <Link
                to="/signup"
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 text-center"
              >
                Sign Up
              </Link>
              <button
                type="submit"
                disabled={isLoading || (lockoutUntil && lockoutUntil > new Date())}
                className={`flex-1 ${isLoading ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-600'} text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300`}
              >
                {isLoading ? 'Processing...' : 'Login'}
              </button>
            </motion.div>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

export default Login;