import MainLayout from "@layouts/MainLayout";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Box,
  Stack,
  Typography,
  colors,
  IconButton,
  InputAdornment,
  TextField,
  Grid,
} from "@mui/material";
import Head from "next/head";
import React from "react";
import { ReactElement } from "react";

const Home = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <Box>
      <Head>
        <title>Loi Heng | Login</title>
        <meta name="description" content="Loi Heng Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack
        justifyContent={"center"}
        direction={"row"}
        alignItems={"center"}
        sx={{ py: 6 }}
      >
        <Box
          minWidth={700}
          sx={{ border: `1px solid ${colors.grey[300]}`, p: 4 }}
        >
          <Grid container>
            <Grid item xs={12} lg={6}>
              <Box>
                <img
                  src="/reg.gif"
                  alt="Register"
                  style={{ width: "100%", objectFit: "cover" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  px: 8,
                  py: 4,
                }}
              >
                <Box>
                  <img src="/logo-only.png" alt="" />
                </Box>
                <Typography variant="h5">Loi Heng International</Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    width: "100%",
                    my: 4,
                  }}
                >
                  <TextField
                    type={"text"}
                    id="outlined-basic"
                    label="Email or Phone"
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    label="Password"
                    id="fullWidth"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
