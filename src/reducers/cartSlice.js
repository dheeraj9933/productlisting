import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.items = action.payload
    },
    editQuantity: (state, action) => {
      state.items = action.payload
    },
  },
});
export const { addToCart, removeFromCart, editQuantity } = counterSlice.actions

export default counterSlice.reducer