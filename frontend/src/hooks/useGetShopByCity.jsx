import React, { useEffect } from 'react'
import axios from "axios"
import {serverUrl} from "../App"
import { useDispatch, useSelector } from 'react-redux'
import { setShopsInMyCity, setuserData } from '../redux/userSlice';

function useGetShopByCity() {
  const dispatch = useDispatch()
  const currentCity = useSelector(state=>state.user.city)
  useEffect(()=>{
    if(!currentCity) return;

    const fetchShops = async() =>{
        try{
            const result = await axios.get(`${serverUrl}/api/shop/get-by-city/${currentCity}`,{withCredentials:true})
            // console.log(result)
            dispatch(setShopsInMyCity(result.data))
            console.log("shops",result.data)

        }
        catch(error){
            console.log("shop fetch error",error)
            // dispatch(setuserData(null)); // Very important fallback
        }
    }
    fetchShops()
  },[currentCity])
}

export default useGetShopByCity
