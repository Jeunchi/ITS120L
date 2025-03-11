import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import logo from '../assets/mapua_logo.svg'


function Signup() {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        firstname: '',
        lastname: '',
        username: '',
        employeenumber: '',
        password: '',
    });
    
    const handleInputChange=(e)=>{
        const {name,value}=e.target;
        setFormValues({...formValues,[name]:value});
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        console.log(formValues);

        try {
          const response = await axios.post("http://localhost:3000/api/auth/register-user", formValues);
          console.log(response, 'res');
    
          if (response.data.success) {

              setFormValues({username:"",email:"",mobile:"",password:""});

          } else {

          }
      } catch (error) {
          console.error('Error during registration:', error);

      }
        
        
    
      }

    return (
      <div class="flex flex-col h-screen bg-gray-950 place-content-center">
        <div class="flex flex-col place-items-center text-center relative h-screen">
            <div class="flex z-10 flex-col gap-8 mt-35">
                <div class="flex z-10 w-98 h-15 rounded-[0.9vw] bg-red-600 text-white place-content-center py-2 text-4xl">
                    <h2 class="text-white">Sign Up</h2>
                </div>
                <div class="flex bg-gray-700 z-10 p-6 rounded-[0.9vw] w-98">
                    <form class="flex flex-col gap-2" onSubmit={handleSubmit}>
                        <label class="text-white text-2xl self-start px-2">First Name</label>
                        <input 
                            type="text" 
                            class="bg-gray-300 rounded-full w-80 h-9 px-3"
                            placeholder="Enter your first name"
                            name="firstname"
                            value={formValues.firstname} 
                            onChange={handleInputChange}
                        
                        />

                        <label class="text-white text-2xl self-start px-2">Last Name</label>
                        <input 
                            type="text" 
                            class="bg-gray-300 rounded-full w-80 h-9 px-3"
                            placeholder="Enter your last name"
                            name="lastname"
                            value={formValues.lastname} 
                            onChange={handleInputChange}
                            />

                        <label class="text-white text-2xl self-start px-2">Username</label>
                        <input 
                            type="text" 
                            class="bg-gray-300 rounded-full w-80 h-9 px-3"
                            placeholder="Username"
                            name="username"
                            value={formValues.username} 
                            onChange={handleInputChange}                                
                            />
                            
                        <label class="text-white text-2xl self-start px-2">Employee No.</label>
                        <input 
                            type="text" 
                            class="bg-gray-300 rounded-full w-80 h-9 px-3"
                            placeholder="Enter your Employee Number"
                            name="employeenumber"
                            value={formValues.employeenumber} 
                            onChange={handleInputChange}    
                            />

                        <label class="text-white text-2xl self-start px-2">Password</label>
                        <input 
                            type="password" 
                            class="bg-gray-300 rounded-full w-80 h-9 px-3"
                            placeholder="Password"
                            name="password"
                            value={formValues.password} 
                            onChange={handleInputChange}     
                            />

                        <div class="flex place-content-center mt-4 gap-2">
                            <button type="submit" 
                                onClick={() => navigate('/Login')} 
                                class="text-black cursor-pointer font-bold rounded-full bg-yellow-300 px-6 h-9 w-35 hover:scale-105 delay-120 duration-250 ease-in-out">Back</button>
                            
                            <button type="submit" 
                                class="text-black cursor-pointer font-bold rounded-full bg-green-400 px-6 h-9 w-35 hover:scale-105 delay-120 duration-250 ease-in-out">
                                    Sign Up
                            </button>
                        </div>

                    </form>
                </div>
            </div>
                <img src={logo} class="flex h-screen w-screen opacity-25 absolute z-0" />
        </div>

      </div>
    )
}



  

  export default Signup