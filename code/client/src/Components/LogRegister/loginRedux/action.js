import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  id:"0"
}

export const loginSlice=createSlice({
  name:"loginState",
  initialState,
  reducers:{
    setLogin:(state)=>{
      state.value=0
    },
    setSignUp:(state)=>{
      state.value=1
    },
    setSignUpPhone:(state,action)=>{
      state.value=2
      state.id=action.payload
    }
  }
});

export const {setLogin,setSignUp,setSignUpPhone} =loginSlice.actions;
export default loginSlice.reducer;