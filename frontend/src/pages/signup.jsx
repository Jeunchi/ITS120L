import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/mapua_logo.svg';
import { Link } from 'react-router-dom';
import validation from './SignupValidation';

function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  })

  const[errors,setErrors] = useState({})
  
  const handleInput = (event) => {
    setValues(prev => ({...prev, [event.target.name]: event.target.value})) // Remove the square brackets
}

const handleSubmit = (event) => {
  event.preventDefault();
  const validationErrors = validation(values);
  setErrors(validationErrors);

  if (validationErrors.name === "" && validationErrors.email === "" && validationErrors.password === "") {
      axios.post('http://localhost:8081/signup', values)
          .then(res => console.log(res))
          .catch(err => console.log(err));
  }
}



const navigate=useNavigate();

      return (
        <div className="flex flex-col bg-gray-950 place-content-center">
          <div className="flex flex-col place-items-center text-center relative h-screen">
            <div className="flex z-10 flex-col gap-8 mt-35">
              <div className="flex z-10 w-98 h-15 rounded-[0.9vw] bg-red-600 text-white place-content-center py-2 text-4xl">
                <h2 className="text-white">Sign Up</h2>
              </div>
              <div className="flex bg-gray-700 z-10 p-6 rounded-[0.9vw] w-98 place-content-center">
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                  <div className='mb-3'>
                  <label className="text-white text-2xl self-start px-2">Name</label>
                  <input type="text" 
                    placeholder="Enter name" 
                    name='name'
                    onChange={handleInput}
                    className="form-control bg-gray-300 rounded-full w-80 h-9 px-3"
                  />
                  {errors.name && <span className='text-danger'> {errors.name}</span>}
                  </div>

                  <div className='mb-3'>
                  <label className="text-white text-2xl self-start px-2">E-mail</label>
                  <input type="email" 
                    placeholder="Enter Email" 
                    name='email'
                    onChange={handleInput}
                    className="form-control bg-gray-300 rounded-full w-80 h-9 px-3"
                  />
                  {errors.email && <span className='text-danger'> {errors.email}</span>}
                  </div>

                  <div className="mb-3">
                  <label htmlFor="password" 
                    className="text-white">Password</label>
                  <input type="password" 
                    placeholder="Enter Password" 
                    name='password'
                    className="form-control bg-gray-300 rounded-full w-80 h-9 px-3"
                    onChange={handleInput}
                    />
                  {errors.password && <span className='text-danger'> {errors.password}</span>}
                </div>
                  
                    <button className="btn btn-success w-100 rounded-full">Sign in</button>
                  
                  
                    <Link to="/Login" className="btn btn-success w-100 rounded-full text-decoration-none">
                      Log in
                    </Link>
                  
                </form>
              </div>
            </div>
            <img src={logo} className="flex h-screen w-screen opacity-25 absolute z-0" />
          </div>
        </div>
      );
      
}



  

  export default Signup