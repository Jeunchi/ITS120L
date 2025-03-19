import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/mapua_logo.svg";
import { Link } from "react-router-dom";
import { account, ID } from "../lib/appwrite"; // Import the Appwrite account instance and ID

function SignUp() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await account.get();
        if (user) {
          setLoggedInUser(user);
          navigate("/home");
        }
      } catch (error) {
        // No active session
        console.log("No active session");
      }
    };
    
    checkSession();
  }, [navigate]);

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!values.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!values.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "Email is not valid";
      isValid = false;
    }

    if (!values.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (values.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (values.password !== values.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async () => {
    try {
      // Create the user account
      await account.create(
        ID.unique(),
        values.email,
        values.password,
        values.name
      );
      
      // Then log them in automatically
      await account.createEmailPasswordSession(values.email, values.password);
      const user = await account.get();
      setLoggedInUser(user);
      navigate("/home");
    } catch (error) {
      alert("Registration failed: " + error.message);
      console.error("Registration error:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      handleRegister();
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
          <h2 className="text-gray-300 text-xl mt-2">Create an Account</h2>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4"
          >
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleInput}
              value={values.name}
              className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </motion.div>

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
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleInput}
              value={values.email}
              className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-4"
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
              value={values.password}
              className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-6"
          >
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              onChange={handleInput}
              value={values.confirmPassword}
              className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex space-x-2 mb-4"
          >
            <Link
              to="/login"
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 text-center"
            >
              Back to Login
            </Link>
            <button
              type="submit"
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              Sign Up
            </button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default SignUp;