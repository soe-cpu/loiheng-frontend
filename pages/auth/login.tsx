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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Head from "next/head";
import React from "react";
import { ReactElement } from "react";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { AiFillTwitterCircle } from "react-icons/ai";
import Link from "next/link";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
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
          sx={{
            px: 4,
            py: 4,
            border: `1px solid ${colors.grey[300]}`,
            borderRadius: "4px",
          }}
        >
          <Box
            minWidth={isMobile ? 400 : 500}
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                width: "100%",
                mt: 4,
              }}
            >
              <TextField
                type={"text"}
                id="outlined-basic"
                label="Email or Phone"
                variant="outlined"
              />
              <TextField
                type={showPassword ? "text" : "password"}
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
                Login
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
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 1 }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Typography>I have not registered yet?</Typography>
              <Link href={"/auth/register"} legacyBehavior>
                <a style={{ color: colors.blue[600], fontWeight: 500 }}>
                  Sign Up
                </a>
              </Link>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Login;