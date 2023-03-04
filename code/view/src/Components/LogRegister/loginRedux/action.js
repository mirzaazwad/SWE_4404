import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: true,
}

export const loginSlice=createSlice({
  name:"loginState",
  initialState,
  reducers:{
    setLogin:(state)=>{
      state.value=state.value^1
    }
  }
});

export const {setLogin} =loginSlice.actions;
export default loginSlice.reducer;