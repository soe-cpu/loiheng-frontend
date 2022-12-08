import { MyOrderComponent } from "@components/ProfileComponent";
import ProfileLayout from "@layouts/ProfileLayout";
import { Box } from "@mui/material";
import Head from "next/head";
import { ReactElement } from "react";

const MyOrders = () => {
  return (
    <Box>
      <Head>
        <title>Loi Heng | Profile</title>
        <meta name="description" content="Loi Heng Profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MyOrderComponent />
    </Box>
  );
};

MyOrders.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export default MyOrders;
