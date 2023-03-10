import {configureStore} from '@reduxjs/toolkit';
import loginReducer from './action';

export const store = configureStore({
  reducer:{
    loginState:loginReducer
  }
});

