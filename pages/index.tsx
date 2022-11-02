import { HomeComponent } from "@components/HomeComponent";
import MainLayout from "@layouts/MainLayout";
import { Box } from "@mui/material";
import Head from "next/head";
import { ReactElement } from "react";

const Home = () => {
  return (
    <Box>
      <Head>
        <title>Loi Heng</title>
        <meta name="description" content="Loi Heng" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeComponent />
    </Box>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
