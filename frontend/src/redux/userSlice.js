import { createSlice } from "@reduxjs/toolkit";

const userslice = createSlice({
    name:"user",
    initialState:{
        userData:null,
        city:null,
        state:null,
        currentaddress:null,
        shopInMyCity:null,
        itemsInMyCity:null,
        cartItem: [],
        totalAmount: 0,
        myOrders:[],
        searchItems:null
    },
    reducers:{ // action perform krne ke liye reducers
        setuserData:(state, action)=>{
            state.userData =  action.payload
        },
        setCity:(state, action)=>{
            state.city =  action.payload
        },
        setState:(state, action)=>{
            state.state =  action.payload
        },
        setCurrentAddress:(state, action)=>{
            state.currentaddress =  action.payload
        },
        setShopsInMyCity:(state, action)=>{
            state.shopInMyCity =  action.payload
        },
        setItemsInMyCity:(state, action)=>{
            state.itemsInMyCity =  action.payload
        },
        addToCart:(state,action)=>{
            const cartItem = action.payload
            const existingItem = state.cartItem.find(i=>i.id == cartItem.id)
            if(existingItem){
                existingItem.quantity += cartItem.quantity
            }else{
                state.cartItem.push(cartItem)
            }
            // console.log(state.cartItem)
            // console.log(JSON.parse(JSON.stringify(state.cartItem)))
            state.totalAmount = state.cartItem.reduce((sum,i)=>sum+i.price*i.quantity,0)
        },
        updateQuantity:(state,action)=>{
            const {id,quantity}=action.payload
            const item = state.cartItem.find(i=>i.id==id)
            if(item){
                item.quantity = quantity
            }
            state.totalAmount = state.cartItem.reduce((sum,i)=>sum+i.price*i.quantity,0)
        },
        removeCartItem:(state,action)=>{
            state.cartItem = state.cartItem.filter(i=>i.id!==action.payload)
            state.totalAmount = state.cartItem.reduce((sum,i)=>sum+i.price*i.quantity,0)
        },
        setMyOrders:(state,action)=>{
            state.myOrders=action.payload
        },
        addMyOrder:(state,action)=>{
            state.myOrders=[action.payload,...state.myOrders]
        },
        updateOrderStatus:(state,action)=>{
            const {orderId,shopId,status} = action.payload
            const order = state.myOrders.find(o=>o._id==orderId)
            if(order){
                if(order.shopOrder && order.shopOrder.shop._id==shopId){
                    order.shopOrder.status=status
                }
            } 
        },
        setSearchItems:(state,action)=>{
            state.searchItems = action.payload
        }
    }
})

export const {setuserData, setCity , setState , setCurrentAddress , setShopsInMyCity,setItemsInMyCity,addToCart,updateQuantity,removeCartItem,setMyOrders,addMyOrder,updateOrderStatus,setSearchItems} = userslice.actions
export default userslice.reducer