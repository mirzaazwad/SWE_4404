import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: {}
}

export const buyer=createSlice({
  name:"buyerState",
  initialState,
  reducers:{
    setUser:(state,action)=>{
      state.value=action.payload;
    }
  }
});

export const {setUser} =buyer.actions;
export default buyer.reducer;