import { FeaturedProductComponent } from "@components/FeaturedProductComponent";
import MainLayout from "@layouts/MainLayout";
import { Box, Container, Typography } from "@mui/material";
import Head from "next/head";
import { ReactElement } from "react";

const FeaturedProduct = () => {
  return (
    <Box>
      <Head>
        <title>Loi Heng | Featured Product</title>
        <meta name="description" content="Loi Heng New Arrivals" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeaturedProductComponent />
    </Box>
  );
};

FeaturedProduct.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default FeaturedProduct;
