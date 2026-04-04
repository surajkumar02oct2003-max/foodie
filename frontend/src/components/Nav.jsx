import React, { useEffect, useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { PiLineVertical } from "react-icons/pi";
import { IoSearchOutline } from "react-icons/io5";
import { BsCart } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { serverUrl } from '../App';
import { setSearchItems, setuserData } from '../redux/userSlice';
import { FaPlus } from "react-icons/fa";
import { LuReceiptIndianRupee } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';

const Nav = () => {
    const { userData, city ,cartItem} = useSelector(state => state.user)
    const { myShopData } = useSelector(state => state.owner)
    const [showInfo, setShowInfo] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [query,setQuery] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleLogOut = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/auth/signout`, { withCredentials: true })
            dispatch(setuserData(null))
        }
        catch (error) {
            console.log(error)
        }
    }
    const handleSearchItems=async() =>{
    try{
      const result = await axios.get(`${serverUrl}/api/item/search-items?query=${query}&city=${city}`,{withCredentials:true})
    //   console.log(result.data)
      dispatch(setSearchItems(result.data))
    
    }
    catch(error){
      console.log(error,"search me error aagya")
    }
  }
  useEffect(()=>{
    if(query){
        handleSearchItems()
    }else{
        dispatch(setSearchItems(null))
    }
  },[query])

    return (
        <div className='w-full h-[80px] flex items-center justify-between bg-[#fff9f6]' >

            {/* for mobile search */}
            {showSearch && userData.role == "user" && <div className='flex w-[90%] h-[55px] bg-white mx-3 shadow-xl rounded-lg items-center gap-[5px] fixed top-[80px] left-[5%] md:hidden'>
                <div className='flex items-center mr-[3.5vw]'>
                    <FaLocationDot className='text-[18px] mx-[8px] text-[#ff4d2d]' />
                    <div className='text-[16px]'>{city}</div>
                </div>

                <PiLineVertical className='text-[20px]'></PiLineVertical>

                <div className='flex items-center w-[80%] sm:w-[50%]'>
                    <IoSearchOutline className='text-[20px] mx-[8px] text-[#ff4d2d]'></IoSearchOutline>
                    <input placeholder='Search delicious food..' className='w-[80%] outline-0 text-gray-700' onChange={(e)=>setQuery(e.target.value)} value={query}></input>
                </div>

            </div>}


            {/* for laptop  */}
            <h1 className='text-3xl font-bold text-[#ff4d2d] mx-3'>Foodie</h1>

            {userData.role == "user" && <div className='md:flex w-[40vw] h-[55px] bg-white mx-3 shadow-xl rounded-lg items-center gap-[5px] hidden'>
                <div className='flex items-center mr-[3.5vw]'>
                    <FaLocationDot className='text-[18px] mx-[8px] text-[#ff4d2d]' />
                    <div className='text-[16px]'>{city}</div>
                </div>

                <PiLineVertical className='text-[20px]'></PiLineVertical>

                <div className='flex items-center w-[80%] sm:w-[50%]'>
                    <IoSearchOutline className='text-[20px] mx-[8px] text-[#ff4d2d]'></IoSearchOutline>
                    <input placeholder='Search delicious food..' className='w-[80%] outline-0 text-gray-700' onChange={(e)=>setQuery(e.target.value)} value={query}></input>
                </div>
            </div>}

            {/* right section  */}
            <div className='flex items-center'>
                {userData.role == "user" && <div>
                    {showSearch ? <RxCross2 className='text-[20px] mx-[8px] text-[#ff4d2d] md:hidden' onClick={() => setShowSearch(false)}></RxCross2> : <IoSearchOutline className='text-[20px] mx-[8px] text-[#ff4d2d] md:hidden' onClick={() => setShowSearch(true)}></IoSearchOutline>}

                </div>}

                {userData.role == "owner" ? <>
                {myShopData && <> <button className='hidden md:flex items-center gap-1 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d]' onClick={()=>navigate("/add-food")}>
                        <FaPlus className='text-[17px]'></FaPlus>
                        <span>Add Food Items</span>
                    </button>
                    <button className='md:hidden flex items-center gap-1 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d]' onClick={()=>navigate("/add-food")}>
                        <FaPlus className='text-[17px]'></FaPlus>
                    </button> </>}
                    
                    <div className='flex items-center gap-2 cursor-pointer relative px-3 py-1 ml-2 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium'>
                        <LuReceiptIndianRupee className='text-[20px]'></LuReceiptIndianRupee>
                        <span  onClick={()=>navigate("/my-orders")}>My Pending orders</span>
                        <span className='absolute -right-2 -top-2 text-xs font-bold text-white bg-[#ff4d2d] rounded-full px-[6px] py-[1px]'>0</span>
                    </div>
                </> : (
                    <>
                        <div className='relative mx-3 cursor-pointer' onClick={()=>navigate("/cart")}>
                            <BsCart className='text-[20px] text-[#ff4d2d]'></BsCart>
                            <span className='absolute right-[-9px] top-[-12px] text-[#ff4d2d]'>{cartItem.length}</span>
                        </div>

                        <button className='hidden md:block px-3 py-1 rounded-lg mx-3 bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium' onClick={()=>navigate("/my-orders")}>
                            My Orders
                        </button>
                    </>
                )}

                <div className='w-[36px] h-[36px] rounded-full flex items-center justify-center mx-3 bg-[#ff4d2d] text-white text-[18px] shadow-xl font-semibold cursor-pointer' onClick={() => setShowInfo(prev => !prev)}>
                    {userData?.fullName.slice(0, 1)}
                </div>

                {showInfo && <div className='fixed top-[70px] right-[20px] md:right-[10%] lg:right-[10%] w-[180px] bg-white shadow-2xl rounded-xl p-[20px] flex flex-col gap-[10px] z-[9999]'>
                    <div className='text-[17px] font-semibold'>
                        {userData.fullName}
                    </div>
                    <div className='md:hidden text-[#ff4d2d] font-semibold cursor-pointer'>
                        My orders
                    </div>
                    <div className='text-[#ff4d2d] font-semibold cursor-pointer' onClick={handleLogOut}>
                        Log Out
                    </div>
                </div>}
            </div>

        </div>
    )
}

export default Nav
