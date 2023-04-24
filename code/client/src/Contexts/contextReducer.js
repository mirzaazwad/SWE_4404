import React from 'react';
import {createContext, useContext, useReducer,useEffect} from 'react';
const CartStateContext = createContext();
const CartDispatchContext = createContext();
const reducer=(state,action)=>{
    if(action.type==="ADD")
    {
        return [...state,{id: action.id, medicineId: action.medicineId, quantityPcs: action.quantityPcs, quantityStrips: action.quantityStrips, quantityBoxes: action.quantityBoxes }];
    }
    else if(action.type==="REMOVE")
    {
        let newArr = [...state]
        newArr.splice(action.index, 1)
        return newArr;
    }
    else if(action.type === "UPDATE") {
        const updatedArr = state.map((medicine) => {
          if (medicine.id === action.id && medicine.medicineId === action.medicineId) {
            console.log("found");
            return {
              ...medicine,
              quantityPcs: parseInt(action.quantityPcs) + parseInt(medicine.quantityPcs),
              quantityStrips: parseInt(action.quantityStrips) + parseInt(medicine.quantityStrips),
              quantityBoxes: parseInt(action.quantityBoxes) + parseInt(medicine.quantityBoxes)
            };
          }
          return medicine;
        });
        return updatedArr;
      }
    else
    {
        console.log("error in reducer function");
    }   
}
export const CartProvider=({children})=>{
  const [state, dispatch] = useReducer(reducer, [], () => {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);
  return(
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
        </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  )
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);