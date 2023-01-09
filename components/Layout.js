import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCart } from "../store/cartSlice";
import Cart from "./Cart";
import Navigation from "./Navigation";

const Layout = (props) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useSelector(selectCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <Navigation setIsCartOpen={setIsCartOpen} cart={cart} />
      {props.children}
      <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} cart={cart} />
    </>
  );
};

export default Layout;
