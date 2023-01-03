import { selectCart } from "../store/cartSlice";
import { useSelector } from "react-redux";
import { useState } from "react";

import Cart from "./Cart";
import Navigation from "./Navigation";

const Layout = (props) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems } = useSelector(selectCart);

  return (
    <>
      <Navigation setIsCartOpen={setIsCartOpen} cartItems={cartItems} />
      {props.children}
      <Cart
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        cartItems={cartItems}
      />
    </>
  );
};

export default Layout;
