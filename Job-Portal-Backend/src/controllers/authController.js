// controllers/authController.js
import UserModel from '../models/userModel.js';
import {registerUser} from '../services/authService.js';

export const register=async(req, res)=>{
    const {firstname, lastname, username, employeenumber, password}=req.body;
    if(!firstname || !lastname || !username || !employeenumber || !password){
        return res.status(400).json({success:false,message:"All fields are required"});
    };

    const user=new UserModel({firstname, lastname, username, employeenumber, password});

    try {
        const response=await registerUser()
        if(response.success){
            return res.status(200).json(response)
        }else{
            return res.status(400).json(response)
        }
    
    } catch (error) {
        return {success:false,message:"Registration failed."}
    }

}