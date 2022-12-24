import MainLayout from "@layouts/MainLayout";
import { Box, Container, Typography } from "@mui/material";
import Head from "next/head";
import { ReactElement } from "react";
import axios from "axios";
import useAllSetting from "@apis/useAllSetting";
import React from "react";
import { GetSettingResponse } from "@atoms/settingListAtom";

const AboutUs = () => {
  const { data, error, isValidating } = useAllSetting("about");
  const [about, setAbout] = React.useState<GetSettingResponse>();

  React.useEffect(() => {
    if (data) {
      setAbout(data);
    }
  }, [data, setAbout]);
  return (
    <Box>
      <Head>
        <title>Loi Heng | About Us</title>
        <meta name="description" content="Loi Heng About Us" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ py: 2 }}>
        <Container>
          <Typography variant="h5">About Us</Typography>
          {about ? (
            <div dangerouslySetInnerHTML={{ __html: about.data.value }}></div>
          ) : (
            ""
          )}
        </Container>
      </Box>
    </Box>
  );
};

AboutUs.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default AboutUs;
