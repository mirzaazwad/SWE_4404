import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loginSignUp: 0,
  buyerState: {},
  sellerState: {},
  sellerDetails: {},
  notificationCount:0
}
export const userSlice=createSlice({
  name:"userState",
  initialState,
  reducers:{
    LOGIN:(state,action)=>{
      state.user=action.payload;
    },
    LOGOUT:(state)=>{
      state.user=null;
      state.loginSignUp=0;
    },
    setLogin:(state)=>{
      state.loginSignUp=0;
    },
    setSignUp:(state)=>{
      state.loginSignUp=1;
    },
    setBuyerUser:(state,action)=>{
      state.buyerState=action.payload;
    },
    setSellerUser:(state,action)=>{
      state.sellerState=action.payload;
    },
    setSellerDetails:(state,action)=>{
      state.sellerDetails=action.payload;
    },
    setSocketID:(state,action)=>{
      state.socketID=action.payload;
    },
    addNotification:(state,action)=>{
      state.notificationCount=state.notificationCount+action.payload;
    },
    subNotification:(state,action)=>{
      state.notificationCount=state.notificationCount-action.payload;
    },
    setNotification:(state,action)=>{
      state.notificationCount=action.payload;
    }
  }
});

export const {LOGIN,LOGOUT,setLogin,setSignUp,setBuyerUser,setNotification,setSellerUser,setSellerDetails,addNotification,subNotification} =userSlice.actions;
export default userSlice.reducer;