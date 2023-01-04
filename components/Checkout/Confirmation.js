import { Box, Typography, Divider } from "@mui/material";
import { selectCart } from "../../store/cartSlice";
import { useSelector } from "react-redux";

const Confirmation = ({ values }) => {
  const { cartItems } = useSelector(selectCart);

  return (
    <>
      <Typography variant="h4">Shipping Information</Typography>
      <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
      {Object.keys(values).map((item, i) => (
        <Box key={i} display="flex" justifyContent="space-around" gap="1rem">
          <Typography variant="subtitle1" color="secondary">
            {item}
          </Typography>
          <Typography variant="subtitle1">{values[item]}</Typography>
        </Box>
      ))}
      <Typography variant="h4">Products</Typography>
      <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
      {Object.values(cartItems).map((item, i) => (
        <Box
          key={i}
          display="flex"
          justifyContent="space-between"
          m="auto 5rem"
        >
          <Typography variant="h6">{item.name}</Typography>
          <Box>
            <Typography variant="body1">{`${item.qty} x ${item.price} $`}</Typography>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default Confirmation;
