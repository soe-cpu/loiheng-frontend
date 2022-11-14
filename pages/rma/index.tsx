import MainLayout from "@layouts/MainLayout";
import { Box } from "@mui/material";
import Head from "next/head";
import { ReactElement } from "react";

const RMA = () => {
  return (
    <Box>
      <Head>
        <title>Loi Heng - RMA</title>
        <meta name="description" content="Loi Heng RMA" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      RMA
    </Box>
  );
};

RMA.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default RMA;
