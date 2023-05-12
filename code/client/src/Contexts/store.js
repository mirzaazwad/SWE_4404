import {configureStore} from '@reduxjs/toolkit';
import userReducer from './action';
import cartReducer from './cartAction';
import cartManagerReducer from './cartManager';

export const store = configureStore({
  reducer:{
    userState:userReducer,
    cartState:cartReducer,
    cartManagerState:cartManagerReducer
  }
});
export default store;
