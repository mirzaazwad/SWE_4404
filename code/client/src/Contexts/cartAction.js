import { createSlice } from '@reduxjs/toolkit';
import { cartPharmacyManager } from './cartManager';

const initialState = localStorage.getItem("cartState") ? JSON.parse(localStorage.getItem("cartState")) : [];

const cartSlice = createSlice({
  name: "cartState",
  initialState: initialState,
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("cartState", JSON.stringify(state));
    },
    removeItem: (state, action) => {
      const newState = state.filter((item, index) => index !== action.payload.index);
      localStorage.setItem("cartState", JSON.stringify(newState));
      if(newState.length==0){
        cartPharmacyManager("");
        localStorage.removeItem("cartPharmacyManager");
      }
      return newState;
    },
    clearItems: (state) => {
      localStorage.setItem("cartState", JSON.stringify([]));
      cartPharmacyManager("");
      localStorage.removeItem("cartPharmacyManager");
      return [];
    },
    updateItem: (state, action) => {
      const newState = state.map((item) => {
        if (item.id === action.payload.id && item.medicineId === action.payload.medicineId) {
          return {
            ...item,
            quantityPcs: parseInt(action.payload.quantityPcs) + parseInt(item.quantityPcs),
            quantityStrips: parseInt(action.payload.quantityStrips) + parseInt(item.quantityStrips),
            quantityBoxes: parseInt(action.payload.quantityBoxes) + parseInt(item.quantityBoxes),
            price: parseInt(action.payload.price) + parseInt(item.price)
          };
        }
        return item;
      });
      localStorage.setItem("cartState", JSON.stringify(newState));
      return newState;
    },
  },
});

export const { addItem, removeItem, updateItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
