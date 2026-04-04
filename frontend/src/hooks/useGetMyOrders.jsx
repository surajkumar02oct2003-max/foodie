import React, { useEffect } from 'react'
import axios from "axios"
import {serverUrl} from "../App"
import { useDispatch, useSelector } from 'react-redux'
import { setMyOrders, setuserData } from '../redux/userSlice';
import { setMyShopData } from '../redux/ownerSlice';

function useGetMyOrder() {
  const dispatch = useDispatch()
  const {userData} = useSelector(state => state.user)
  useEffect(()=>{
    const fetchOrders = async() =>{
        try{
            const result = await axios.get(`${serverUrl}/api/order/my-order`,{withCredentials:true})
            // console.log(result)
            dispatch(setMyOrders(result.data))
            console.log(result.data)
        }
        catch(error){
            console.log(error)
            // dispatch(setuserData(null)); // Very important fallback
        }
    }
    fetchOrders()
  },[userData])
}

export default useGetMyOrder
