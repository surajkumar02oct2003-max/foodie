import React, { useEffect } from 'react'
import axios from "axios"
import {serverUrl} from "../App"
import { useDispatch, useSelector } from 'react-redux'
import { setShopsInMyCity, setuserData ,setItemsInMyCity } from '../redux/userSlice';

function useGetItemsByCity() {
  const dispatch = useDispatch()
  const currentCity = useSelector(state=>state.user.city)
  useEffect(()=>{
    if(!currentCity) return;

    const fetchItems = async() =>{
        try{
            const result = await axios.get(`${serverUrl}/api/item/get-by-city/${currentCity}`,{withCredentials:true})
            // console.log(result)
            dispatch(setItemsInMyCity(result.data))
            console.log("shops city item",result.data)

        }
        catch(error){
            console.log("city item fetch error",error)
            // dispatch(setuserData(null)); // Very important fallback
        }
    }
    fetchItems()
  },[currentCity])
}

export default useGetItemsByCity
