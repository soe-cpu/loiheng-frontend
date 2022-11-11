import MainLayout from "@layouts/MainLayout";
import { Box } from "@mui/material";
import Head from "next/head";
import { ReactElement } from "react";

const Product = () => {
  return (
    <Box>
      <Head>
        <title>Loi Heng - Product</title>
        <meta name="description" content="Loi Heng Product" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Product
    </Box>
  );
};

Product.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Product;
