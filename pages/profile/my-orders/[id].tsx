import { OrderDetailComponent } from "@components/ProfileComponent";
import ProfileLayout from "@layouts/ProfileLayout";
import { Box } from "@mui/material";
import Head from "next/head";
import React from "react";
import { ReactElement, useState } from "react";

const OrderDetail = () => {
  return (
    <Box>
      <Head>
        <title>Loi Heng | Profile</title>
        <meta name="description" content="Loi Heng Profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <OrderDetailComponent />
    </Box>
  );
};

OrderDetail.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export default OrderDetail;
