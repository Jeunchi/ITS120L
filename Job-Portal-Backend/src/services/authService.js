// services/userService.js
import { pool } from "../config/db.js";
import bcrypt from 'bcryptjs';  


export const registerUser=async(user)=> {
    console.log(user);
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        const query='INSERT INTO users (firstname, lastname, username, employeenumber, password) VALUES (?,?,?,?,?)'
        const values=[user.firstname,user.lastname,user.username,user.employeenumber,hashedPassword];
    
        await pool.query(query,values);
        return {success:true,message:"User Registered Successfully"}

    } catch (error) {
        return {success:false,message:"Registration failed. Please try again later"}
    }

}