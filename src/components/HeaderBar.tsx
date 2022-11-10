import {
  Badge,
  Box,
  colors,
  Container,
  IconButton,
  InputBase,
  Stack,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Link from "next/link";

const HeaderBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box sx={{ display: isMobile ? "none" : "block" }}>
      <Container maxWidth="lg">
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{ height: "100px" }}
        >
          <Box sx={{ position: "relative", maxWidth: "200px" }}>
            <img src="/loi-heng-logo.png" alt={"Logo"} />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon sx={{ color: "gray" }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Badge badgeContent={4} color="primary">
              <FavoriteBorderOutlinedIcon color="action" />
            </Badge>
            <Badge badgeContent={4} color="primary">
              <NotificationsNoneOutlinedIcon color="action" />
            </Badge>
            <Badge badgeContent={4} color="primary">
              <ShoppingCartOutlinedIcon color="action" />
            </Badge>
            <Box sx={{ display: "flex", gap: 1, ml: 1 }}>
              <Link href={"/auth/login"} legacyBehavior>
                <a
                  style={{
                    textDecoration: "none",
                    fontWeight: 400,
                    color: "#000",
                  }}
                >
                  Login
                </a>
              </Link>
              <span>|</span>
              <Link href={"/auth/register"} legacyBehavior>
                <a
                  style={{
                    textDecoration: "none",
                    fontWeight: 400,
                    color: "#000",
                  }}
                >
                  Register
                </a>
              </Link>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.spacing(40),
  backgroundColor: colors.grey[200],
  "&:hover": {
    backgroundColor: colors.grey[300],
  },
  width: "350px",
  padding: theme.spacing(1, 0),
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 0, 2, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  fontWeight: theme.typography.fontWeightBold,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));
export default HeaderBar;
