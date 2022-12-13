import {
	Box,
	Button,
	ButtonProps,
	colors,
	Container,
	Divider,
	Grid,
	IconButton,
	InputBase,
	Stack,
	styled,
	Tab,
	Table,
	TableBody,
	TableCell,
	tableCellClasses,
	TableContainer,
	TableHead,
	TableRow,
	Tabs,
	Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { GoLocation } from "react-icons/go";
import { BsTruck, BsCash, BsShare } from "react-icons/bs";
import { FiRotateCcw } from "react-icons/fi";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { MdOutlineSecurity } from "react-icons/md";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ProductCard from "@common/ProductCard";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProductDetails } from "@apis/useProductDetails";
import Link from "next/link";
import Image from "next/image";
import { width } from "@mui/system";
import { useSession } from "next-auth/react";
import wishlistStore from "@stores/wishlist.store";
import { useRouter } from "next/router";
// Tab start //
interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<Box
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 2, height: "100%" }}>{children}</Box>}
		</Box>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}
// Tab end //

// Table Styled start //
const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		borderBottom: `2px solid ${colors.grey[700]}`,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));
// Table Styled end //

const ProductDetailComponent = (
	props: ProductDetails["data"]["products"][0]
) => {
	// states
	const [value, setValue] = React.useState(0);
	const [quantity, setQuantity] = React.useState(1);

	const slider1 = useRef(null);
	const slider2 = useRef(null);
	const [nav1, setNav1] = useState<any>();
	const [nav2, setNav2] = useState<any>();

	const { data } = useSession();

	const router = useRouter();

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const increaseQuantity = () => {
		const stock = props.stock ?? 0;
		if (stock > quantity) {
			setQuantity(quantity + 1);
		}
	};

	const decreaseQuantity = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	useEffect(() => {
		setNav1(slider1.current);
		setNav2(slider2.current);
	}, []);

	const addWishlist = wishlistStore((store) => store.addWishlist);

	const addProductToWishlist = () => {
		if (data) {
			addWishlist(data, props);
		} else {
			router.push("/auth/login");
		}
	};

	return (
		<Box sx={{ py: 4 }}>
			<Container maxWidth={"lg"}>
				<Grid container spacing={3}>
					<Grid item xs={12} md={6} lg={4}>
						<div>
							<Slider infinite={false} asNavFor={nav2} ref={slider1}>
								{props.product_pictures.map((pic) => {
									return (
										<Box
											key={pic.id}
											sx={{
												width: "100%",
												height: "300px",
												position: "relative",
											}}
										>
											<Image
												src={"https://api.loiheng.duckdns.org/" + pic.image}
												alt={"Product Image"}
												fill
											/>
										</Box>
									);
								})}
							</Slider>
							<Slider
								asNavFor={nav1}
								ref={slider2}
								slidesToShow={5}
								swipeToSlide={true}
								focusOnSelect={true}
								infinite={false}
							>
								{props.product_pictures.map((pic) => {
									return (
										<Box
											sx={{ pr: 1 }}
											key={pic.id}
											width={"100%"}
											height={"60px"}
											position={"relative"}
										>
											<Image
												src={"https://api.loiheng.duckdns.org/" + pic.image}
												alt={"Product Image"}
												fill
											/>
										</Box>
									);
								})}
								{/*
								<Box sx={{ pr: 1 }}>
									<img
										src="/test/3.jpg"
										alt=""
										width={"100%"}
										height={"60px"}
									/>
								</Box>
								<Box sx={{ pr: 1 }}>
									<img
										src="/test/3.jpg"
										alt=""
										width={"100%"}
										height={"60px"}
									/>
								</Box>
								<Box sx={{ pr: 1 }}>
									<img
										src="/test/3.jpg"
										alt=""
										width={"100%"}
										height={"60px"}
									/>
								</Box> */}
							</Slider>
						</div>
					</Grid>
					<Grid item xs={12} md={6} lg={5}>
						<Stack>
							<Box sx={{ display: "flex", justifyContent: "space-between" }}>
								<Typography sx={{ fontWeight: 500, fontSize: 16 }}>
									{props.name}
								</Typography>
								<BsShare />
							</Box>
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
									color: colors.blue[500],
								}}
							>
								<Typography>Ks {props.price}</Typography>
								<Typography>Be The First Review</Typography>
							</Box>
							<Box sx={{ py: 2 }}>
								<div
									dangerouslySetInnerHTML={{ __html: props.short_description }}
								/>
							</Box>
							<Box
								sx={{ display: "flex", gap: 2, alignItems: "center", pb: 1 }}
							>
								<Typography sx={{ fontWeight: 600 }}>Brands:</Typography>
								<Typography sx={{ fontSize: 14 }}>
									{props.brand.map((b) => {
										return (
											<React.Fragment key={b.id}>
												<span>{b.name}</span>
												{", "}
											</React.Fragment>
										);
									})}
								</Typography>
							</Box>
							<Box
								sx={{ display: "flex", gap: 2, alignItems: "center", pb: 1 }}
							>
								<Typography sx={{ fontWeight: 600 }}>Category:</Typography>
								<Typography sx={{ fontSize: 14 }}>
									{props.category.map((c) => {
										return (
											<React.Fragment key={c.id}>
												<span>{c.name}</span>
												{", "}
											</React.Fragment>
										);
									})}
								</Typography>
							</Box>
							<Box
								sx={{ display: "flex", gap: 2, alignItems: "center", pb: 4 }}
							>
								<Typography sx={{ fontWeight: 600 }}>SKU :</Typography>
								<Typography sx={{ fontSize: 14 }}>{props.sku}</Typography>
							</Box>
							<Box
								sx={{ display: "flex", justifyContent: "space-between", pb: 4 }}
							>
								<Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
									{props.stock ? (
										props.stock > 0 ? (
											<Box>
												<IconButton
													sx={{
														color: colors.red[500],
														backgroundColor: colors.grey[100],
													}}
													onClick={() => decreaseQuantity()}
												>
													<RemoveIcon />
												</IconButton>
												<InputBase
													sx={{
														border: `2px solid ${colors.blue[500]}`,
														width: "40px",
														height: "40px",
														borderRadius: "4px",
														px: 1,
													}}
													value={quantity}
												></InputBase>
												<IconButton
													sx={{
														color: colors.green[500],
														backgroundColor: colors.grey[100],
													}}
													onClick={() => increaseQuantity()}
												>
													<AddIcon />
												</IconButton>
											</Box>
										) : (
											""
										)
									) : (
										""
									)}
								</Box>
								<Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
									{props.stock ? (
										props.stock > 0 ? (
											<Typography
												sx={{ fontWeight: 600, color: colors.green[600] }}
											>
												In Stock
											</Typography>
										) : props.is_preorder ? (
											<Typography
												sx={{ fontWeight: 600, color: colors.green[600] }}
											>
												Pre-order
											</Typography>
										) : (
											<Typography
												sx={{ fontWeight: 600, color: colors.red[600] }}
											>
												Out of Stock
											</Typography>
										)
									) : (
										<Typography
											sx={{ fontWeight: 600, color: colors.red[600] }}
										>
											Out of Stock
										</Typography>
									)}
									<FavButton
										size={"small"}
										onClick={() => addProductToWishlist()}
									>
										<FavoriteBorderOutlinedIcon />
									</FavButton>
								</Box>
							</Box>
							{props.stock ? (
								props.stock > 0 ? (
									<Box sx={{ display: "flex", gap: 2 }}>
										<Button
											sx={{
												boxShadow: "0px",
												backgroundColor: colors.blue[500],
												color: "#fff",
												"&:hover": {
													backgroundColor: colors.blue[700],
												},
											}}
										>
											Add to cart
										</Button>
										<Button
											sx={{
												boxShadow: "0px",
												backgroundColor: colors.blue[500],
												color: "#fff",
												"&:hover": {
													backgroundColor: colors.blue[700],
												},
											}}
										>
											Buy Now
										</Button>
									</Box>
								) : (
									""
								)
							) : (
								""
							)}
						</Stack>
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						<Stack
							spacing={2}
							sx={{ border: `1px solid ${colors.grey[300]}`, p: 2 }}
						>
							<Typography sx={{ fontWeight: 500 }}>Delivery</Typography>
							<Box sx={{ display: "flex", alignItems: "start", gap: 2 }}>
								<GoLocation style={{ color: colors.blue[500], fontSize: 20 }} />
								<Typography sx={{ fontSize: 12 }}>
									No.10, Nanthar Road, Ahlone Township, Yangon , Myanmar
									(Burma).
								</Typography>
							</Box>
							<Divider />
							<Box sx={{ display: "flex", alignItems: "start", gap: 2 }}>
								<BsTruck style={{ color: colors.blue[500], fontSize: 20 }} />
								<Typography sx={{ fontSize: 12 }}>
									32 hours for downtown YGN & 1-5 days for the others
								</Typography>
							</Box>
							<Divider />
							<Box sx={{ display: "flex", alignItems: "start", gap: 2 }}>
								<BsCash style={{ color: colors.blue[500], fontSize: 20 }} />
								<Typography sx={{ fontSize: 12 }}>
									Cash On Delivery is available
								</Typography>
							</Box>
							<Divider />
							<Box sx={{ display: "flex", alignItems: "start", gap: 2 }}>
								<FiRotateCcw
									style={{ color: colors.blue[500], fontSize: 20 }}
								/>
								<Typography sx={{ fontSize: 12 }}>
									Shipping is available
								</Typography>
							</Box>
						</Stack>
						<Stack
							spacing={2}
							sx={{ border: `1px solid ${colors.grey[300]}`, p: 2, mt: 2 }}
						>
							<Typography sx={{ fontWeight: 500 }}>Service</Typography>
							{props.product_warranties.map((warranty) => {
								return (
									<Box
										key={warranty.id}
										sx={{ display: "flex", alignItems: "start", gap: 2 }}
									>
										{warranty.service_key === "shield" ? (
											<MdOutlineSecurity
												style={{ color: colors.blue[500], fontSize: 20 }}
											/>
										) : (
											<GoLocation
												style={{ color: colors.blue[500], fontSize: 20 }}
											/>
										)}
										<Typography sx={{ fontSize: 12 }}>
											{warranty.service_value}
										</Typography>
										<Divider />
									</Box>
								);
							})}
							{/* <Box >
								<GoLocation style={{ color: colors.blue[500], fontSize: 20 }} />
								<Typography sx={{ fontSize: 12 }}>100 % Authentic</Typography>
							</Box>
							<Divider />
							<Box sx={{ display: "flex", alignItems: "start", gap: 2 }}>
								<MdOutlineSecurity
									style={{ color: colors.blue[500], fontSize: 20 }}
								/>
								<Typography sx={{ fontSize: 12 }}>1 Year Warranty</Typography>
							</Box> */}
						</Stack>
					</Grid>
				</Grid>
				<Box sx={{ borderBottom: 1, marginTop: 10, borderColor: "divider" }}>
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label="basic tabs example"
					>
						<Tab label="Description" {...a11yProps(0)} />
						<Tab label="Other Specification" {...a11yProps(1)} />
						<Tab label="Support & Download" {...a11yProps(2)} />
						<Tab label="Reviews" {...a11yProps(3)} />
					</Tabs>
				</Box>
				<TabPanel value={value} index={0}>
					<div dangerouslySetInnerHTML={{ __html: props.description }} />
				</TabPanel>
				<TabPanel value={value} index={1}>
					-
				</TabPanel>
				<TabPanel value={value} index={2}>
					{props.desc_file ? (
						<a href={"https://api.loiheng.duckdns.org" + props.desc_file}>
							Support & Download
						</a>
					) : (
						""
					)}
				</TabPanel>
				<TabPanel value={value} index={3}></TabPanel>
				<Box sx={{ marginTop: 10 }}>
					<Typography variant="h5">You may also like</Typography>
					<Box sx={{ py: 2 }}>
						{/* <Swiper
              slidesPerView={2}
              spaceBetween={10}
              navigation={true}
              breakpoints={{
                640: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 10,
                },
              }}
              modules={[Navigation]}
              className="mySwiper"
            >
              <SwiperSlide>
                <ProductCard />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard />
              </SwiperSlide>
            </Swiper> */}
					</Box>
				</Box>
			</Container>
		</Box>
	);
};

const FavButton = styled(Button)<ButtonProps>(({ theme }) => ({
	color: colors.pink[500],
	borderRadius: "4px",
	border: `1px solid ${colors.pink[500]}`,
	"&:hover": {
		color: "#fff",
		backgroundColor: colors.pink[700],
	},
}));
export default ProductDetailComponent;
