import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import store from "./store";

const 초기값 :[{id: number, event_origin: string , eventName: string }] = [{id: 0, event_origin: '', eventName: ''}]

let coupon = createSlice({
    name: 'coupon',
    initialState: 초기값,
    reducers: {
        recieve(state, action){
            return state = action.payload;   
        },
        clear(state, action) {
           return state = action.payload; 
        },
        usage(state, action) {            
            // action.payload  {event_origin: 'event1', useridx: 103}
            axios.post('https://www.springstar.shop/deletecoupon', action.payload )
            .then((r) => {
                // console.log(r.data)   // {msg: '삭제'}
            }) 
            return state
        }
    }
})

export let { recieve, usage, clear } = coupon.actions;
export type RooteState3 = ReturnType<typeof store.getState>
export default coupon;