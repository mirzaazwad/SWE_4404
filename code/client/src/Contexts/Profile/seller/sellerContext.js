import { createContext, useReducer } from "react";

export const SellerContext=createContext();

export const sellerReducer = (state) =>{
  
}

export const SellerContextProvider = ({children}) => {
  const [state,dispatch]=useReducer(sellerReducer,{
    sellerProfile:null
  });
  dispatch({type:'SET_PROFILE_INFORMATION',payload:[]})
  return (  
    <SellerContext.Provider>
      {children}
    </SellerContext.Provider>
  );
}