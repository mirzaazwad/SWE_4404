import { createContext, useReducer } from "react";

export const BuyerContext=createContext();

export const buyerReducer = (state) =>{
  
}

export const BuyerContextProvider = ({children}) => {
  const [state,dispatch]=useReducer(buyerReducer,{
    buyerProfile:null
  });
  dispatch({type:'SET_PROFILE_INFORMATION',payload:[]})
  return (  
    <BuyerContext.Provider>
      {children}
    </BuyerContext.Provider>
  );
}