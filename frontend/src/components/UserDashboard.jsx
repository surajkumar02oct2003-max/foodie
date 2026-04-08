import React, { useEffect, useRef, useState } from 'react'
import Nav from './Nav'
import { categories } from '../category'
import CategoryCard from './CategoryCard'
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import { useSelector } from 'react-redux';
import FoodCard from './FoodCard';
import { useNavigate } from 'react-router-dom';


const UserDashboard = () => {
  const { city, shopInMyCity ,itemsInMyCity,searchItems} = useSelector(state => state.user)
  // console.log(currentCity)
  const cateScrollRef = useRef()
  const shopScrollRef = useRef()
  const navigate = useNavigate()

  const [showLeftCateButton, setLeftShowCateButton] = useState(false)
  const [showRightCateButton, setRightShowCateButton] = useState(false)
  const [showLeftShopButton, setLeftShowShopButton] = useState(false)
  const [showRightShopButton, setRightShowShopButton] = useState(false)
  const [updatedItemsList, setUpdatedItemsList] = useState([])
  const handleFilterByCategory=(category)=>{
    if(category=="All"){
      setUpdatedItemsList(itemsInMyCity)
    }else{
      const filteredList = itemsInMyCity?.filter(i=>i.category===category)
      setUpdatedItemsList(filteredList)
    }
  }
  useEffect(()=>{
    setUpdatedItemsList(itemsInMyCity)
  },[itemsInMyCity])
  const updateButton = (ref, setLeftButton, setRightButton) => {
    const element = ref.current
    if (element) {
      // console.log(element.scrollLeft)
      setLeftButton(element.scrollLeft > 0)
      // console.log(element.scrollWidth)
      // console.log(element.clientWidht)
      setRightButton(element.scrollLeft + element.clientWidth < element.scrollWidth)
    }
  }

  const scrollHandler = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction == "left" ? -200 : 200,
        behavior: "smooth"
      })
    }
  }

  

  // useEffect(()=>{
  //   if(cateScrollRef.current){
  //     updateButton(cateScrollRef,setLeftShowCateButton,setRightShowCateButton)
  //     updateButton(shopScrollRef,setLeftShowShopButton,setRightShowShopButton)
  //     cateScrollRef.current.addEventListener("scroll",()=>{
  //       updateButton(cateScrollRef,setLeftShowCateButton,setRightShowCateButton)
  //     })
  //     shopScrollRef.current.addEventListener("scroll",()=>{
  //       updateButton(shopScrollRef,setLeftShowShopButton,setRightShowShopButton)
  //     }) 
  //   }

  //   return ()=>{cateScrollRef.current.removeEventListener("scroll",()=>{
  //       updateButton(cateScrollRef,setLeftShowCateButton,setRightShowCateButton)
  //     })
  //     shopScrollRef.current.removeEventListener("scroll",()=>{
  //       updateButton(shopScrollRef,setLeftShowShopButton,setRightShowShopButton)
  //     })}

  // },[categories])

  useEffect(() => {
    if (!cateScrollRef.current || !shopScrollRef.current) return;

    const handleCateScroll = () => {
      updateButton(
        cateScrollRef,
        setLeftShowCateButton,
        setRightShowCateButton
      );
    };

    const handleShopScroll = () => {
      updateButton(
        shopScrollRef,
        setLeftShowShopButton,
        setRightShowShopButton
      );
    };

    // Initial state
    handleCateScroll();
    handleShopScroll();

    // Add listeners
    cateScrollRef.current.addEventListener("scroll", handleCateScroll);
    shopScrollRef.current.addEventListener("scroll", handleShopScroll);

    // Cleanup
    return () => {
      cateScrollRef.current?.removeEventListener("scroll", handleCateScroll);
      shopScrollRef.current?.removeEventListener("scroll", handleShopScroll);
    };
  }, [categories, shopInMyCity]);




  return (
    <div className='w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-y-auto'>
      <Nav></Nav>
      
      {searchItems && searchItems.length>0 && (
        <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-5 bg-white shadow-md rounded-2xl mt-4'>
           <h1 className='text-gray-900 text-2xl sm:text-3xl font-semibold border-b border-gray-200 pb-2'>
            Search result
            </h1> 
            <div className='w-full h-auto flex flex-wrap gap-6 justify-center'>
              {searchItems.map((item)=>(
                <FoodCard data={item} key={item._id}></FoodCard>
              ))}
            </div>
        </div>
      )}
      {/* first order  */}
      <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>

        <h1 className='text-gray-800 text-2xl sm:text-3xl'>Inspiration for your first order</h1>
        <div className='w-full relative'>

          {/* left button  */}
          {showLeftCateButton && <button className='absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 cursor-pointer' onClick={() => scrollHandler(cateScrollRef, "left")}><FaArrowCircleLeft></FaArrowCircleLeft></button>}

          <div className='w-full flex overflow-x-auto gap-4 pb-2' ref={cateScrollRef}>
            {categories.map((cate, index) => (
              <CategoryCard name={cate.category} image={cate.image} key={index} onClick={()=>handleFilterByCategory(cate.category)}></CategoryCard>
            ))}
          </div>

          {/* right button  */}
          {showRightCateButton && <button className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 cursor-pointer' onClick={() => scrollHandler(cateScrollRef, "right")}><FaArrowCircleRight></FaArrowCircleRight></button>}

        </div>


      </div>

      {/* nearest shop  */}
      <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>
        <h1 className='text-gray-800 text-2xl sm:text-3xl'>Best shop in {city} </h1>

        <div className='w-full relative'>

          {/* left button  */}
          {showLeftShopButton && <button className='absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 cursor-pointer' onClick={() => scrollHandler(shopScrollRef, "left")}><FaArrowCircleLeft></FaArrowCircleLeft></button>}

          <div className='w-full flex overflow-x-auto gap-4 pb-2' ref={shopScrollRef}>
            {shopInMyCity?.map((shop, index) => (
              <CategoryCard name={shop.name} image={shop.image} key={index} onClick={()=>navigate(`/shop/${shop._id}`)}></CategoryCard>
            ))}
          </div>

          {/* right button  */}
          {showRightShopButton && <button className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 cursor-pointer' onClick={() => scrollHandler(shopScrollRef, "right")}><FaArrowCircleRight></FaArrowCircleRight></button>}

        </div>

      </div>

      {/* all product  */}
      <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>
        <h1 className='text-gray-800 text-2xl sm:text-3xl'>Suggested food items</h1>

        <div className='w-full h-auto flex flex-wrap gap-[20px] justify-center'>
            {updatedItemsList?.map((item,index)=>(
              <FoodCard key={index} data={item}></FoodCard>
            ))}
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
