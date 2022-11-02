import Footer from "@components/Footer";
import HeaderBar from "@components/HeaderBar";
import MenuBar from "@components/MenuBar";
import { Box, Typography, useTheme } from "@mui/material";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();

  return (
    <Box width={"100%"} height={"100%"}>
      <HeaderBar />
      <MenuBar />
      <Box minHeight={"100vh"}>{children}</Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;
