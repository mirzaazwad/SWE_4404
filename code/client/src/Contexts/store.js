import {configureStore} from '@reduxjs/toolkit';
import userReducer from './action';
import cartReducer from './cartAction';

export const store = configureStore({
  reducer:{
    userState:userReducer,
    cartState:cartReducer
  }
});
export default store;
