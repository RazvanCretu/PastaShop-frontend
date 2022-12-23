import { createSlice } from "@reduxjs/toolkit";
// import { HYDRATE } from "next-redux-wrapper";

// Initial state
const initialState = {
  isCartOpen: false,
  cart: [{}, {}, {}],
  items: [],
};

// Actual Slice
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    addToCart: (state, action) => {
      state.cart.push(action.payload.item);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
    increaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          item.count++;
        }
        return item;
      });
    },
    decreaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id && item.count > 1) {
          item.count--;
        }
        return item;
      });
    },
    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
  //   extraReducers: (builder) => {
  //     builder.addCase(HYDRATE, (state, action) => ({
  //       ...state,
  //       ...action.payload.cart,
  //     }));
  //   },
});

// Selectors

export const selectCart = (state) => state.cart.cart;

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
