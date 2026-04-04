import React, { useState } from 'react'
import { FaLeaf } from "react-icons/fa";
import { FaDrumstickBite } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/userSlice';

const FoodCard = ({ data }) => {
    const [quantity , setQuantity] = useState(0)
    const dispatch = useDispatch()
    const {cartItem} = useSelector(state=>state.user)
    const renderStars = (rating)=>{
        const stars = []
        for(let i=1; i<=5; i++){
            stars.push(
                (i<=rating)?(
                    <FaStar key={i} className='text-yellow-500 text-lg'></FaStar>
                ):(
                    <FaRegStar key={i} className='text-yellow-500 text-lg'></FaRegStar>
                )
            )
        }
        return stars
    }

    const handleIncrease=()=>{
        const newQnt = quantity+1 
        setQuantity(newQnt) 
    }
    const handleDecrease=()=>{
        if(quantity>0){
            const newQnt = quantity-1 
            setQuantity(newQnt) 
        }
        
    }
    return (
        <div className='w-[250px] rounded-2xl border-2 border-[#ff4d2d] bg-white shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col'>
            <div className='relative w-full h-[170px] flex justify-center items-center bg-white'>
                <div className='absolute top-3 right-3 bg-white rounded-full p-1 shadow'>
                    {data.foodType == "veg" ? <FaLeaf className='text-green-600 text-lg'></FaLeaf> : <FaDrumstickBite className='text-red-600 text-lg'></FaDrumstickBite>}
                </div>
                <img src={data.image} alt="" className='w-full h-full object-cover transition-transform duration-300 hover:scale-105' />
            </div>

            <div className='flex-1 flex flex-col p-4'>
                <h1 className='font-semibold text-gray-900 text-base truncate'>{data.name}</h1>
                <div className='flex items-center gap-1 mt-1'>
                    {renderStars(data.rating?.average || 0)}
                    <span className='text-xs text-gray-500'>{data.rating?.count || 0}</span>
                </div>
                <div  className='flex items-center justify-between mt-auto pt-3'>
                    <span className='font-bold text-gray-900 text-lg'>₹{data.price}</span>
                    <div className='flex items-center border rounded-full overflow-hidden shadow-sm'>
                        <button className='px-2 py-1 hover:bg-gray-100 transition' onClick={handleDecrease}>
                            <FaMinus size={12}></FaMinus>
                        </button>
                        <span>{quantity}</span>
                        <button className='px-2 py-1 hover:bg-gray-100 transition' onClick={handleIncrease}>
                            <FaPlus size={12}></FaPlus>
                        </button>
                        <button className={`${cartItem.some(i=>i.id==data._id)?"bg-gray-800":"bg-[#ff4d2d]"} text-white px-3 py-2 transition-colors`} onClick={()=>{
                            if(quantity === 0) return;
                            dispatch(addToCart({
                            id:data._id,
                            name:data.name,
                            price:data.price,
                            image:data.image,
                            shop:data.shop,
                            quantity,
                            foodType:data.foodType
                        }))}}>
                            <MdShoppingCart size={16}></MdShoppingCart>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FoodCard
