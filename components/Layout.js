import { selectCart } from "../store/cartSlice";
import { useSelector } from "react-redux";
import { useState } from "react";

import Cart from "./Cart";
import Navigation from "./Navigation";

const Layout = (props) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useSelector(selectCart);

  return (
    <>
      <Navigation setIsCartOpen={setIsCartOpen} cart={cart} />
      {props.children}
      <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} cart={cart} />
    </>
  );
};

export default Layout;
