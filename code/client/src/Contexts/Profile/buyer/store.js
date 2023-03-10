import {configureStore} from '@reduxjs/toolkit';
import buyerReducer from './action';

export const storeBuyer = configureStore({
  reducer:{
    buyerState:buyerReducer
  }
});

