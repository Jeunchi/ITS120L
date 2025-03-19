import { useState } from 'react';
import './App.css';
import Login from './pages/login';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'; // No need for Router import
import Signup from './pages/signup';
import Home from './pages/home';
import Records from './pages/records';
import Validator from './pages/validator';
import PerHour from './pages/perhour';
import PerCourse from './pages/percourse';

function App() {
  const location = useLocation();
  const showChat = location.pathname !== '/Login' && location.pathname !== '/Signup';

  return (
    <div>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Records" element={<Records />} />
        <Route path="/Validator" element={<Validator />} />
        <Route path="/perhour" element={<PerHour />} />\
        <Route path="/PerCourse" element={<PerCourse />} />        
        <Route path="/" element={<Navigate to="/Login" replace />} /> 
      </Routes>
    </div>
  );
}

export default App;
