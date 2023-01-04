import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  isCartOpen: false,
  cartItems: {},
};

// Actual Slice
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartItems = action.payload;
    },
    addToCart: (state, action) => {
      const isItemInCart = state.cartItems.hasOwnProperty(action.payload.name);
      if (!isItemInCart) {
        state.cartItems[action.payload.name] = {
          ...action.payload,
          qty: 1,
        };
      } else {
        state.cartItems[action.payload.name].qty++;
      }
    },

    removeFromCart: (state, action) => {
      delete state.cartItems[action.payload.name];
    },
    increaseCount: (state, action) => {
      state.cartItems[action.payload.name].qty++;
    },
    decreaseCount: (state, action) => {
      if (state.cartItems[action.payload.name].qty === 1) {
        delete state.cartItems[action.payload.name];
      } else {
        state.cartItems[action.payload.name].qty--;
      }
    },
    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

// Selectors

export const selectCart = (state) => state.cart;

// Actions

export const {
  setItems,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
} = cartSlice.actions;

// Cart Reducer

export default cartSlice.reducer;
