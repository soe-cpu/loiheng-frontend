import { NewArrivalComponent } from "@components/NewArrivalComponent";
import MainLayout from "@layouts/MainLayout";
import { Box, Container, Typography } from "@mui/material";
import Head from "next/head";
import { ReactElement } from "react";

const NewArrival = () => {
  return (
    <Box>
      <Head>
        <title>Loi Heng | New Arrival</title>
        <meta name="description" content="Loi Heng New Arrivals" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NewArrivalComponent />
    </Box>
  );
};

NewArrival.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default NewArrival;
