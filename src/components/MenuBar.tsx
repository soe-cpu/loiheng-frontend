import { Box, colors, Container, Stack } from "@mui/material";
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
          <Box>HOME</Box>
          <Box>PRODUCT</Box>
          <Box>DEALS & PROMOTION</Box>
          <Box>ABOUT US</Box>
          <Box>CONTACT US</Box>
          <Box>RMA</Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default MenuBar;
