import { useState } from 'react'
import './App.css'
import Login from './pages/login'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Signup from './pages/signup';
import Home from './pages/home';
import Records from './pages/records';
import Validator from './pages/validator';
import Perhour from './pages/perhour';
import Percourse from './pages/percourse'
import { setupSessionTimeout } from './pages/sessionManager';
import React, { useEffect } from 'react';

function App() {

  useEffect(() => {
    // Setup session timeout management
    const cleanup = setupSessionTimeout();
    
    // Clean up on component unmount
    return cleanup;
  }, []);
  return (
    
    <Router>
      <div>
        <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Records" element={<Records />} />
            <Route path="/Perhour" element={<Perhour />} />
            <Route path="/Percourse" element={<Percourse />} />            
            <Route path="/Validator" element={<Validator />} />
            <Route path="/" element={<Navigate to="/Validator" replace />} /> 
        </Routes>
      </div>
    </Router>
  )
}

export default App
