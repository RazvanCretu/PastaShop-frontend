import Link from "next/link";
import { useRouter } from "next/router";
import { AppBar, Box, Button, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
// import { useThemeCtx } from "../contexts/themeContext";

const pages = [
  { name: "Home", path: "/" },
  { name: "Store", path: "/store" },
];

const Layout = (props) => {
  const theme = useTheme();
  // const toggleTheme = useThemeCtx();
  const router = useRouter();

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
        </Box>
        <Box
          sx={{
            height: "5vh",
            display: "flex",
            alignItems: "center",
            marginLeft: "1rem",
            "& :nth-of-type(n)": {
              marginLeft: ".5rem",
            },
          }}
        >
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
        </Box>
      </AppBar>
      <Container component="main">{props.children}</Container>
    </>
  );
};

export default Layout;
