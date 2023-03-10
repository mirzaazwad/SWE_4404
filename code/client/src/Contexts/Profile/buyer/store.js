import {configureStore} from '@reduxjs/toolkit';
import buyerReducer from './action';

export const store = configureStore({
  reducer:{
    buyerState:buyerReducer
  }
});

