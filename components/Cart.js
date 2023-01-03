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

const Cart = ({ isCartOpen, setIsCartOpen, cartItems }) => {
  const router = useRouter();
  const cartBarRef = useRef(null);

  useClickAway(cartBarRef, () => setIsCartOpen(false));

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    router.push("/checkout");
  };

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
          {Object.keys(cartItems).map((item, i) => {
            return (
              <Typography key={i}>
                {cartItems[item].name}
                {"    "}
                {cartItems[item].qty}
                {"    "}x{"    "}
                {cartItems[item].price}$
              </Typography>
            );
          })}
          <Divider sx={{ pt: "12px" }} />
          <Typography pt="12px">
            Total:{" "}
            {Object.keys(cartItems)
              .map((item) => cartItems[item])
              .reduce((total, item) => total + item.qty * item.price, 0)}
            $
          </Typography>
          <Button
            variant="contained"
            endIcon={<ShoppingCartCheckoutRoundedIcon />}
            onClick={handleCheckoutClick}
            sx={{ mt: "1rem", minWidth: "100%" }}
          >
            Checkout
          </Button>
        </Container>
      </AppBar>
    </Backdrop>
  );
};

export default Cart;
