import {
	Box,
	Button,
	colors,
	Container,
	Divider,
	Grid,
	IconButton,
	InputBase,
	Tooltip,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import Image from "next/image";
import cartStore from "@stores/cart.store";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

const myLoader = ({ src, width, quality }: any) => {
	return `https://api.loiheng.duckdns.org${src}?q=${quality || 75}`;
};
const myLoaderGif = ({ src, width, quality }: any) => {
	return `${src}?q=${quality || 75}`;
};

const AddToCartComponent = () => {
	const [subtotal, setSubtotal] = useState<String>("");
	const cartData = cartStore((store) => store.carts);
	const removeCartItem = cartStore((store) => store.removeFromCart);

	const { data: session } = useSession();

	const removeItem = (product_id: number) => {
		if (session) {
			const res = removeCartItem(session, product_id);
			res.then((d) => {
				d.success ? toast.success(d.message) : toast.error(d.message);
			});
		}
	};

	return (
		<Box sx={{ py: 2 }}>
			<Container>
				<Box sx={{ border: `1px solid ${colors.grey[300]}` }}>
					<Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
						<Typography sx={{ fontWeight: 500 }}>Shopping Cart</Typography>
						<Typography>{cartData?.length} items</Typography>
					</Box>
					<Divider />
					<Box sx={{ p: 2 }}>
						{cartData?.map((cart, index) => {
							return (
								<Grid container spacing={4} key={index}>
									<Grid item xs={12} md={4}>
										<Box
											sx={{
												display: "flex",
												gap: { sm: 1, md: 4 },
												alignItems: "center",
											}}
										>
											<Box
												sx={{
													position: "relative",
													width: "120px",
													height: "120px",
												}}
											>
												<Image
													src={cart.product[0].cover_img}
													alt="Add to cart Img"
													loader={myLoader}
													fill
													sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
												/>
											</Box>
											<Box>
												<Typography
													sx={{ fontSize: 12, color: colors.grey[700] }}
												>
													{cart.product[0].name}
												</Typography>
												<Typography
													sx={{ fontSize: 10, color: colors.grey[600] }}
												>
													Sold By {cart.product[0].brand[0].name}
												</Typography>
												<Typography sx={{ fontSize: 12, fontWeight: 500 }}>
													Ks {cart.product[0].price}
												</Typography>
											</Box>
										</Box>
									</Grid>
									<Grid item xs={12} md={4}>
										<Box
											sx={{
												display: "flex",
												justifyContent: "space-between",
												alignItems: "center",
												height: "100%",
											}}
										>
											<Typography
												sx={{
													color:
														cart.product[0].stock <= 0
															? colors.red[800]
															: colors.green[800],
													fontWeight: 600,
												}}
											>
												{cart.product[0].stock <= 0
													? "Out of stock"
													: "In Stock"}
											</Typography>
											<Box
												sx={{ display: "flex", gap: 1, alignItems: "center" }}
											>
												<IconButton
													sx={{
														color: colors.red[500],
														backgroundColor: colors.grey[100],
													}}
												>
													<RemoveIcon />
												</IconButton>
												<InputBase
													sx={{
														border: `2px solid ${colors.blue[500]}`,
														width: "50px",
														height: "50px",
														borderRadius: "4px",
														px: 2,
													}}
													value={cart.qty}
												></InputBase>
												<IconButton
													sx={{
														color: colors.green[500],
														backgroundColor: colors.grey[100],
													}}
												>
													<AddIcon />
												</IconButton>
											</Box>
										</Box>
									</Grid>
									<Grid item xs={12} md={4}>
										<Box
											sx={{
												display: "flex",
												justifyContent: "space-between",
												alignItems: "center",
												height: "100%",
											}}
										>
											<Typography>Ks {cart.product[0].price}</Typography>
											<Tooltip title={"Remove Item"} arrow placement="top">
												<IconButton
													color="error"
													sx={{
														border: `1px solid ${colors.red[500]}`,
														"&:hover": {
															backgroundColor: colors.red[100],
														},
													}}
													onClick={() => removeItem(cart.id)}
												>
													<DeleteIcon />
												</IconButton>
											</Tooltip>
										</Box>
									</Grid>
								</Grid>
							);
						})}
					</Box>
				</Box>
				<Grid container sx={{ mt: 4 }} spacing={4}>
					<Grid item xs={12} md={6}>
						<Box sx={{ display: "flex", gap: 4 }}>
							<Typography variant="h6">Promocode:</Typography>
							<InputBase
								sx={{ border: `1px solid ${colors.grey[300]}` }}
								fullWidth
							></InputBase>
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
								Apply
							</Button>
						</Box>
					</Grid>
					<Grid item xs={12} md={6}>
						<Box sx={{ display: "flex", justifyContent: "space-between" }}>
							<Box>
								<Typography sx={{ fontWeight: 500 }}>Sub Total:</Typography>
								<Typography sx={{ fontWeight: 500 }}>
									Promocode discount:
								</Typography>
								<Typography sx={{ fontWeight: 500 }}>Total:</Typography>
							</Box>
							<Box>
								<Typography>{subtotal} MMK</Typography>
								<Typography>3,269,370 MMK</Typography>
								<Typography>3,269,370 MMK</Typography>
							</Box>
						</Box>
						<Divider />
						<Box
							sx={{ py: 2, display: "flex", justifyContent: "space-between" }}
						>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									gap: 2,
									color: colors.blue[500],
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
							<Box>
								<Link href={"/checkout/test"} legacyBehavior>
									<a style={{ textDecoration: "none" }}>
										<Button
											sx={{
												boxShadow: "0px",
												backgroundColor: colors.blue[500],
												color: "#fff",
												"&:hover": {
													backgroundColor: colors.blue[700],
												},
											}}
											fullWidth
										>
											Checkout
										</Button>
									</a>
								</Link>
							</Box>
						</Box>
						<Divider />
					</Grid>
				</Grid>
				<Box
					sx={{
						border: `1px solid ${colors.blue[500]}`,
						px: 2,
						py: 4,
						borderRadius: "6px",
						mt: 4,
					}}
				>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6} lg={3}>
							<Box
								sx={{
									display: "flex",
									gap: 2,
									alignItems: "center",
									borderRight: `1px solid ${colors.grey[300]}`,
								}}
							>
								<Box
									sx={{
										position: "relative",
										width: "70px",
										height: "70px",
									}}
								>
									<Image
										src={"/cart.gif"}
										alt="Cart Gif"
										loader={myLoaderGif}
										fill
										sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
									/>
								</Box>
								<Box>
									<Typography variant="h6">Add to Cart</Typography>
									<Typography variant="caption">Add your products.</Typography>
								</Box>
							</Box>
						</Grid>
						<Grid item xs={12} md={6} lg={3}>
							<Box
								sx={{
									display: "flex",
									gap: 2,
									alignItems: "center",
									borderRight: `1px solid ${colors.grey[300]}`,
								}}
							>
								<Box
									sx={{
										position: "relative",
										width: "70px",
										height: "70px",
									}}
								>
									<Image
										src={"/payment.gif"}
										alt="Payment Gif"
										loader={myLoaderGif}
										fill
										sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
									/>
								</Box>
								<Box>
									<Typography variant="h6">Payment</Typography>
									<Typography variant="caption">
										Pay for many method.
									</Typography>
								</Box>
							</Box>
						</Grid>
						<Grid item xs={12} md={6} lg={3}>
							<Box
								sx={{
									display: "flex",
									gap: 2,
									alignItems: "center",
									borderRight: `1px solid ${colors.grey[300]}`,
								}}
							>
								<Box
									sx={{
										position: "relative",
										width: "70px",
										height: "70px",
									}}
								>
									<Image
										src={"/shipping.gif"}
										alt="Shipping Gif"
										loader={myLoaderGif}
										fill
										sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
									/>
								</Box>
								<Box>
									<Typography variant="h6">Shipping</Typography>
									<Typography variant="caption">
										Order from anywhere.
									</Typography>
								</Box>
							</Box>
						</Grid>
						<Grid item xs={12} md={6} lg={3}>
							<Box
								sx={{
									display: "flex",
									gap: 2,
									alignItems: "center",
									borderRight: `1px solid ${colors.grey[300]}`,
								}}
							>
								<Box
									sx={{
										position: "relative",
										width: "70px",
										height: "70px",
									}}
								>
									<Image
										src={"/service.gif"}
										alt="Service Gif"
										loader={myLoaderGif}
										fill
										sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
									/>
								</Box>
								<Box>
									<Typography variant="h6">Service</Typography>
									<Typography variant="caption">24 hr service.</Typography>
								</Box>
							</Box>
						</Grid>
					</Grid>
				</Box>
			</Container>
		</Box>
	);
};

export default AddToCartComponent;
