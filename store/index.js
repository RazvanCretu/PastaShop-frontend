import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./cartSlice";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () =>
  configureStore({
    reducer: {
      [cartSlice.name]: cartSlice.reducer,
    },
    devTools: true,
  });

const wrapper = createWrapper(makeStore);

export default makeStore();
