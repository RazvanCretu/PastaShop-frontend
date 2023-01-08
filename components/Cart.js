import { useRef } from "react";
import { useRouter } from "next/router";
import {
  AppBar,
  Button,
  Container,
  Divider,
  Backdrop,
  Typography,
} from "@mui/material";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import useClickAway from "../utils/useClickAway";

const Cart = ({ isCartOpen, setIsCartOpen, cart }) => {
  const router = useRouter();
  const cartBarRef = useRef(null);

  useClickAway(cartBarRef, () => setIsCartOpen(false));

  const handleCheckout = () => {
    setIsCartOpen(false);
    router.push("/checkout");
  };

  const cartTotal = Object.keys(cart)
    .map((item) => cart[item])
    .reduce((total, item) => total + item.qty * item.price, 0);

  return (
    <Backdrop
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isCartOpen}
      unmountOnExit
    >
      <AppBar
        sx={{
          width: 300,
          height: "100%",
          borderTopLeftRadius: "20px",
          borderBottomLeftRadius: "20px",
        }}
        ref={cartBarRef}
      >
        <Container sx={{ pt: "24px" }}>
          <Typography pb="24px" variant="h3">
            Cart
          </Typography>
          {Object.keys(cart).map((item, i) => {
            return (
              <Typography key={i}>
                {cart[item].name}
                {"    "}
                {cart[item].qty}
                {"    "}x{"    "}
                {cart[item].price}$
              </Typography>
            );
          })}
          <Divider sx={{ pt: "12px" }} />
          <Typography pt="12px">Total: {cartTotal}$</Typography>
          <Button
            variant="contained"
            endIcon={<ShoppingCartCheckoutRoundedIcon />}
            onClick={handleCheckout}
            sx={{ mt: "1rem", minWidth: "100%" }}
          >
            Pay: {cartTotal} $
          </Button>
        </Container>
      </AppBar>
    </Backdrop>
  );
};

export default Cart;
