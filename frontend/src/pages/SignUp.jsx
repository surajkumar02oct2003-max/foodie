import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setuserData } from '../redux/userSlice';

const SignUp = () => {
    const primaryColor = "#ff4d2d";
    const hoverColor = "#e64323";
    const bgColor = "#fff9f6";
    const borderColor = "#ddd";
    const[showPassword, setShowPassword] = useState(false)
    const[role , setRole] = useState("user")
    const navigate = useNavigate();
    const[fullName, setFullName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[mobile, setMobile] = useState("")
    const [err, setErr] = useState("") //this is for showing error
    const dispatch = useDispatch()

    // fetching our signup
    const handleSignUp = async()=>{
        try{
            const result = await axios.post(`${serverUrl}/api/auth/signup`,{
                fullName,email,password,mobile,role
            },{withCredentials:true})
            // console.log(result)
            dispatch(setuserData(result.data))
            setErr("")
        }
        catch(error){
            // console.log(err)
            setErr(error.response.data.message)
        }
    }
  return (
    <div className='w-full min-h-screen flex items-center justify-center p-4' style={{backgroundColor:bgColor}}>
      <div className={`bg-white rounded-xl  w-full max-w-md p-8 `} style={{border:`2px solid ${borderColor}` }}>
        <h1 className={`text-3xl font-bold mb-2`} style={{color:primaryColor}}>Foodie</h1>
        <p className='text-gray-600 mb-8'>Create your account to get started with delicious food deliveries</p>

        {/* full name */}
        <div className='mb-4'>
            <label htmlFor="fullName" className='block text-gray-700 font-medium mb-1'>Full Name</label>
            <input className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500'  placeholder='Enter your full name' type="text" onChange={(e)=>setFullName(e.target.value)} value={fullName} required />
        </div>

        
        {/* email */}
        <div className='mb-4'>
            <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>
            <input className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500'  placeholder='Enter your Email' type="email" onChange={(e)=>setEmail(e.target.value)} value={email} required />
        </div>

        
        {/* mobile*/}
        <div className='mb-4'>
            <label htmlFor="Mobile No." className='block text-gray-700 font-medium mb-1'>Moboile No.</label>
            <input className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500'  placeholder='Enter your Mobile No.' type="tel" onChange={(e)=>setMobile(e.target.value)} value={mobile} required/>
        </div>

        
        {/* password */}
        <div className='mb-4'>
            <label htmlFor="Password" className='block text-gray-700 font-medium mb-1'>Password</label>
            <div className='relative'>
                <input className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500'  placeholder='Enter your password' type={`${showPassword?"text":"password"}`} onChange={(e)=>setPassword(e.target.value)} value={password} required />
                <button className='absolute right-3 top-[13px] text-gray-500 cursor-pointer  ' onClick={()=>setShowPassword(prev => !prev)}>{!showPassword?<FaRegEye></FaRegEye>:<FaRegEyeSlash></FaRegEyeSlash>}</button>
            </div>   
        </div>

        {/* role */}
        <div className='mb-4'>
            <label htmlFor="role" className='block text-gray-700 font-medium mb-1'>Role</label>
            <div className=' flex gap-2'>
                {["user", "owner", "deliveryboy"].map((r)=>{
                    return(<button className='flex-1 border rounded-lg px-3 py-2 text-center cursor-pointer font-medium tracking-colors' onClick={()=>{setRole(r)}} style={role==r?{backgroundColor:primaryColor,color:'white'}:{border:"1px solid black",color:"#333"}} >{r}</button>
                )})}
            </div>   
        </div>
         
         {/* signup button */}
         <button className='w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer' onClick={()=>handleSignUp()}>Sign Up</button>

         {/* showing error */}
         <p className='text-red-500 text-center'>{err}</p>

         {/* google sign up */}
         <button className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100 cursor-pointer'>Sign up with Google <FcGoogle size={20}></FcGoogle></button>
         <p className='text-center mt-6 cursor-pointer' onClick={()=>navigate("/signin")}>Already have an account? <span className='text-[#ff4d2d]'>Sign In</span></p>
      </div>
    </div>
  )
}

export default SignUp
