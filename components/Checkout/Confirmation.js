import { Typography, Divider } from "@mui/material";
import { selectCart } from "../../store/cartSlice";
import { useSelector } from "react-redux";

const Confirmation = ({ values }) => {
  const { cartItems } = useSelector(selectCart);

  return (
    <>
      <Typography variant="h4">Shipping Information</Typography>
      <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
      {Object.keys(values).map((item, i) => (
        <Typography key={i} variant="subtitle1">
          {JSON.stringify(values[item])}
        </Typography>
      ))}
      <Typography variant="h4">Cart Items</Typography>
      <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
      {Object.values(cartItems).map((item, i) => (
        <Typography key={i} variant="subtitle1">
          {JSON.stringify(item)}
        </Typography>
      ))}
    </>
  );
};

export default Confirmation;
