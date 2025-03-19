import { useState } from 'react'
import './App.css'
import Login from './pages/login'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Signup from './pages/signup';
import Home from './pages/home';
import Records from './pages/records';
import Validator from './pages/validator';


function App() {

  
  return (
    <Router>
      <div>
        <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Records" element={<Records />} />
            <Route path="/Validator" element={<Validator />} />
            <Route path="/" element={<Navigate to="/Login" replace />} /> 
        </Routes>
      </div>
    </Router>
  )
}

export default App