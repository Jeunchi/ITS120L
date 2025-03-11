import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import logo from '../assets/mapua_logo.svg'
import { Link } from 'react-router-dom'

function Signup() {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        password: '',
    });
    
    const handleInputChange=(e)=>{
        const {name,value}=e.target;
        setFormValues({...formValues,[name]:value});
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        console.log(formValues);        
    
      }

      return (
        <div className="flex flex-col bg-gray-950 place-content-center">
          <div className="flex flex-col place-items-center text-center relative h-screen">
            <div className="flex z-10 flex-col gap-8 mt-35">
              <div className="flex z-10 w-98 h-15 rounded-[0.9vw] bg-red-600 text-white place-content-center py-2 text-4xl">
                <h2 className="text-white">Sign Up</h2>
              </div>
              <div className="flex bg-gray-700 z-10 p-6 rounded-[0.9vw] w-98">
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                  <label className="text-white text-2xl self-start px-2">Username</label>
                  <input
                    type="text"
                    className="bg-gray-300 rounded-full w-80 h-9 px-3"
                    placeholder="Username"
                    name="username"
                    value={formValues.username}
                    onChange={handleInputChange}
                  />
                  <label className="text-white text-2xl self-start px-2">E-mail</label>
                  <input
                    type="text"
                    className="bg-gray-300 rounded-full w-80 h-9 px-3"
                    placeholder="Enter your email"
                    name="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                  />
                  <label className="text-white text-2xl self-start px-2">Password</label>
                  <input
                    type="password"
                    className="bg-gray-300 rounded-full w-80 h-9 px-3"
                    placeholder="Password"
                    name="password"
                    value={formValues.password}
                    onChange={handleInputChange}
                  />
                  <div className="flex place-content-center mt-4 gap-2">
                    <button className="btn btn-success w-100 rounded-full">Sign in</button>
                  </div>
                  <div className="flex place-content-center mt-4 gap-2">
                    <Link to="/Login" className="btn btn-success w-100 rounded-full text-decoration-none">
                      Log in
                    </Link>
                  </div>
                </form>
              </div>
            </div>
            <img src={logo} className="flex h-screen w-screen opacity-25 absolute z-0" />
          </div>
        </div>
      );
      
}



  

  export default Signup