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
import React, { useRef } from "react";
import { ReactElement } from "react";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { AiFillTwitterCircle } from "react-icons/ai";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import toast from "react-hot-toast";

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
	const router = useRouter();

	// refs
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const login = () => {
		const email = emailRef.current?.value;
		const password = passwordRef.current?.value;

		if (email && password)
			signIn("credentials", {
				email,
				password,
				redirect: false,
			}).then((res) => {
				const callbackUrl = router.query.callbackUrl as string;

				if (res?.ok) {
					toast.success("Successfully logged in!");
					setTimeout(() => {
						if (callbackUrl) {
							router.push(callbackUrl);
						} else {
							router.push("/");
						}
					});
				} else {
					toast.error(res?.error?.toString() ?? "Something wrong!");
				}
			});
		else if (!email) emailRef.current?.focus();
		else if (!password) passwordRef.current?.focus();
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
					sx={{
						px: 4,
						py: 4,
						border: `1px solid ${colors.grey[300]}`,
						borderRadius: "4px",
					}}
				>
					<Box
						minWidth={isMobile ? 350 : 500}
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
								inputRef={emailRef}
							/>
							<TextField
								type={showPassword ? "text" : "password"}
								label="Password"
								id="fullWidth"
								inputRef={passwordRef}
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
							<Button variant={"contained"} onClick={() => login()} fullWidth>
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
