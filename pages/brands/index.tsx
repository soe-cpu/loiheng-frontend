import { BrandComponent } from "@components/BrandComponent";
import MainLayout from "@layouts/MainLayout";
import { Box, Container, Typography } from "@mui/material";
import Head from "next/head";
import { ReactElement } from "react";

const Brand = () => {
  return (
    <Box>
      <Head>
        <title>Loi Heng | Brands</title>
        <meta name="description" content="Loi Heng Brands" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BrandComponent />
    </Box>
  );
};

Brand.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Brand;
