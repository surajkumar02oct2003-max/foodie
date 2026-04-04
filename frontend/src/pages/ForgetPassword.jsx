import React, { useState } from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { serverUrl } from '../App';

const ForgetPassword = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const navigate = useNavigate()

    const handleSendOtp = async()=>{
        try{
            const result = await axios.post(`${serverUrl}/api/auth/send-otp`,{email},
                {withCredentials:true})
                console.log(result)
                setStep(2)
        }
        catch(err){
            console.log("otp nhi jaa rha h ")
        }
    }

    const handleVerifyOtp = async()=>{
        try{
            const result = await axios.post(`${serverUrl}/api/auth/verify-otp`,{email,otp},
                {withCredentials:true})
                console.log(result)
                setStep(3)
        }
        catch(err){
            console.log(err)
        }
    }


    const handleResetPassword = async()=>{
        if(newPassword != confirmPassword){
            return null
        }
        try{
            const result = await axios.post(`${serverUrl}/api/auth/reset-password`,{email,newPassword},
                {withCredentials:true})
                console.log(result)
                navigate("/signin")
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <div className='flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]'>
            <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8'>
                <div className='flex items-center gap-4'>
                    <IoMdArrowBack size={30} className='text-[#ff4d2d] cursor-pointer mb-2 ' onClick={() => navigate("/signin")}></IoMdArrowBack>
                    <h1 className='text-2xl font-bold text-center mb-2 text-[#ff4d2d]'>Forget Password</h1>
                </div>

                {/* step 1 */}
                {step == 1 &&
                    <div>
                        <div className='mb-6'>
                            <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>
                            <input className='w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none ' placeholder='Enter your Email' type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                        </div>

                        {/* signup button */}
                        <button className='w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer' onClick={() => handleSendOtp()}>Send Otp</button>
                    </div>}

                {/* step 2 */}
                {step == 2 &&
                    <div>
                        <div className='mb-6'>
                            <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>OTP</label>
                            <input className='w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none ' placeholder='Enter OTP' type="email" onChange={(e) => setOtp(e.target.value)} value={otp} required/>
                        </div>

                        {/* signup button */}
                        <button className='w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer' onClick={() => handleVerifyOtp()} >Verify</button>
                    </div>}
                
                {/* step 3 */}
                {step == 3 &&
                    <div>
                        <div className='mb-6'>
                            <label htmlFor="newPassword" className='block text-gray-700 font-medium mb-1'>New Password</label>
                            <input className='w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none ' placeholder='Enter New Password' type="password" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} required />
                        </div>

                        <div className='mb-6'>
                            <label htmlFor="ConfirmedPassword" className='block text-gray-700 font-medium mb-1'>Confirm Password</label>
                            <input className='w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none ' placeholder='Confirm Password' type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} required />
                        </div>

                        {/* signup button */}
                        <button className='w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer' onClick={() => handleResetPassword()} >Reset Password</button>
                    </div>}
            </div>
        </div>
    )
}

export default ForgetPassword
