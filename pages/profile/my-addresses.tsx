import { MyAddressComponent } from "@components/ProfileComponent";
import ProfileLayout from "@layouts/ProfileLayout";
import { Box } from "@mui/material";
import Head from "next/head";
import { ReactElement } from "react";

const MyAddresses = () => {
  return (
    <Box>
      <Head>
        <title>Loi Heng | Profile</title>
        <meta name="description" content="Loi Heng Profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MyAddressComponent />
    </Box>
  );
};

MyAddresses.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export default MyAddresses;
