import { ProductDetailComponent } from "@components/ProductComponent";
import MainLayout from "@layouts/MainLayout";
import { Box } from "@mui/material";
import Head from "next/head";
import { ReactElement } from "react";

const ProductDetail = () => {
  return (
    <Box>
      <Head>
        <title>Loi Heng | Product Detail</title>
        <meta name="description" content="Loi Heng" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProductDetailComponent />
    </Box>
  );
};

ProductDetail.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default ProductDetail;
