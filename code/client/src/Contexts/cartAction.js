import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem("cartState") ? JSON.parse(localStorage.getItem("cartState")) : [];

const cartSlice = createSlice({
  name: "cartState",
  initialState: initialState,
  reducers: {
    addItem: (state, action) => {
      state.push({
        id: action.payload.id,
        medicineId: action.payload.medicineId,
        quantityPcs: action.payload.quantityPcs,
        quantityStrips: action.payload.quantityStrips,
        quantityBoxes: action.payload.quantityBoxes,
      });
      localStorage.setItem("cartState", JSON.stringify(state));
    },
    removeItem: (state, action) => {
      const newState = state.filter((item, index) => index !== action.payload.index);
      localStorage.setItem("cartState", JSON.stringify(newState));
      return newState;
    },
    clearItems: (state) => {
      localStorage.setItem("cartState", JSON.stringify([]));
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
