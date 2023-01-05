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
import React, { useRef, useState } from "react";
import { ReactElement } from "react";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { AiFillTwitterCircle } from "react-icons/ai";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { stat } from "fs";
import Image from "next/image";
import { toast } from "react-hot-toast";

export interface Data {
  id: number;
  fullname: string;
  email: string;
  email_verified_at?: any;
  phone_no?: any;
  is_admin?: any;
  is_active?: any;
  last_login?: any;
  role?: any;
  status?: any;
  dob?: any;
  gender?: any;
  profile_img?: any;
  provider?: any;
  provider_id?: any;
  provider_token?: any;
  created_at: Date;
  updated_at: Date;
}

export interface RegisterResponse {
  success: boolean;
  data: Data;
  message: string;
  status: number;
}

export interface RegisterFailedResponse {
  success: boolean;
  errors: Errors;
  status: number;
}

export interface Errors {
  name: string[];
  email: string[];
  password: string[];
}

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
  const router = useRouter();

  // States
  const [isConfirmError, setIsConfirmError] = useState(false);
  const [isRegisterError, setIsRegisterError] = useState(false);
  const [errors, setErrors] = useState<RegisterFailedResponse["errors"]>();

  // Refs
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dateOfBirthRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const checkConfirmPassword = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const password = passwordRef.current?.value as string;
    if (password !== (e.target.value as string)) {
      setIsConfirmError(true);
    } else {
      setIsConfirmError(false);
    }
  };

  const register = (e: any) => {
    e.preventDefault();
    const name = nameRef.current?.value as string;
    const email = emailRef.current?.value as string;
    const phone = phoneRef.current?.value as string;
    const password = passwordRef.current?.value as string;

    axios
      .post<RegisterResponse | RegisterFailedResponse>(
        "https://api.loiheng.duckdns.org/api/auth/register",
        {
          fullname: name,
          email,
          phone_no: phone,
          password,
        }
      )
      .then((res) => {
        const { data } = res;

        if (data.success) {
          toast.success("User successfully registered.");
          router.push("/auth/login");
          setErrors(undefined);
        }
      })
      .catch((e: AxiosError<RegisterFailedResponse>) => {
        const res = e.response?.data;

        setErrors(res?.errors);
      });
  };

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
          <form onSubmit={(e) => register(e)}>
            <Box
              minWidth={isMobile ? 350 : 700}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box sx={{ position: "relative", width: 110, height: 100 }}>
                <Image fill src="/logo-only.png" alt="" />
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
                      inputRef={nameRef}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      type={"email"}
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      inputRef={emailRef}
                      required
                      error={errors?.email ? true : false}
                      helperText={errors?.email?.join("\n ")}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      type={"text"}
                      id="outlined-basic"
                      label="Phone No"
                      variant="outlined"
                      fullWidth
                      inputRef={phoneRef}
                      required
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
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      inputRef={passwordRef}
                      required
                      error={errors?.password ? true : false}
                      helperText={errors?.password?.join("\n ")}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      type={showPassword ? "text" : "password"}
                      label="Confirm Password"
                      id="fullWidth"
                      fullWidth
                      error={isConfirmError}
                      helperText={isConfirmError && "Password doesn't math!"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      onChange={(e) => checkConfirmPassword(e)}
                      required
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
                marginY: theme.spacing(3),
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
                <Button
                  type="submit"
                  variant={"contained"}
                  fullWidth
                  disabled={isConfirmError}
                >
                  Register
                </Button>
              </Box>
            </Box>
          </form>
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
              <Typography>Already have an account</Typography>
              <Link href={"/auth/login"} legacyBehavior>
                <a style={{ color: colors.blue[600], fontWeight: 500 }}>
                  Sign In
                </a>
              </Link>
            </Box>
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
