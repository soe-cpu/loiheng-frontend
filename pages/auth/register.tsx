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
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Head from "next/head";
import React from "react";
import { ReactElement } from "react";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { AiFillTwitterCircle } from "react-icons/ai";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Register = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [dob, setDob] = React.useState<Dayjs | null>(null);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box>
      <Head>
        <title>Loi Heng | Register</title>
        <meta name="description" content="Loi Heng REgister" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack
        justifyContent={"center"}
        direction={"row"}
        alignItems={"center"}
        sx={{ py: 6 }}
      >
        <Box
          sx={{
            px: 4,
            py: 4,
            border: `1px solid ${colors.grey[300]}`,
            borderRadius: "4px",
          }}
        >
          <Box
            minWidth={isMobile ? 400 : 700}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box>
              <img src="/logo-only.png" alt="" />
            </Box>
            <Typography variant="h5">Loi Heng International</Typography>
            <Box sx={{ width: isMobile ? 400 : 700, pt: 4 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <TextField
                    type={"text"}
                    id="outlined-basic"
                    label="FullName"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    type={"text"}
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    type={"text"}
                    id="outlined-basic"
                    label="Phone No"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date Of Birth"
                      value={dob}
                      onChange={(newValue) => {
                        setDob(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    id="fullWidth"
                    fullWidth
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
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    type={showPassword ? "text" : "password"}
                    label="Confirm Password"
                    id="fullWidth"
                    fullWidth
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
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Remember me"
                />
              </FormGroup>
            </Box>
            <Box>
              <Typography>Forgot password?</Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ width: "300px" }}>
              <Button variant={"contained"} fullWidth>
                Register
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              my: 1,
              "&::before": {
                content: '""',
                px: 1,
                width: "50%",
                height: "1px",
                backgroundColor: "rgba(0, 0, 0, 0.15)",
              },
              "&::after": {
                content: '""',
                width: "50%",
                height: "1px",
                backgroundColor: "rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            <span style={{ margin: "0px 12px" }}>or</span>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
            <IconButton>
              <BsFacebook style={{ color: "#15A2FA" }} />
            </IconButton>
            <IconButton>
              <FcGoogle />
            </IconButton>
            <IconButton>
              <AiFillTwitterCircle style={{ color: "#1DA1F2" }} />
            </IconButton>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

Register.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Register;
