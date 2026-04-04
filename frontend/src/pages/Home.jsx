import React from 'react'
import { useSelector } from 'react-redux'
import UserDashboard from '../components/UserDashboard'
import OwnerDashboard from '../components/OwnerDashboard'
import DeliveryBoyDashboard from '../components/DeliveryBoyDashboard'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const {userData} = useSelector(state => state.user)
    
  return (
    <div  className='w-[100vw] min-h-[100vh] flex flex-col items-center bg-[#fff9f6]'>
        {userData.role == "user" && <UserDashboard></UserDashboard>}
        {userData.role == "owner" && <OwnerDashboard></OwnerDashboard>}
        {userData.role == "deliveryBoy" && <DeliveryBoyDashboard></DeliveryBoyDashboard>}
    </div>
  )
}

export default Home
