import Link from "next/link";
import { useRouter } from "next/router";
import { AppBar, Box, Button, IconButton } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
// import { useThemeCtx } from "../contexts/themeContext";
import { selectCart } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const pages = [
  { name: "Home", path: "/" },
  { name: "Store", path: "/store" },
];

const Links = styled(Box)(({ theme }) => ({
  height: "5vh",
  display: "flex",
  alignItems: "center",
  marginLeft: "1rem",
  "& :nth-of-type(n)": {
    marginLeft: ".5rem",
  },
}));

const CartIcon = styled(IconButton)(({ theme, items }) => ({
  position: "relative",
  "&:after": {
    content: `"${items
      .reduce((total, item) => total + item.qty, 0)
      .toString()}"`,
    display: items.length === 0 ? "none" : "flex",
    height: "28px",
    width: "28px",
    alignItems: "center",
    justifyContent: "center",
    background: "red",
    borderRadius: "50%",
    position: "absolute",
    top: 0,
    right: 0,
    padding: "15px",
    transform: "scale(.5) translate(50%,-50%)",
    fontSize: "1.4rem",
    fontWeight: 700,
    border: "3px solid white",
  },
}));

const Layout = (props) => {
  const theme = useTheme();
  // const toggleTheme = useThemeCtx();
  const router = useRouter();

  const cart = useSelector(selectCart);
  // console.log(cart);

  return (
    <>
      <AppBar sx={{ display: "flex", flexFlow: "row" }} component="nav">
        <Box sx={{ display: "flex", alignItems: "center", marginLeft: "1rem" }}>
          <IconButton onClick={theme.toggler}>
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
          <CartIcon items={cart}>
            <ShoppingCartRoundedIcon />
          </CartIcon>
        </Box>
        <Links>
          {pages.map((page) => {
            return (
              <Button
                key={page.name}
                variant={router.pathname === page.path ? "contained" : "text"}
                component={Link}
                href={page.path}
                size="small"
                color="info"
              >
                {page.name}
              </Button>
            );
          })}
        </Links>
      </AppBar>
      <Container component="main">{props.children}</Container>
    </>
  );
};

export default Layout;
