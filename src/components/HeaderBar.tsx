import {
	Avatar,
	Badge,
	Box,
	Button,
	colors,
	Container,
	Divider,
	IconButton,
	InputBase,
	ListItemIcon,
	Menu,
	MenuItem,
	Stack,
	styled,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Logo from "loi-heng-log.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useRouter } from "next/router";
import wishlistStore from "@stores/wishlist.store";
import { Logout } from "@mui/icons-material";
import cartStore from "@stores/cart.store";
import toast from "react-hot-toast";

const HeaderBar = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	const { data } = useSession();

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		signOut().then(() => {
			toast.success("Successfully logout!");
		});
	};

	const router = useRouter();

	const wishlists = wishlistStore((store) => store.wishlists);
	const fetchWishlists = wishlistStore((store) => store.fetch);
	const { fetch: fetchCarts, cart } = cartStore();

	React.useEffect(() => {
		if (data) {
			fetchWishlists(data);
			fetchCarts(data);
		}
	}, [data, fetchWishlists, fetchCarts]);

	return (
		<Box sx={{ display: isMobile ? "none" : "block" }}>
			<Container maxWidth="lg">
				<Stack
					direction={"row"}
					justifyContent={"space-between"}
					alignItems={"center"}
					sx={{ height: "100px" }}
				>
					<Link href={"/"}>
						<Box sx={{ position: "relative", width: "200px", height: "50px" }}>
							<Image src={"/loi-heng-logo.png"} alt={"logo"} fill />
						</Box>
					</Link>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<Search>
							<SearchIconWrapper>
								<SearchIcon sx={{ color: "gray" }} />
							</SearchIconWrapper>
							<StyledInputBase
								placeholder="Search…"
								inputProps={{ "aria-label": "search" }}
							/>
						</Search>
					</Box>
					<Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
						<Link href={"/wishlists"}>
							<Badge badgeContent={wishlists?.length} color="primary">
								<FavoriteBorderOutlinedIcon color="action" />
							</Badge>
						</Link>

						{/* <Badge badgeContent={4} color="primary">
							<NotificationsNoneOutlinedIcon color="action" />
						</Badge> */}
						<Link href={"/addtocart"}>
							<Badge badgeContent={cart?.cart_item?.length} color="primary">
								<ShoppingCartOutlinedIcon color="action" />
							</Badge>
						</Link>
						{data?.user && (
							<Button
								id="basic-button"
								aria-controls={open ? "basic-menu" : undefined}
								aria-haspopup="true"
								aria-expanded={open ? "true" : undefined}
								onClick={handleClick}
								style={{
									display: "flex",
									gap: 2,
									textDecoration: "none",
									color: "#000",
									textTransform: "capitalize",
								}}
							>
								<AccountCircleIcon color="action" />
								<Typography variant="body2">My Account</Typography>
							</Button>
						)}
						<Menu
							id="basic-menu"
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							PaperProps={{
								elevation: 0,
								sx: {
									overflow: "visible",
									filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
									mt: 1.5,
									"& .MuiAvatar-root": {
										width: 32,
										height: 32,
										ml: -0.5,
										mr: 1,
									},
									"&:before": {
										content: '""',
										display: "block",
										position: "absolute",
										top: 0,
										right: 14,
										width: 10,
										height: 10,
										bgcolor: "background.paper",
										transform: "translateY(-50%) rotate(45deg)",
										zIndex: 0,
									},
								},
							}}
							transformOrigin={{ horizontal: "right", vertical: "top" }}
							anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
						>
							<MenuItem onClick={() => router.push("/profile")}>
								<Avatar /> Profile
							</MenuItem>
							<Divider />
							<MenuItem onClick={handleLogout}>
								<ListItemIcon>
									<Logout fontSize="small" />
								</ListItemIcon>
								Logout
							</MenuItem>
						</Menu>
						{!data?.user && (
							<Box sx={{ display: "flex", gap: 1, ml: 1 }}>
								<Link href={"/auth/login"} legacyBehavior>
									<a
										style={{
											textDecoration: "none",
											fontWeight: 400,
											color: "#000",
										}}
									>
										Login
									</a>
								</Link>
								<span>|</span>
								<Link href={"/auth/register"} legacyBehavior>
									<a
										style={{
											textDecoration: "none",
											fontWeight: 400,
											color: "#000",
										}}
									>
										Register
									</a>
								</Link>
							</Box>
						)}
					</Box>
				</Stack>
			</Container>
		</Box>
	);
};

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.spacing(40),
	backgroundColor: colors.grey[200],
	"&:hover": {
		backgroundColor: colors.grey[300],
	},
	width: "350px",
	padding: theme.spacing(1, 0),
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 0, 2, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	fontWeight: theme.typography.fontWeightBold,
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		width: "100%",
	},
}));

export default HeaderBar;
