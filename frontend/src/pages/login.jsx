import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/mapua_logo.svg';
import { Link } from 'react-router-dom';
import validation from './LoginValidation';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  const[errors,setErrors] = useState({})
  
  const handleInput = (event) => {
    setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
  }

  const handleSubmit =(event) => {
    event.preventDefault();
    setErrors(validation(values));

  }
const navigate=useNavigate();

    return (
      <div className="flex flex-col bg-gray-950 place-content-center h-screen">
        <div className="flex flex-col place-items-center text-center gap-7">
            <img src={logo} className="flex h-98 w-150" />
            <h2 className="text-white">MAPUA LIBRARY</h2>
        </div>
        <div className="flex place-content-center mt-5">
           
            <form className="flex flex-col gap-2" action="" onSubmit={handleSubmit}>
                
                <div className="mb-3">
                  <label htmlFor="email" className="text-white">Email</label>
                  <input type="email" 
                    placeholder="Enter Email" 
                    name='email'
                    onChange={handleInput}
                    className="form-control bg-gray-300 rounded-full w-80 h-9 px-3"
                    />
                  {errors.email && <span className='text-danger'> {errors.email}</span>}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="text-white">Password</label>
                  <input type="password" 
                    placeholder="Enter Password" 
                    name='password'
                    className="form-control bg-gray-300 rounded-full w-80 h-9 px-3"
                    onChange={handleInput}
                    />
                  {errors.password && <span className='text-danger'> {errors.password}</span>}
                </div>

                    <button type='submit' className='btn btn-success w-100 rounded-full'>Log in</button>
                  
                    <Link to="/Signup" className="btn btn-success w-100 rounded-full text-decoration-none">
                      Signup
                    </Link>
                  

            </form>
        </div>

      </div>
    )
  }

  export default Login