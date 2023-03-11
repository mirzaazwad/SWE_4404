import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: {}
}

export const seller=createSlice({
  name:"sellerState",
  initialState,
  reducers:{
    setUser:(state,action)=>{
      state.value=action.payload;
    }
  }
});

export const {setUser} =seller.actions;
export default seller.reducer;