import { DealAndPromotionComponent } from "@components/DealAndPromotionComponent";
import MainLayout from "@layouts/MainLayout";
import { Box } from "@mui/material";
import Head from "next/head";
import { ReactElement } from "react";

const Product = () => {
  return (
    <Box>
      <Head>
        <title>Loi Heng - Deals And Promotion</title>
        <meta name="description" content="Loi Heng Deals And Promotion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DealAndPromotionComponent />
    </Box>
  );
};

Product.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Product;
