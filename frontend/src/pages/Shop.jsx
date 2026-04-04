import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { serverUrl } from '../App'
import { useParams } from 'react-router-dom'
import { FaStore } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaUtensils } from "react-icons/fa";
import FoodCard from '../components/FoodCard';

const Shop = () => {
    const {shopId} = useParams()
    const [items,setItems] = useState([])
    const [shop,setShop] = useState(null)
    const handleShop=async()=>{
        try{
            const result = await axios.get(`${serverUrl}/api/item/get-by-shop/${shopId}`,{withCredentials:true})
            // console.log(result.data)
            setShop(result.data.shop)
            setItems(result.data.items)
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        handleShop()
    },[shopId])
  return (
    <div className='min-h-screen bg-gray-50'>
      {shop && shop.image && <div className='relative w-full h-64 md:h-80 lg:h-96'>
        <img src={shop.image} alt="" className='w-full h-full object-cover' />
        <div className='absolute inset-0 bg-gradient-to-b from-black/70 to-black 30 flex flex-col justify-center items-center text-center px-4'>
           <FaStore className='text-white text-4xl mb-3 drop-shadow-md'></FaStore> 
           <h1 className='text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg'>{shop.name}</h1>
           <div className='flex items-center gap-[10px]'>
            <FaLocationDot size={22} color='red'></FaLocationDot>
            <p className='text-lg font-medium text-gray-200 mt-[10px]'>{shop.address}</p>
           </div>  
        </div>   
    </div>}

    <div className='max-w-7xl mx-auto px-6 py-10'>
        <h2 className='flex items-center justify-center gap-3 text-3xl font-bold mb-10 text-gray-800'><FaUtensils color='red'></FaUtensils>Our menu</h2>
        {items.length>0?(
            <div className='flex flex-wrap justify-center gap-8'>
                {items.map((item) => (
                    <FoodCard key={item._id} data={item}></FoodCard>
                ))}
            </div>
        ):<p className='text-center text-gray-500 text-lg'>No items available</p>}
    </div>
    </div>
  )
}

export default Shop
