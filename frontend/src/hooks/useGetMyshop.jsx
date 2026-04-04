import React, { useEffect } from 'react'
import axios from "axios"
import {serverUrl} from "../App"
import { useDispatch, useSelector } from 'react-redux'
import { setuserData } from '../redux/userSlice';
import { setMyShopData } from '../redux/ownerSlice';

function useGetMyshop() {
  const dispatch = useDispatch()
  const {userData} = useSelector(state => state.user)
  useEffect(()=>{
    const fetchshop = async() =>{
        try{
            const result = await axios.get(`${serverUrl}/api/shop/get-my`,{withCredentials:true})
            // console.log(result)
            dispatch(setMyShopData(result.data))

        }
        catch(error){
            console.log(error)
            // dispatch(setuserData(null)); // Very important fallback
        }
    }
    fetchshop()
  },[userData])
}

export default useGetMyshop
