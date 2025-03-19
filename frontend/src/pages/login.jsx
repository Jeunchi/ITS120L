import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/mapua_logo.svg";
import { Link } from "react-router-dom";
import validation from "./LoginValidation";
import { account } from "../lib/appwrite"; // Import the Appwrite account instance

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
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

  const handleLogin = async () => {
    try {
      // Use Appwrite to create a session
      await account.createEmailPasswordSession(values.email, values.password);
      const user = await account.get();
      setLoggedInUser(user);
      navigate("/home");
    } catch (error) {
      alert("Login failed: " + error.message);
      console.error("Login error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      setLoggedInUser(null);
    } catch (error) {
      alert("Logout failed: " + error.message);
      console.error("Logout error:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validation(values);
    setErrors(validationErrors);

    if (
      Object.keys(validationErrors).length === 0 ||
      (validationErrors.email === "" && validationErrors.password === "")
    ) {
      handleLogin();
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
        </motion.div>

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
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleInput}
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
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              Login
            </button>
          </motion.div>
          
          {loggedInUser && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-4"
            >
              <p className="text-green-400 text-sm mb-2">
                Logged in as {loggedInUser.name}
              </p>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                Logout
              </button>
            </motion.div>
          )}
        </form>
      </motion.div>
    </motion.div>
  );
}

export default Login;