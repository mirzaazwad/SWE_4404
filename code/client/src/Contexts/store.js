import {configureStore} from '@reduxjs/toolkit';
import userReducer from './action';
import cartReducer from './cartAction';
import pharmacyCartReducer from './pharmacyCartAction';

export const store = configureStore({
  reducer:{
    userState:userReducer,
    cartState:cartReducer,
    pharmacyCartState:pharmacyCartReducer
  }
});
export default store;
