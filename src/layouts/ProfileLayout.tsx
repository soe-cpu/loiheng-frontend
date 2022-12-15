import Footer from "@components/Footer";
import HeaderBar from "@components/HeaderBar";
import MenuBar from "@components/MenuBar";
import {
	Box,
	Button,
	colors,
	Container,
	Divider,
	Grid,
	Stack,
	styled,
	Typography,
	useTheme,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { NextRouter, useRouter } from "next/router";
import StyledModalBox from "@common/StyledModalBox";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<Box width={"100%"} height={"100%"}>
			<HeaderBar />
			<MenuBar />
			<Box minHeight={"100vh"} sx={{ backgroundColor: "#F4F6F8" }}>
				<Container maxWidth="lg" sx={{ py: 2 }}>
					<Grid container spacing={2}>
						<Grid item xs={12} lg={4}>
							<Box
								sx={{
									border: `1px solid ${colors.grey[300]}`,
									p: 2,
									display: "flex",
									flexDirection: "column",
									gap: 2,
									backgroundColor: "#fff",
								}}
							>
								<Typography variant="h6">Profile</Typography>
								<Divider />
								<ActiveBox path="/profile">
									<Link href={"/profile"} legacyBehavior>
										<MenuLink>
											<AccountCircleOutlinedIcon /> My Profile
										</MenuLink>
									</Link>
								</ActiveBox>
								<ActiveBox path="/profile/my-orders">
									<Link href={"/profile/my-orders"} legacyBehavior>
										<MenuLink>
											<ShoppingCartOutlinedIcon /> My Orders
										</MenuLink>
									</Link>
								</ActiveBox>
								{/* <ActiveBox path="/profile/my-pre-orders">
                  <Link href={"/profile/my-pre-orders"} legacyBehavior>
                    <MenuLink>
                      <AccessTimeIcon /> My Pre-Orders
                    </MenuLink>
                  </Link>
                </ActiveBox>
                <ActiveBox path="/profile/my-coupon">
                  <Link href={"/profile/my-coupon"} legacyBehavior>
                    <MenuLink>
                      <PercentOutlinedIcon /> My coupon
                    </MenuLink>
                  </Link>
                </ActiveBox> */}
								<ActiveBox path="/profile/my-addresses">
									<Link href={"/profile/my-addresses"} legacyBehavior>
										<MenuLink>
											<LocationOnOutlinedIcon /> My addresses
										</MenuLink>
									</Link>
								</ActiveBox>
								{/* <ActiveBox path="/profile/my-card-info">
                  <Link href={"/profile/my-card-info"} legacyBehavior>
                    <MenuLink>
                      <ContactMailOutlinedIcon /> My Card Information
                    </MenuLink>
                  </Link>
                </ActiveBox> */}
								<Box sx={{ px: 1 }}>
									<Button onClick={handleOpen}>
										<MenuLink>
											<LogoutOutlinedIcon /> Logout
										</MenuLink>
									</Button>
									{/* Note Modal start */}
									<StyledModalBox open={open} handleClose={handleOpen}>
										<Box
											sx={{
												width: 350,
												display: "flex",
												flexDirection: "column",
												gap: 2,
											}}
										>
											<Typography variant="h6">Logout Confrim</Typography>
											<Divider />
											<Typography>Are you sure you want to logout?</Typography>
											<Divider />
											<Stack
												direction={"row"}
												spacing={2}
												justifyContent={"end"}
											>
												<Button
													variant="contained"
													color="error"
													onClick={handleClose}
													sx={{ boxShadow: "0px 0px 0px #fff" }}
												>
													NO
												</Button>
												<Button
													variant="contained"
													sx={{
														color: "#fff",
														backgroundColor: theme.palette.primary.main,
														boxShadow: "0px 0px 0px #fff",
														"&:hover": {
															backgroundColor: theme.palette.primary.main,
														},
													}}
													onClick={() =>
														signOut({
															redirect: true,
															callbackUrl: "/",
														}).then(() => {
															toast.success("Successfully logout!");
														})
													}
												>
													YES
												</Button>
											</Stack>
										</Box>
									</StyledModalBox>
									{/* Note Modal end */}
								</Box>
							</Box>
						</Grid>
						<Grid item xs={12} lg={8}>
							<Box sx={{ backgroundColor: "#fff" }}>{children}</Box>
						</Grid>
					</Grid>
				</Container>
			</Box>
			<Footer />
		</Box>
	);
};
const MenuLink = styled("a")(({ theme }) => ({
	color: colors.grey[800],
	textDecoration: "none",
	textTransform: "uppercase",
	fontWeight: 500,
	cursor: "pointer",
	display: "flex",
	alignItems: "center",
	gap: 4,
	padding: "10px 0px",
}));

const ActiveBox = styled(Box)<{
	path: string;
	router?: NextRouter;
}>(({ theme, path, router = useRouter() }) => ({
	borderLeft:
		router.pathname === path
			? `4px solid ${colors.blue[500]}`
			: "4px solid white",
	backgroundColor: router.pathname === path ? colors.grey[100] : "",
	padding: "0px 10px",
}));

export default ProfileLayout;
