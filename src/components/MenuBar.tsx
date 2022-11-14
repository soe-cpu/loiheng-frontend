import {
  AppBar,
  Box,
  Button,
  colors,
  Container,
  Drawer,
  IconButton,
  InputBase,
  Stack,
  styled,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

const MenuBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [drawer, setDrawer] = React.useState(false);
  const open = Boolean(drawer);
  const handleClickDrawer = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDrawer(true);
  };
  const handleClose = () => {
    setDrawer(false);
  };

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: colors.blue[500],
          color: "#fff",
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              height: "40px",
              display: isMobile ? "none" : "flex",
            }}
            spacing={8}
          >
            <Box>
              <Link href={"/"} legacyBehavior>
                <MenuLink>HOME</MenuLink>
              </Link>
            </Box>
            <Box>
              <MenuLink>PRODUCT</MenuLink>
            </Box>
            <Box>
              <MenuLink>DEALS & PROMOTION</MenuLink>
            </Box>
            <Box>
              <Link href={"/about-us"} legacyBehavior>
                <MenuLink>ABOUT US</MenuLink>
              </Link>
            </Box>
            <Box>
              <Link href={"/contact-us"} legacyBehavior>
                <MenuLink>CONTACT US</MenuLink>
              </Link>
            </Box>
            <Box>
              <Link href={"/rma"} legacyBehavior>
                <MenuLink>RMA</MenuLink>
              </Link>
            </Box>
          </Stack>
          <AppBar
            elevation={1}
            color={"inherit"}
            sx={{ display: isMobile ? "block" : "none", zIndex: 100000000 }}
          >
            <Toolbar>
              <IconButton onClick={toggleDrawer}>
                {drawer && <CloseIcon />}
                {!drawer && <MenuIcon />}
              </IconButton>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon sx={{ color: "gray" }} />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
                <Box sx={{ position: "relative" }}>
                  <Link href={"/"}>
                    <img src="/loi-heng-logo.png" alt={"Logo"} height="40px" />
                  </Link>
                </Box>
              </Box>
            </Toolbar>
          </AppBar>
        </Container>
      </Box>
      <Offset
        sx={{
          display: { xs: "flex", lg: "none" },
        }}
      />
      <Drawer
        variant="temporary"
        open={open}
        onClose={handleClose}
        anchor={"left"}
        sx={{
          display: { lg: "none" },
          "&.MuiPaper-root": {
            borderLeft: `1px solid ${colors.red[500]}`,
          },
        }}
        elevation={20}
      >
        <Box
          width={"220px"}
          sx={{
            marginTop: "64px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link href={"/"} legacyBehavior>
            <StyledMenuLink>Home</StyledMenuLink>
          </Link>
          <Link href={"/"} legacyBehavior>
            <StyledMenuLink>PRODUCT</StyledMenuLink>
          </Link>
          <Link href={"/"} legacyBehavior>
            <StyledMenuLink>DEALS & PROMOTION</StyledMenuLink>
          </Link>
          <Link href={"/about-us"} legacyBehavior>
            <StyledMenuLink>ABOUT US</StyledMenuLink>
          </Link>
          <Link href={"/contact-us"} legacyBehavior>
            <StyledMenuLink>CONTACT US</StyledMenuLink>
          </Link>
          <Link href={"/"} legacyBehavior>
            <StyledMenuLink>RMA</StyledMenuLink>
          </Link>
          <Link href={"/auth/login"} legacyBehavior>
            <StyledMenuLink>Login</StyledMenuLink>
          </Link>
          <Link href={"/auth/register"} legacyBehavior>
            <StyledMenuLink>Register</StyledMenuLink>
          </Link>
        </Box>
      </Drawer>
    </Box>
  );
};
const Offset = styled(Toolbar)(({ theme }) => ({
  ...theme.mixins.toolbar,
}));
const MenuLink = styled("a")(({ theme }) => ({
  color: "#fff",
  textDecoration: "none",
  fontWeight: 400,
  cursor: "pointer",
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.spacing(40),
  backgroundColor: colors.grey[200],
  "&:hover": {
    backgroundColor: colors.grey[300],
  },
  width: "250px",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 0, 0, 1),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));

const StyledMenuLink = styled("a")(({ theme }) => ({
  backgroundColor: colors.blue[100],
  width: "200px",
  fontWeight: 600,
  textDecoration: "none",
  color: colors.blue[700],
  borderRadius: "4px",
  border: `0px`,
  padding: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: colors.blue[200],
  },
}));
export default MenuBar;
