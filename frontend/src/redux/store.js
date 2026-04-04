import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import ownerslice from "./ownerSlice"
import mapSlice from "./mapSlice"
export const store = configureStore({
    reducer:{
        user:userSlice,
        owner:ownerslice,
        map: mapSlice
         
    }
})