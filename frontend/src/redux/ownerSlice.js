import { createSlice } from "@reduxjs/toolkit";

const ownerslice = createSlice({
    name:"owner",
    initialState:{
        myShopData:null,
        
    },
    reducers:{ // action perform krne ke liye reducers
        setMyShopData:(state, action)=>{
            state.myShopData =  action.payload
        },
        setCity:(state, action)=>{
            state.city =  action.payload
        },

    }
})

export const {setMyShopData} = ownerslice.actions
export default ownerslice.reducer