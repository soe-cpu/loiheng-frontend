import {
	Box,
	Breadcrumbs,
	Container,
	Grid,
	Typography,
	colors,
	TextField,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Button,
	useTheme,
	Divider,
	styled,
} from "@mui/material";
import Link from "next/link";
import React, { useRef, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { useRouter } from "next/router";
import Image from "next/image";
import cartStore from "@stores/cart.store";
import addressStore, { Address } from "@stores/addressStore";
import orderStore from "@stores/order.store";
import { Session } from "next-auth";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Product } from "@interfaces/product.interface";
import { ProductDetails } from "@apis/useProductDetails";
import Swal from "sweetalert2";

const myLoader = ({ src, width, quality }: any) => {
	return `${src}?q=${quality || 75}`;
};

const CheckoutComponent = () => {
	// NOTE: Hooks
	const router = useRouter();

	const cartData = cartStore((store) => store.cart);
	const [address, setAddress] = React.useState("0");
	const [country, setCountry] = React.useState("");
	const [addressType, setAddressType] = React.useState("");
	const [showAddress, setShowAddress] = React.useState<Address>();
	const [product, setProduct] =
		React.useState<ProductDetails["data"]["products"][0]>();
	const [buyNowProduct, setBuyNowProduct] = React.useState<{
		product_id: number;
		qty: number;
	}>();

	const handleChangeAddressType = (event: SelectChangeEvent) => {
		setAddressType(event.target.value as string);
	};
	const handleChangeAddress = (event: SelectChangeEvent) => {
		setAddress(event.target.value as string);
	};
	const handleChangeCountry = (event: SelectChangeEvent) => {
		setCountry(event.target.value as string);
	};

	const [payment, setPayment] = useState("");
	console.log(payment);

	const { data: session } = useSession();
	// Api get Address start //
	const fullNameRef = useRef<HTMLInputElement>(null);
	const addressRef = useRef<HTMLInputElement>(null);
	const cityRef = useRef<HTMLInputElement>(null);
	const townshipRef = useRef<HTMLInputElement>(null);
	const regionRef = useRef<HTMLInputElement>(null);
	const phoneRef = useRef<HTMLInputElement>(null);

	const addressData = addressStore((store) => store.address);
	const order = orderStore((store) => store.createOrder);
	const isSaving = addressStore((store) => store.isSaving);

	const createOrder = () => {
		const address_id = Number(address);
		const full_name = fullNameRef.current?.value;
		const street_address = addressRef.current?.value;
		const city = cityRef.current?.value;
		const township = townshipRef.current?.value;
		const region = regionRef.current?.value;
		const phone = phoneRef.current?.value;
		const address_type = Number(addressType);
		const coupon_code = "";
		const coupon_price = "";
		const product_id = buyNowProduct?.product_id;
		const qty = buyNowProduct?.qty;

		if (session && (cartData || buyNowProduct)) {
			if (
				address_id === 0 &&
				full_name === "" &&
				street_address === "" &&
				city === "" &&
				township === "" &&
				phone === ""
			) {
				return Swal.fire(
					"No Address!",
					"You must choose an address.",
					"warning"
				);
			}

			if (payment === "") {
				return Swal.fire("No Payment!", "You must choose payment.", "warning");
			}

			Swal.showLoading(null);

			const res = order(
				session,
				address_id,
				full_name,
				phone,
				city,
				township,
				region,
				address_type,
				street_address,
				payment,
				coupon_code,
				coupon_price,
				product_id,
				qty
			).then((res) => {
				Swal.hideLoading();
				if (res) {
					router.replace("/profile/my-orders");
					Swal.fire(
						"Order Added",
						"Thanks for purchasing from Loiheng.",
						"success"
					);
				}
			});
		} else {
			Swal.hideLoading();
			toast.error("Something went wrong!");
			Swal.fire(
				"Something went wrong!",
				"Something went wrong to process order.",
				"error"
			);
		}
	};

	React.useEffect(() => {
		if (address) {
			const addr = addressData?.find((data) => data.id == Number(address));
			setShowAddress(addr);
		}
	}, [address, addressData]);

	React.useEffect(() => {
		const url = process.env.API_URL;

		const { product_id, qty } = router.query;
		if (product_id && qty) {
			getProduct(product_id as unknown as number);
			setBuyNowProduct({
				product_id: product_id as unknown as number,
				qty: qty as unknown as number,
			});
		}

		async function getProduct(id: number) {
			const response = await fetch(`${url}products/detail/${product_id}`);

			const data = (await response.json()) as ProductDetails;

			setProduct(data.data.products[0]);
		}
	}, []);

	return (
		<Box>
			{cartData || buyNowProduct ? (
				<Container maxWidth={"lg"}>
					<Breadcrumb />
					<Grid container spacing={3} sx={{ pb: 2 }}>
						{/* Shooping information start */}
						<Grid item xs={12} md={6}>
							<Typography
								sx={{ color: colors.blue[500], fontWeight: 500, pb: 2 }}
							>
								Shopping Information
							</Typography>
							<Box sx={{ pb: 2 }}>
								<label>Your Address</label>
								<FormControl fullWidth size="small" sx={{ mt: 2 }}>
									<InputLabel id="demo-simple-select-label-country">
										Address
									</InputLabel>
									<Select
										labelId="demo-simple-select-label-country"
										id="demo-simple-select-country"
										value={address}
										label="Address"
										onChange={handleChangeAddress}
									>
										<MenuItem value="0">Create New</MenuItem>
										{addressData?.map((data, index) => {
											return (
												<MenuItem value={data.id} key={index}>
													{data.full_name}
												</MenuItem>
											);
										})}
									</Select>
								</FormControl>
							</Box>

							{showAddress ? (
								<Box sx={{ border: `1px solid ${colors.blue[300]}` }}>
									<Typography sx={{ p: 2, fontWeight: 500 }}>
										{showAddress.full_name}
									</Typography>
									<Divider />
									<Box
										sx={{
											p: 2,
											display: "flex",
											flexDirection: "column",
											gap: 2,
										}}
									>
										<Typography sx={{ fontWeight: 500 }}>
											Name:{" "}
											<span style={{ color: colors.grey[600] }}>
												{showAddress.full_name}
											</span>
										</Typography>
										<Typography sx={{ fontWeight: 500 }}>
											Address Type:{" "}
											<span style={{ color: colors.grey[600] }}>
												{showAddress.address_type}
											</span>
										</Typography>
										<Typography sx={{ fontWeight: 500 }}>
											City:{" "}
											<span style={{ color: colors.grey[600] }}>
												{showAddress.city}
											</span>
										</Typography>
										<Typography sx={{ fontWeight: 500 }}>
											Township:{" "}
											<span style={{ color: colors.grey[600] }}>
												{showAddress.township}
											</span>
										</Typography>
										<Typography sx={{ fontWeight: 500 }}>
											Region:{" "}
											<span style={{ color: colors.grey[600] }}>
												{showAddress.region}
											</span>
										</Typography>
										<Typography sx={{ fontWeight: 500 }}>
											Phone No:{" "}
											<span style={{ color: colors.grey[600] }}>
												{showAddress.phone}
											</span>
										</Typography>
									</Box>
								</Box>
							) : (
								<Box sx={{ border: `1px solid ${colors.blue[300]}`, p: 2 }}>
									<Grid container spacing={4}>
										<Grid item xs={6}>
											<TextField
												id="outlined-basic"
												label="Full Name"
												variant="outlined"
												inputRef={fullNameRef}
												fullWidth
												size="small"
											/>
										</Grid>
										<Grid item xs={6}>
											<TextField
												id="outlined-basic"
												label="Phone Number"
												inputRef={phoneRef}
												variant="outlined"
												fullWidth
												size="small"
											/>
										</Grid>
										<Grid item xs={6}>
											<TextField
												id="outlined-basic"
												label="Township"
												variant="outlined"
												inputRef={townshipRef}
												fullWidth
												size="small"
											/>
										</Grid>
										<Grid item xs={6}>
											<TextField
												id="outlined-basic"
												label="City"
												inputRef={cityRef}
												variant="outlined"
												fullWidth
												size="small"
											/>
										</Grid>
										<Grid item xs={6}>
											<TextField
												id="outlined-basic"
												label="Region"
												inputRef={regionRef}
												variant="outlined"
												fullWidth
												size="small"
											/>
										</Grid>
										<Grid item xs={6}>
											<FormControl fullWidth size="small">
												<InputLabel id="demo-simple-select-label">
													Address Type
												</InputLabel>
												<Select
													labelId="demo-simple-select-label"
													id="demo-simple-select"
													value={addressType}
													label="Age"
													onChange={handleChangeAddressType}
												>
													<MenuItem value={1}>Home</MenuItem>
													<MenuItem value={2}>Work</MenuItem>
													<MenuItem value={3}>Address 1</MenuItem>
													<MenuItem value={4}>Address 2</MenuItem>
													<MenuItem value={5}>Address 3</MenuItem>
												</Select>
											</FormControl>
										</Grid>
										<Grid item xs={12}>
											<TextField
												id="outlined-basic"
												label="Address"
												variant="outlined"
												fullWidth
												multiline
												rows={4}
												size="small"
												inputRef={addressRef}
											/>
										</Grid>
										{/* <Grid item xs={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="demo-simple-select-label-country">
                        Country
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label-country"
                        id="demo-simple-select-country"
                        value={country}
                        label="Age"
                        onChange={handleChangeCountry}
                      >
                        <MenuItem value={10}>Myanmar</MenuItem>
                        <MenuItem value={20}>Singapore</MenuItem>
                        <MenuItem value={30}>Japan</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid> */}
									</Grid>
								</Box>
							)}
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									py: 2,
								}}
							>
								<Button
									startIcon={<KeyboardDoubleArrowLeftIcon />}
									size={"small"}
									variant="outlined"
									onClick={() => router.back()}
								>
									Back
								</Button>
								<Button
									size="small"
									sx={{
										boxShadow: "0px",
										backgroundColor: colors.blue[500],
										color: "#fff",
										"&:hover": {
											backgroundColor: colors.blue[700],
										},
									}}
									onClick={createOrder}
									disabled={isSaving}
								>
									Order Now
								</Button>
							</Box>
						</Grid>
						{/* Shooping information end */}
						<Grid item xs={12} md={6}>
							{/* Choose Payment method start */}
							<Typography
								sx={{ color: colors.blue[500], fontWeight: 500, pb: 2 }}
							>
								Choose a payment method
							</Typography>
							<Grid container spacing={2}>
								<Grid item xs={6} md={4}>
									<label>
										<input
											type="radio"
											name="payment"
											value="bankaccount"
											onChange={(e) => setPayment(e.target.value)}
										/>
										<StyledRadioBox className="radio_check">
											<StyledImageBox>
												<Image
													src={"/bank.gif"}
													alt="Bank Gif"
													loader={myLoader}
													fill
													sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
												/>
											</StyledImageBox>
											<Typography
												sx={{ color: colors.blue[500], fontSize: 14 }}
											>
												Bank Account
											</Typography>
										</StyledRadioBox>
									</label>
								</Grid>
								<Grid item xs={6} md={4}>
									<label>
										<input
											type="radio"
											name="payment"
											value="pickup"
											onChange={(e) => setPayment(e.target.value)}
										/>
										<StyledRadioBox className="radio_check">
											<StyledImageBox>
												<Image
													src={"/pickup.gif"}
													alt="Pickup Gif"
													loader={myLoader}
													fill
													sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
												/>
											</StyledImageBox>
											<Typography
												sx={{ color: colors.blue[500], fontSize: 14 }}
											>
												Pickup By Myself
											</Typography>
										</StyledRadioBox>
									</label>
								</Grid>
								<Grid item xs={6} md={4}>
									<label>
										<input
											type="radio"
											name="payment"
											value="cash"
											onChange={(e) => setPayment(e.target.value)}
										/>
										<StyledRadioBox className="radio_check">
											<StyledImageBox>
												<Image
													src={"/cod.gif"}
													alt="Cod Gif"
													loader={myLoader}
													fill
													sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
												/>
											</StyledImageBox>
											<Typography
												sx={{ color: colors.blue[500], fontSize: 14 }}
											>
												Cash On Delivery(COD)
											</Typography>
										</StyledRadioBox>
									</label>
								</Grid>
								<Grid item xs={6} md={4}>
									<label>
										<input
											type="radio"
											name="payment"
											value="2c2p"
											onChange={(e) => setPayment(e.target.value)}
										/>
										<StyledRadioBox className="radio_check">
											<StyledImageBox>
												<Image
													src={"/2c2p.png"}
													alt="2c2p Gif"
													loader={myLoader}
													fill
													sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
												/>
											</StyledImageBox>
											<Typography
												sx={{ color: colors.blue[500], fontSize: 14 }}
											>
												2C2P
											</Typography>
										</StyledRadioBox>
									</label>
								</Grid>
							</Grid>
							{/* Choose Payment method end */}

							{/* Payment Info start */}
							{payment == "bankaccount" ? (
								<Box
									sx={{ border: `1px solid ${colors.grey[300]}`, p: 1, my: 2 }}
								>
									<Typography
										sx={{ color: colors.blue[500], fontWeight: 500, pb: 2 }}
									>
										Bank Payment Information
									</Typography>
									<Grid container spacing={2}>
										<Grid item xs={12} lg={6}>
											<Box
												sx={{
													border: `1px solid ${colors.blue[500]}`,
													p: 1,
													gap: 2,
													boxShadow: `1px 1px 5px ${colors.grey[300]}`,
													borderRadius: "4px",
													display: "flex",
													flexDirection: "column",
												}}
											>
												<Box
													sx={{
														position: "relative",
														width: "100%",
														height: "110px",
													}}
												>
													<Image
														src={"/kbz.png"}
														alt="Cod Gif"
														loader={myLoader}
														fill
														sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
													/>
												</Box>
												<Box>
													<Typography variant="subtitle2">
														A/C name:{" "}
														<span style={{ color: colors.blue[500] }}>
															Soe Soe Aye
														</span>
													</Typography>
													<Typography variant="subtitle2">
														A/C number:{" "}
														<span style={{ color: colors.blue[500] }}>
															02510104501423801
														</span>
													</Typography>
												</Box>
											</Box>
										</Grid>
										<Grid item xs={12} lg={6}>
											<Box
												sx={{
													border: `1px solid ${colors.blue[500]}`,
													p: 1,
													gap: 2,
													boxShadow: `1px 1px 5px ${colors.grey[300]}`,
													borderRadius: "4px",
													display: "flex",
													flexDirection: "column",
												}}
											>
												<Box
													sx={{
														position: "relative",
														width: "100%",
														height: "110px",
													}}
												>
													<Image
														src={"/aya.jpg"}
														alt="Cod Gif"
														loader={myLoader}
														fill
														sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
													/>
												</Box>
												<Box>
													<Typography variant="subtitle2">
														A/C name:{" "}
														<span style={{ color: colors.blue[500] }}>
															Thein Han & Khine Myae{" "}
														</span>
													</Typography>
													<Typography variant="subtitle2">
														A/C number:{" "}
														<span style={{ color: colors.blue[500] }}>
															400276 88539
														</span>
													</Typography>
												</Box>
												{/* <Typography variant="subtitle2">
                          AYA-SPECIAL ACCOUNT
                        </Typography> */}
											</Box>
										</Grid>
									</Grid>
								</Box>
							) : (
								""
							)}

							{/* Payment Info end */}

							{/* Order Summary start */}
							<Typography
								sx={{ color: colors.blue[500], fontWeight: 500, py: 2 }}
							>
								Order Summary
							</Typography>
							<OrderSummary product={product} qty={buyNowProduct?.qty} />
							{/* Order Summary end */}
						</Grid>
					</Grid>
				</Container>
			) : (
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
						gap: 2,
					}}
				>
					<Box
						sx={{
							position: "relative",
							width: "300px",
							height: "300px",
						}}
					>
						<Image
							src={"/no-prod.gif"}
							alt="Shipping Gif"
							loader={myLoader}
							fill
							sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
						/>
					</Box>
					<Link href={"/product"} legacyBehavior>
						<a style={{ textDecoration: "none" }}>
							<Button
								variant="contained"
								size="small"
								sx={{
									boxShadow: 0,
									"&:hover": {
										boxShadow: 0,
									},
								}}
							>
								Go to Shopping
							</Button>
						</a>
					</Link>
				</Box>
			)}
		</Box>
	);
};

interface OrderSummaryProps {
	product?: any;
	qty?: number;
}

const OrderSummary = (props: OrderSummaryProps) => {
	const cartData = cartStore((store) => store.cart);
	const theme = useTheme();
	return (
		<Box>
			<TableContainer>
				<Table aria-label="simple table">
					<TableBody>
						{props.product ? (
							<TableRow
								sx={{
									"&:last-child td, &:last-child th": {
										border: 0,
										borderBottom: `1px solid ${colors.grey[300]}`,
									},
								}}
							>
								<TableCell component="th" scope="row">
									1
								</TableCell>
								<TableCell>{props?.product?.name ?? "Name"}</TableCell>
								<TableCell>
									{new Intl.NumberFormat("mm-MM", {
										style: "currency",
										currency: "MMK",
										currencyDisplay: "code",
									}).format(
										props?.product?.discount.length > 0
											? props?.product?.discount[0].promo_price
											: props?.product?.price
									)}
								</TableCell>
								<TableCell>{props?.qty}</TableCell>
							</TableRow>
						) : (
							<>
								{cartData?.cart_item.map((cart, index) => {
									return (
										<TableRow
											key={index}
											sx={{
												"&:last-child td, &:last-child th": {
													border: 0,
													borderBottom: `1px solid ${colors.grey[300]}`,
												},
											}}
										>
											<TableCell component="th" scope="row">
												{(index = index + 1)}
											</TableCell>
											<TableCell>{cart.product[0].name}</TableCell>
											<TableCell>
												{new Intl.NumberFormat("mm-MM", {
													style: "currency",
													currency: "MMK",
													currencyDisplay: "code",
												}).format(
													cart.product[0].discount.length > 0
														? cart.product[0].discount[0].promo_price
														: cart.product[0].price
												)}
											</TableCell>
											<TableCell>{cart.qty}</TableCell>
										</TableRow>
									);
								})}
							</>
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					py: 2,
					px: 1,
				}}
			>
				<Typography sx={{ fontSize: 14, fontWeight: 500 }}>
					Subtotal:{" "}
				</Typography>
				{props.product && props.qty ? (
					<Typography sx={{ fontSize: 14 }}>
						{new Intl.NumberFormat("mm-MM", {
							style: "currency",
							currency: "MMK",
							currencyDisplay: "code",
						}).format(
							props?.product?.discount.length > 0
								? props?.product?.discount[0].promo_price * props.qty
								: props?.product?.price * props.qty
						)}
					</Typography>
				) : cartData ? (
					<Typography sx={{ fontSize: 14 }}>
						{new Intl.NumberFormat("mm-MM", {
							style: "currency",
							currency: "MMK",
							currencyDisplay: "code",
						}).format(cartData.subtotal)}
					</Typography>
				) : (
					""
				)}
			</Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					py: 2,
					backgroundColor: colors.grey[100],
					alignItems: "center",
					px: 1,
				}}
			>
				<Typography sx={{ fontSize: 14, fontWeight: 500 }}>
					Standard Delivery:{" "}
				</Typography>
				<Typography sx={{ fontSize: 14 }}>0 Ks </Typography>
			</Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					py: 2,
					alignItems: "center",
					px: 1,
				}}
			>
				<Typography sx={{ fontWeight: 500, fontSize: 18 }}>Total: </Typography>
				<Typography sx={{ fontWeight: 500, fontSize: 18 }}>
					{props.product && props.qty ? (
						<Typography sx={{ fontSize: 14 }}>
							{new Intl.NumberFormat("mm-MM", {
								style: "currency",
								currency: "MMK",
								currencyDisplay: "code",
							}).format(
								props?.product?.discount.length > 0
									? props?.product?.discount[0].promo_price * props.qty
									: props?.product?.price * props.qty
							)}
						</Typography>
					) : cartData ? (
						<Typography sx={{ fontSize: 14 }}>
							{new Intl.NumberFormat("mm-MM", {
								style: "currency",
								currency: "MMK",
								currencyDisplay: "code",
							}).format(cartData.subtotal)}
						</Typography>
					) : (
						""
					)}
					{/* {cartData ? (
						<Typography sx={{ fontSize: 14 }}>
							{new Intl.NumberFormat("mm-MM", {
								style: "currency",
								currency: "MMK",
								currencyDisplay: "code",
							}).format(cartData.subtotal)}
						</Typography>
					) : (
						""
					)} */}
				</Typography>
			</Box>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					gap: 2,
					color: colors.blue[500],
					marginTop: theme.spacing(3),
				}}
			>
				<ArrowBackIcon />
				<Link href={"/product"} legacyBehavior>
					<a
						style={{
							textDecoration: "none",
							fontWeight: 500,
							color: colors.blue[500],
						}}
					>
						Continue Shopping
					</a>
				</Link>
			</Box>
		</Box>
	);
};

const Breadcrumb = () => {
	return (
		<Breadcrumbs aria-label="breadcrumb" sx={{ py: 2 }}>
			<Link href="/" legacyBehavior>
				<a style={{ textDecoration: "none" }}>Home</a>
			</Link>
			<Link href="/product" legacyBehavior>
				<a style={{ textDecoration: "none" }}>Product</a>
			</Link>
			<Typography color="text.primary">Product Detail</Typography>
			<Typography color="text.primary">Payment</Typography>
		</Breadcrumbs>
	);
};

const StyledRadioBox = styled(Box)(({ theme }) => ({
	border: `1px solid ${colors.grey[300]}`,
	padding: "6px 0px",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	width: "100%",
	flexDirection: "column",
	borderRadius: "4px",
	boxShadow: `1px 1px 5px ${colors.grey[100]}`,
}));

const StyledImageBox = styled(Box)(({ theme }) => ({
	position: "relative",
	width: "80px",
	height: "80px",
}));

export default CheckoutComponent;
