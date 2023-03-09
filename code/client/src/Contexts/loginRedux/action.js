import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: 0
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
    }
  }
});

export const {setLogin,setSignUp} =loginSlice.actions;
export default loginSlice.reducer;