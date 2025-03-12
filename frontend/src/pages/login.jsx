import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/mapua_logo.svg';
import { Link } from 'react-router-dom';
import validation from './LoginValidation';
import axios from 'axios';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  
  const handleInput = (event) => {
    setValues(prev => ({...prev, [event.target.name]: event.target.value}));
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validation(values);
    setErrors(validationErrors);
    
    if(Object.keys(validationErrors).length === 0 || 
      (validationErrors.email === "" && validationErrors.password === "")) {
      axios.post('http://localhost:8081/login', values)
        .then(res => {
          if(res.data === "Success"){
            navigate('/home');
          } else {
            alert("No record existed");
          }
        })
        .catch(err => console.log(err));
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Mapua Logo" className="h-16 mb-2" />
          <h1 className="text-2xl font-bold text-red-800">MAPUA LIBRARY</h1>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              onChange={handleInput}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input 
              type="password" 
              name="password" 
              id="password"
              onChange={handleInput}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
          >
            Log in
          </button>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-red-800 hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;