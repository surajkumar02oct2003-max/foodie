import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setuserData } from '../redux/userSlice';

const SignIn = () => {
    const primaryColor = "#ff4d2d";
    const hoverColor = "#e64323";
    const bgColor = "#fff9f6";
    const borderColor = "#ddd";
    const[showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const dispatch = useDispatch()

    // fetching our signin
    const handleSignIn = async()=>{
        try{
            const result = await axios.post(`${serverUrl}/api/auth/signin`,{
                email,password
            },{withCredentials:true})
            // console.log(result)
            dispatch(setuserData(result.data))
        }
        catch(err){
            console.log(err)
        }
    }
  return (
    <div className='w-full min-h-screen flex items-center justify-center p-4' style={{backgroundColor:bgColor}}>
      <div className={`bg-white rounded-xl  w-full max-w-md p-8 `} style={{border:`2px solid ${borderColor}` }}>
        <h1 className={`text-3xl font-bold mb-2`} style={{color:primaryColor}}>Foodie</h1>
        <p className='text-gray-600 mb-8'>Sign in your account to get started with delicious food deliveries</p>


        {/* email */}
        <div className='mb-4'>
            <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>
            <input className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500'  placeholder='Enter your Email' type="email" onChange={(e)=>setEmail(e.target.value)} value={email} required />
        </div>

        
        {/* password */}
        <div className='mb-4'>
            <label htmlFor="Password" className='block text-gray-700 font-medium mb-1'>Password</label>
            <div className='relative'>
                <input className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500'  placeholder='Enter your password' type={`${showPassword?"text":"password"}`} onChange={(e)=>setPassword(e.target.value)} value={password} required />
                <button className='absolute right-3 top-[13px] text-gray-500 cursor-pointer  ' onClick={()=>setShowPassword(prev => !prev)}>{!showPassword?<FaRegEye></FaRegEye>:<FaRegEyeSlash></FaRegEyeSlash>}</button>
            </div>   
        </div >

        {/* forget password */}
        <div className='text-right mb-4 text-[#ff4d2d] font-medium cursor-pointer' onClick={()=>navigate("/forget-password")}>
            Forget password
        </div>

         {/* signup button */}
         <button className='w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer' onClick={()=>handleSignIn()}>Sign In</button>

         {/* google sign up */}
         <button className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100 cursor-pointer'>Sign in with Google <FcGoogle size={20}></FcGoogle></button>
         <p className='text-center mt-6 cursor-pointer' onClick={()=>navigate("/signup")}>Want to create a new account? <span className='text-[#ff4d2d]'>Sign Up</span></p>
      </div>
    </div>
  )
}

export default SignIn

