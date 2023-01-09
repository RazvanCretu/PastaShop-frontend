import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCart } from "../store/cartSlice";

const SuccessPage = () => {
  const query = new URLSearchParams(window.location.search);
  const dispatch = useDispatch();

  useEffect(() => {
    if (query.get("confirmed")) {
      dispatch(setCart({}));
    }
  }, []);

  return <div></div>;
};

export default SuccessPage;
