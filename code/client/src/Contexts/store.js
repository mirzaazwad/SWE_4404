import {configureStore} from '@reduxjs/toolkit';
import userReducer from './action';

export const storeBuyer = configureStore({
  reducer:{
    userState:userReducer
  }
});

