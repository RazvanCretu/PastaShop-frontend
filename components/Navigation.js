import { AppBar, Box, Button, IconButton, Badge } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import Link from "../utils/nextLinkMuiAdapter.js";

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

const Navigation = ({ cart, setIsCartOpen }) => {
  const router = useRouter();
  const theme = useTheme();
  return (
    <AppBar sx={{ display: "flex", flexFlow: "row" }} component="nav">
      <Box sx={{ display: "flex", alignItems: "center", marginLeft: "1rem" }}>
        <IconButton onClick={theme.toggler}>
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
        <IconButton onClick={() => setIsCartOpen(true)}>
          <Badge
            badgeContent={Object.keys(cart)
              .map((item) => cart[item])
              .reduce((total, item) => total + item.qty, 0)}
            color="success"
          >
            <ShoppingCartRoundedIcon />
          </Badge>
        </IconButton>
      </Box>
      <Links>
        {pages.map((page) => {
          return (
            <Button
              key={page.name}
              href={page.path}
              component={Link}
              variant={router.pathname === page.path ? "contained" : "text"}
              size="small"
            >
              {page.name}
            </Button>
          );
        })}
      </Links>
    </AppBar>
  );
};

export default Navigation;
