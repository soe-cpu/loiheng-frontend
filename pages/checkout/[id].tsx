import { CheckoutComponent } from "@components/CheckoutComponent";
import MainLayout from "@layouts/MainLayout";
import { Box } from "@mui/material";
import Head from "next/head";
import { ReactElement } from "react";

const CheckoutPage = () => {
  return (
    <Box>
      <Head>
        <title>Loi Heng | Checkout</title>
        <meta name="description" content="Loi Heng" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CheckoutComponent />
    </Box>
  );
};

CheckoutPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default CheckoutPage;
