import {configureStore} from '@reduxjs/toolkit';
import sellerReducer from './action';

export const storeSeller = configureStore({
  reducer:{
    sellerState:sellerReducer
  }
});

