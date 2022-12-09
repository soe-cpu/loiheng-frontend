import {
	Badge,
	Box,
	Button,
	colors,
	Container,
	IconButton,
	InputBase,
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
		signOut();
	};

	const router = useRouter();

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
						<Badge badgeContent={4} color="primary">
							<FavoriteBorderOutlinedIcon color="action" />
						</Badge>
						<Badge badgeContent={4} color="primary">
							<NotificationsNoneOutlinedIcon color="action" />
						</Badge>
						<Link href={"/addtocart"}>
							<Badge badgeContent={4} color="primary">
								<ShoppingCartOutlinedIcon color="action" />
							</Badge>
						</Link>
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
						<Menu
							id="basic-menu"
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							MenuListProps={{
								"aria-labelledby": "basic-button",
							}}
						>
							<MenuItem onClick={() => router.push("/profile")}>
								Profile
							</MenuItem>
							<MenuItem onClick={handleLogout}>Logout</MenuItem>
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
