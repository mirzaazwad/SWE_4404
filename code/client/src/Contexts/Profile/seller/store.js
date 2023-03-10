import {configureStore} from '@reduxjs/toolkit';
import sellerReducer from './action';

export const store = configureStore({
  reducer:{
    sellerState:sellerReducer
  }
});

