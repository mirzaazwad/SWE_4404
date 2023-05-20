import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem("pharmacyCartState") ? JSON.parse(localStorage.getItem("pharmacyCartState")) : [];

const pharmacyCartSlice = createSlice({
  name: "pharmacyCartState",
  initialState: initialState,
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("pharmacyCartState", JSON.stringify(state));
    },
    removeItem: (state, action) => {
      const newState = state.filter((item, index) => index !== action.payload.index);
      localStorage.setItem("pharmacyCartState", JSON.stringify(newState));
      if(newState.length===0){
        localStorage.removeItem("pharmacyCartPharmacyManager");
      }
      return newState;
    },
    clearItems: (state) => {
      localStorage.setItem("pharmacyCartState", JSON.stringify([]));
      localStorage.removeItem("pharmacyCartPharmacyManager");
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
            price: action.payload.price + item.price
          };
        }
        return item;
      });
      localStorage.setItem("pharmacyCartState", JSON.stringify(newState));
      return newState;
    },
    updatePrescriptionImage: (state, action) => {
      const newState = state.map((item) => {
        if (item.id === action.payload.id && item.medicineId === action.payload.medicineId) {
          return {
            ...item,
            prescriptionImage: action.payload.prescriptionImage
          };
        }
        return item;
      });
      localStorage.setItem("pharmacyCartState", JSON.stringify(newState));
      return newState;
    }
  },
});

export const { addItem, removeItem, updateItem, clearItems, updatePrescriptionImage } = pharmacyCartSlice.actions;

export default pharmacyCartSlice.reducer;
