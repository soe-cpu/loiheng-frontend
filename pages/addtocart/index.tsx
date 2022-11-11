import { AddToCartComponent } from "@components/AddToCartComponent";
import MainLayout from "@layouts/MainLayout";
import { Box, Container, Typography } from "@mui/material";
import Head from "next/head";
import { ReactElement } from "react";

const AddToCart = () => {
  return (
    <Box>
      <Head>
        <title>Loi Heng | AddToCart</title>
        <meta name="description" content="Loi Heng Add To Cart" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AddToCartComponent />
    </Box>
  );
};

AddToCart.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default AddToCart;
