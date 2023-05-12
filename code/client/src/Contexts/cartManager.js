import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartManager: localStorage.getItem("cartPharmacyManager") ? localStorage.getItem("cartPharmacyManager") : ""
}

const cartManagerSlice = createSlice({
  name: "cartManagerState",
  initialState: initialState,
  reducers: {
    cartPharmacyManager: (state, action) => {
      state.cartManager=action.payload;
      localStorage.setItem("cartPharmacyManager", state.cartManager);
    }
  }
});

export const { cartPharmacyManager } = cartManagerSlice.actions;

export default cartManagerSlice.reducer;
