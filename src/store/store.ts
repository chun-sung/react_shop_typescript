import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './user'
import cart from './cart'
import coupon from './coupon'
import board from './board'

export default configureStore({        //생성한 state 등록
  reducer: {
      user: user.reducer,
      cart: cart.reducer,
      coupon: coupon.reducer,
      board: board.reducer,
   }
}) 
