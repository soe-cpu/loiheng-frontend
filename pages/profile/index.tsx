import { ProfileComponent } from "@components/ProfileComponent";
import MainLayout from "@layouts/MainLayout";
import { Box, Container, Typography } from "@mui/material";
import Head from "next/head";
import { ReactElement } from "react";

const Profile = () => {
  return (
    <Box>
      <Head>
        <title>Loi Heng | New Arrival</title>
        <meta name="description" content="Loi Heng New Arrivals" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProfileComponent />
    </Box>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Profile;
