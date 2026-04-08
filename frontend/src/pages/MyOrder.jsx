import React from 'react'
import { useSelector } from 'react-redux'
import {IoIosArrowRoundBack} from "react-icons/io"
import { Navigate, useNavigate } from 'react-router-dom'
import UserOrderCard from '../components/UserOrderCard'
import OwnerOrderCard from '../components/OwnerOrderCard'
const MyOrder = () => {
  const {userData,myOrders} = useSelector(state=>state.user)
  const navigate = useNavigate()
  return (
    <div className='w-full min-h-screen bg-[#fff9f6] flex justify-center px-4'>
      <div className='w-full max-w-[800px] p-4'>
        <div className='flex items-center gap-[20px] mb-6'>
            <div className='z-[10]' onClick={()=>navigate("/")}>
              <IoIosArrowRoundBack size={35} className='text-[#ff4d2d]'></IoIosArrowRoundBack>
            </div>
            <h1 className='text-2xl font-bold text-start'>My order</h1>
        </div>
        <div className='space-y-6'>
          {myOrders?.map((order,index)=>(
            userData.role=="user" ? (
              <UserOrderCard data={order} key={index}></UserOrderCard>
            ):
            userData.role=="owner"?(
              <OwnerOrderCard data={order} key={index}></OwnerOrderCard>
            ):null
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyOrder
