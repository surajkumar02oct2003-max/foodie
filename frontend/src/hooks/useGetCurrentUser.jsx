import React, { useEffect } from 'react'
import axios from "axios"
import {serverUrl} from "../App"
import { useDispatch } from 'react-redux'
import { setuserData } from '../redux/userSlice';

function useGetCurrentUser() {
  const dispatch = useDispatch()
  useEffect(()=>{
    const fetchUser = async() =>{
        try{
            const result = await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})
            // console.log(result)
            dispatch(setuserData(result.data.user))

        }
        catch(error){
            console.log(error)
            // dispatch(setuserData(null)); // Very important fallback
        }
    }
    fetchUser()
  },[])
}

export default useGetCurrentUser
