import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
export const serverUrl = "https://foodie-backendss.onrender.com"
import SignUp from './pages/SignUp'
import Signin from './pages/Signin'
import ForgetPassword from './pages/ForgetPassword'
import useGetCurrentUser from './hooks/useGetCurrentUser'
import { useSelector } from 'react-redux'
import Home from './pages/Home'
import useGetCity from './hooks/useGetCity'
import useGetMyshop from './hooks/useGetMyshop'
import CreatEditShop from './pages/CreatEditShop'
import AddFoodItem from './pages/AddFoodItem'
import EditItem from './pages/EditItem'
import useGetShopByCity from './hooks/useGetShopByCity';
import useGetItemsByCity from './hooks/useGetItemsByCity'
import CartPage from './pages/CartPage'
import CheckOut from './pages/CheckOut'
import OrderPlace from './pages/OrderPlace'
import MyOrder from './pages/MyOrder'
import useGetMyOrder from './hooks/useGetMyOrders'
import Shop from './pages/Shop'

const App = () => {
  useGetCurrentUser()
  useGetCity()
  useGetMyshop()
  useGetShopByCity()
  useGetItemsByCity()
  useGetMyOrder()
  const{userData} = useSelector(state=>state.user)
  // console.log("USER DATA IN APP:", userData)


  return (
    
    <Routes>
      <Route path='/signup' element={!userData?<SignUp></SignUp>:<Navigate to={"/"}></Navigate>}></Route>
      <Route path='/signin'  element={!userData?<Signin></Signin>:<Navigate to={"/"}></Navigate>}></Route>
      <Route path='/forget-password' element={!userData?<ForgetPassword></ForgetPassword>:<Navigate to={"/"}></Navigate>}></Route>
      <Route path='/' element={userData?<Home></Home>:<Navigate to={"/signin"}></Navigate>}></Route>
      <Route path='/create-edit-shop' element={userData?<CreatEditShop></CreatEditShop>:<Navigate to={"/signin"}></Navigate>}></Route>
      <Route path='/add-food' element={userData?<AddFoodItem></AddFoodItem>:<Navigate to={"/signin"}></Navigate>}></Route>
      <Route path='/edit-food/:itemId' element={userData?<EditItem></EditItem>:<Navigate to={"/signin"}></Navigate>}></Route>
      <Route path='/cart' element={userData?<CartPage></CartPage>:<Navigate to={"/signin"}></Navigate>}></Route>
      <Route path='/checkout' element={userData?<CheckOut></CheckOut>:<Navigate to={"/signin"}></Navigate>}></Route>
      <Route path='/order-placed' element={userData?<OrderPlace></OrderPlace>:<Navigate to={"/signin"}></Navigate>}></Route>
      <Route path='/my-orders' element={userData?<MyOrder></MyOrder>:<Navigate to={"/signin"}></Navigate>}></Route>
      <Route path='/shop/:shopId' element={userData?<Shop></Shop>:<Navigate to={"/signin"}></Navigate>}></Route>
    </Routes>
  )
}

export default App
