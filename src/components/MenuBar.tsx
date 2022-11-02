import { Box, colors, Container, Stack, styled } from "@mui/material";
import Link from "next/link";
import React from "react";

const MenuBar = () => {
  return (
    <Box sx={{ backgroundColor: colors.blue[500], color: "#fff" }}>
      <Container maxWidth="lg">
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ height: "64px", fontWeight: 400 }}
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
            <MenuLink>RMA</MenuLink>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

const MenuLink = styled("a")(({ theme }) => ({
  color: "#fff",
  textDecoration: "none",
  fontWeight: 500,
  cursor: "pointer",
}));
export default MenuBar;
