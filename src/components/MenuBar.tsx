import {
	AppBar,
	Badge,
	Box,
	Button,
	colors,
	Container,
	Drawer,
	Grid,
	IconButton,
	InputBase,
	Stack,
	styled,
	Toolbar,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import { NextRouter, useRouter } from "next/router";
import useAllCategory from "@apis/useAllCategory";
import { GetCategoryResponse } from "@atoms/categoryListAtom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useSession } from "next-auth/react";
import cartStore from "@stores/cart.store";
import wishlistStore from "@stores/wishlist.store";

const MenuBar = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	const myLoaderGif = ({ src, width, quality }: any) => {
		return `${src}?q=${quality || 75}`;
	};

	const [drawer, setDrawer] = React.useState(false);
	const open = Boolean(drawer);
	const handleClickDrawer = (event: React.MouseEvent<HTMLButtonElement>) => {
		setDrawer(true);
	};
	const handleClose = () => {
		setDrawer(false);
	};

	const toggleDrawer = () => {
		setDrawer(!drawer);
	};

	const { data, error, isValidating } = useAllCategory();

	const [category, setCategory] = React.useState<GetCategoryResponse["data"]>();

	const { data: session } = useSession();
	const wishlists = wishlistStore((store) => store.wishlists);
	const fetchWishlists = wishlistStore((store) => store.fetch);
	const { fetch: fetchCarts, cart } = cartStore();

	React.useEffect(() => {
		if (session) {
			fetchWishlists(session);
			fetchCarts(session);
		}
	}, [data, fetchWishlists, fetchCarts, session]);

	React.useEffect(() => {
		if (data) {
			setCategory(data.data);
		}
	}, [data, setCategory]);

	return (
		<Box>
			<Box
				sx={{
					backgroundColor: colors.blue[500],
					color: "#fff",
				}}
			>
				<Container maxWidth="lg">
					<Stack
						direction={"row"}
						justifyContent={"center"}
						alignItems={"center"}
						sx={{
							height: "40px",
							display: isMobile ? "none" : "flex",
						}}
						spacing={8}
					>
						<Box>
							<Link href={"/"} legacyBehavior>
								<MenuLink>HOME</MenuLink>
							</Link>
						</Box>
						<Box
							sx={{
								position: "relative",
								display: "inline-block",
								"&:hover": {
									"& .drop": {
										display: "block",
									},
								},
							}}
						>
							<Link href={"/product"} legacyBehavior>
								<MenuLink>
									PRODUCT <ArrowDropDownIcon />
								</MenuLink>
							</Link>
							<Box
								className="drop"
								sx={{
									zIndex: 100000,
									position: "absolute",
									left: -100,
									display: "none",
								}}
							>
								<Box
									sx={{
										minWidth: "800px",
										backgroundColor: "#fff",
										boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
										borderRadius: "4px",
										mt: 2,
										p: 2,
									}}
								>
									<Grid container spacing={2}>
										{category?.categories.map((category, index) => {
											return (
												<Grid item xs={3} key={index}>
													<Box>
														<Box sx={{ pb: 1 }}>
															<Typography
																style={{
																	fontSize: 16,
																	fontWeight: 500,
																	color: "#000",
																}}
															>
																{category.name}
															</Typography>
														</Box>
														{category.sub_category.map((sub, index) => {
															return (
																<Box key={index} sx={{ paddingY: "4px" }}>
																	<Link
																		href={"/categories/" + sub.id}
																		legacyBehavior
																	>
																		<StyledCategoryLink>
																			{sub.name}
																		</StyledCategoryLink>
																	</Link>
																</Box>
															);
														})}
													</Box>
												</Grid>
											);
										})}
									</Grid>
								</Box>
							</Box>
						</Box>
						<Box>
							<Link href={"/deals-and-promotions"} legacyBehavior>
								<MenuLink>DEALS & PROMOTION</MenuLink>
							</Link>
						</Box>
						<Box>
							<Link href={"/about-us"} legacyBehavior>
								<MenuLink>ABOUT US</MenuLink>
							</Link>
						</Box>
						<Box>
							<Link href={"/contact-us"} legacyBehavior>
								<MenuLink>CONTACT US</MenuLink>
							</Link>
						</Box>
						{/* <Box>
              <Link href={"/rma"} legacyBehavior>
                <MenuLink>RMA</MenuLink>
              </Link>
            </Box> */}
					</Stack>
					<AppBar
						elevation={1}
						color={"inherit"}
						sx={{ display: isMobile ? "block" : "none", zIndex: 100000000 }}
					>
						<Toolbar>
							<IconButton onClick={toggleDrawer}>
								{drawer && <CloseIcon />}
								{!drawer && <MenuIcon />}
							</IconButton>
							{/* <Box sx={{ flexGrow: 1 }} /> */}
							<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
								<Search>
									<SearchIconWrapper>
										<SearchIcon sx={{ color: "gray" }} />
									</SearchIconWrapper>
									<StyledInputBase
										placeholder="Search…"
										inputProps={{ "aria-label": "search" }}
									/>
								</Search>
								<Link href={"/addtocart"}>
									<Badge
										badgeContent={cart?.cart_item?.length ?? ""}
										color="primary"
									>
										<ShoppingCartOutlinedIcon color="action" />
									</Badge>
								</Link>
								<Link href={"/wishlists"}>
									<Badge badgeContent={wishlists?.length} color="primary">
										<FavoriteBorderOutlinedIcon color="action" />
									</Badge>
								</Link>
								<Box sx={{ position: "relative" }}>
									<Link href={"/"}>
										<Box
											sx={{
												position: "relative",
												width: "100px",
												height: "30px",
											}}
										>
											<Image
												src={"/loi-heng-logo.png"}
												alt={"logo"}
												loader={myLoaderGif}
												fill
												sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
											/>
										</Box>
									</Link>
								</Box>
							</Box>
						</Toolbar>
					</AppBar>
				</Container>
			</Box>
			<Offset
				sx={{
					display: { xs: "flex", lg: "none" },
				}}
			/>
			<Drawer
				variant="temporary"
				open={open}
				onClose={handleClose}
				anchor={"left"}
				sx={{
					display: { lg: "none" },
					"&.MuiPaper-root": {
						borderLeft: `1px solid ${colors.red[500]}`,
					},
				}}
				elevation={20}
			>
				<Box
					width={"220px"}
					sx={{
						marginTop: "64px",
						display: "flex",
						flexDirection: "column",
						gap: 2,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Link href={"/"} legacyBehavior>
						<StyledMenuLink path="/">Home</StyledMenuLink>
					</Link>
					<Link href={"/product"} legacyBehavior>
						<StyledMenuLink path="/product">PRODUCT</StyledMenuLink>
					</Link>
					<Link href={"/deals-and-promotions"} legacyBehavior>
						<StyledMenuLink path="/deals-and-promotions">
							DEALS & PROMOTION
						</StyledMenuLink>
					</Link>
					<Link href={"/about-us"} legacyBehavior>
						<StyledMenuLink path="/about-us">ABOUT US</StyledMenuLink>
					</Link>
					<Link href={"/contact-us"} legacyBehavior>
						<StyledMenuLink path="/contact-us">CONTACT US</StyledMenuLink>
					</Link>
					<Link href={"/rma"} legacyBehavior>
						<StyledMenuLink path="/rma">RMA</StyledMenuLink>
					</Link>
					{session?.user && (
						<Link href={"/profile"} legacyBehavior>
							<StyledMenuLink path="/profile">Profile</StyledMenuLink>
						</Link>
					)}
					{!session?.user && (
						<Link href={"/auth/login"} legacyBehavior>
							<StyledMenuLink path="/auth/login">Login</StyledMenuLink>
						</Link>
					)}
					{!session?.user && (
						<Link href={"/auth/register"} legacyBehavior>
							<StyledMenuLink path="/auth/register">Register</StyledMenuLink>
						</Link>
					)}
				</Box>
			</Drawer>
		</Box>
	);
};

const StyledCategoryLink = styled("a")(({ theme }) => ({
	color: colors.grey[600],
	textDecoration: "none",
	fontSize: 14,
	cursor: "pointer",

	"&:hover": {
		color: colors.blue[500],
	},
}));
const Offset = styled(Toolbar)(({ theme }) => ({
	...theme.mixins.toolbar,
}));
const MenuLink = styled("a")(({ theme }) => ({
	color: "#fff",
	textDecoration: "none",
	fontWeight: 500,
	cursor: "pointer",
	display: "flex",
	gap: 3,
	height: "100%",
	justifyContent: "center",
}));

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.spacing(40),
	backgroundColor: colors.grey[200],
	"&:hover": {
		backgroundColor: colors.grey[300],
	},
	width: "140px",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 0, 0, 1),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	fontWeight: theme.typography.fontWeightBold,
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		width: "100%",
	},
}));

const StyledMenuLink = styled("a")<{
	path: string;
	router?: NextRouter;
}>(({ theme, path, router = useRouter() }) => ({
	backgroundColor: router.pathname === path ? colors.blue[500] : "",
	width: "200px",
	fontWeight: 600,
	textDecoration: "none",
	color: router.pathname === path ? "#fff" : "#000",
	borderRadius: theme.spacing(4),
	border: `0px`,
	padding: "10px",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	cursor: "pointer",
	transition: "0.3s",
	"&:hover": {
		backgroundColor: colors.blue[500],
		color: "#fff",
	},
}));
export default MenuBar;
