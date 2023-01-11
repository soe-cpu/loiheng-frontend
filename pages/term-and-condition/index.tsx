import MainLayout from "@layouts/MainLayout";
import { Box, Container, Typography } from "@mui/material";
import Head from "next/head";
import { ReactElement } from "react";
import axios from "axios";
import useAllSetting from "@apis/useAllSetting";
import React from "react";
import { GetSettingResponse } from "@atoms/settingListAtom";

const TermAndCondition = () => {
  const { data, error, isValidating } = useAllSetting("term_and_condition");
  const [term, setTerm] = React.useState<GetSettingResponse>();

  React.useEffect(() => {
    if (data) {
      setTerm(data);
    }
  }, [data, setTerm]);
  return (
    <Box>
      <Head>
        <title>Loi Heng | Term and Condition</title>
        <meta name="description" content="Loi Heng About Us" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ py: 2 }}>
        <Container>
          <Typography variant="h5">Term and Condition</Typography>
          {/* {JSON.stringify(term?.data.value)} */}
          {term ? (
            <div dangerouslySetInnerHTML={{ __html: term.data.value }}></div>
          ) : (
            ""
          )}
        </Container>
      </Box>
    </Box>
  );
};

TermAndCondition.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default TermAndCondition;
