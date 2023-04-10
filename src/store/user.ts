import { createSlice, configureStore } from '@reduxjs/toolkit'

const 초기값 :{msg:string, jwttoken:string, nickName:string, user_id:string} = {msg:'', jwttoken:'', nickName:'', user_id:''}

let user = createSlice({       // useState() 역할 임 (state 하나를 slice라고 부름)
    name: 'user',
    initialState: 초기값,
    reducers: {
        login(state, action){
          return  state = action.payload 
        },
        logout(state, action){            
           return state = action.payload;
        },
        reset(state) {
            return state = state
        }
    }
})

let store = configureStore({
  reducer: {
    user: user.reducer
  }
})

export let { login, logout, reset } = user.actions;
export default user;
export type RootState = ReturnType<typeof store.getState>