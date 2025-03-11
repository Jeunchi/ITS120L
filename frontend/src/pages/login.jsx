import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import logo from '../assets/mapua_logo.svg'
import { Link } from 'react-router-dom'

function Login() {
const navigate=useNavigate();

    return (
      <div className="flex flex-col bg-gray-950 place-content-center ">
        <div className="flex flex-col place-items-center text-center gap-7">
            <img src={logo} className="flex h-98 w-150" />
            <h2 className="text-white font-serif font-bold text-6xl">MAPUA LIBRARY</h2>
        </div>
        <div className="flex place-content-center mt-5">
            <form className="flex flex-col gap-2" action="" >
                <label htmlFor="email" className="text-white text-2xl">Email</label>
                <input type="email" 
                  placeholder="Enter Email" className="bg-gray-300 rounded-full w-80 h-9 px-3"/>

                <label htmlFor="password" className="text-white text-2xl">Password</label>
                <input type="password" 
                  placeholder="Enter Password" className="bg-gray-300 rounded-full w-80 h-9 px-3"/>

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
    )
  }

  export default Login