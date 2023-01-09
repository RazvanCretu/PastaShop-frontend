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
  display: "flex",
  alignItems: "center",
  marginLeft: "5rem",
  "& :not(:first-of-type):nth-of-type(n)": {
    marginLeft: ".5rem",
  },
  "& .MuiLink-root": {
    color: theme.palette.secondary.light,
  },
}));

const Navigation = ({ cart, setIsCartOpen }) => {
  const router = useRouter();
  const theme = useTheme();

  return (
    <AppBar
      sx={{
        height: "3.5rem",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
      component="nav"
    >
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
      <Box sx={{ display: "flex", alignItems: "center", marginRight: "3rem" }}>
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
    </AppBar>
  );
};

export default Navigation;
