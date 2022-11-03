import MainLayout from "@layouts/MainLayout";
import { Box, Container, Typography } from "@mui/material";
import Head from "next/head";
import { ReactElement } from "react";

const AboutUs = () => {
  return (
    <Box>
      <Head>
        <title>Loi Heng | About Us</title>
        <meta name="description" content="Loi Heng About Us" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ py: 2 }}>
        <Container>
          <Typography>About Us</Typography>
        </Container>
      </Box>
    </Box>
  );
};

AboutUs.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default AboutUs;
