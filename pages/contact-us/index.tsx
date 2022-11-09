import { ContactComponent } from "@components/ContactComponent";
import MainLayout from "@layouts/MainLayout";
import { Box, Container, Typography } from "@mui/material";
import Head from "next/head";
import { ReactElement } from "react";

const ContactUs = () => {
  return (
    <Box>
      <Head>
        <title>Loi Heng | Contact Us</title>
        <meta name="description" content="Loi Heng About Us" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContactComponent />
    </Box>
  );
};

ContactUs.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default ContactUs;
