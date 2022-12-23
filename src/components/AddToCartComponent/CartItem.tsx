import { CartItem } from "@interfaces/cart-item.interface";
import {
	Box,
	Typography,
	colors,
	IconButton,
	InputBase,
	Tooltip,
	Grid,
} from "@mui/material";
import cartStore from "@stores/cart.store";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const myLoader = ({ src, width, quality }: any) => {
	return `https://api.loiheng.duckdns.org${src}?q=${quality || 75}`;
};

export const CartItemComponent = (props: CartItem) => {
	const [qty, setQty] = useState(+props.qty);
	const { data: session } = useSession();
	const removeCartItem = cartStore((store) => store.removeFromCart);
	const changeQty = cartStore((store) => store.changeQuantity);

	const removeItem = (cart_item_id: number) => {
		if (session) {
			const res = removeCartItem(session, cart_item_id);
			res.then((d) => {
				d.success ? toast.success(d.message) : toast.error(d.message);
			});
		}
	};

	const updateQty = (q: number) => {
		setQty(q);
		if (session) {
			setTimeout(() => {
				changeQty(session, props.product[0].id, q);
			}, 2000);
		} else {
			signIn();
		}
	};

	return (
		<Grid container spacing={4}>
			<Grid item xs={12} md={4}>
				<Grid container spacing={2}>
					<Grid item xs={4}>
						<Box
							sx={{
								position: "relative",
								width: "100%",
								height: "120px",
							}}
						>
							<Image
								src={props.product[0].cover_img}
								alt="Add to cart Img"
								loader={myLoader}
								fill
								sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
							/>
						</Box>
					</Grid>
					<Grid item xs={8}>
						<Box>
							<Typography sx={{ fontSize: 12, color: colors.grey[700] }}>
								{props.product[0].name}
							</Typography>
							<Typography sx={{ fontSize: 10, color: colors.grey[600] }}>
								Sold By {props.product[0].brand[0].name}
							</Typography>
							<Typography sx={{ fontSize: 12, fontWeight: 500 }}>
								{new Intl.NumberFormat("mm-MM", {
									style: "currency",
									currency: "MMK",
									currencyDisplay: "code",
								}).format(props.product[0].price)}
							</Typography>
						</Box>
					</Grid>
				</Grid>
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
								props.product[0].stock <= 0
									? colors.red[800]
									: colors.green[800],
							fontWeight: 600,
						}}
					>
						{props.product[0].stock <= 0 ? "Out of stock" : "In Stock"}
					</Typography>
					<Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
						<IconButton
							sx={{
								color: colors.red[500],
								backgroundColor: colors.grey[100],
							}}
							onClick={() => {
								const stock = +props.product[0].stock;
								if (qty > 1) {
									updateQty(qty - 1);
								}
							}}
						>
							<RemoveIcon />
						</IconButton>
						<InputBase
							sx={{
								border: `2px solid ${colors.blue[500]}`,
								maxWidth: "70px",
								height: "50px",
								borderRadius: "4px",
								px: 1,
							}}
							inputProps={{
								style: {
									textAlign: "center",
								},
							}}
							onChange={(e) => {
								const stock = +props.product[0].stock;
								const q = +e.target.value;
								if (q <= stock && q > 0) {
									setQty(q);
								}
							}}
							onBlur={(e) => {
								updateQty(+e.target.value);
							}}
							value={qty}
						></InputBase>
						<IconButton
							sx={{
								color: colors.green[500],
								backgroundColor: colors.grey[100],
							}}
							onClick={() => {
								const stock = +props.product[0].stock;
								if (qty < stock) {
									updateQty(qty + 1);
								}
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
					<Typography>
						{new Intl.NumberFormat("mm-MM", {
							style: "currency",
							currency: "MMK",
							currencyDisplay: "code",
						}).format(props.product[0].price)}
					</Typography>
					<Tooltip title={"Remove Item"} arrow placement="top">
						<IconButton
							color="error"
							sx={{
								border: `1px solid ${colors.red[500]}`,
								"&:hover": {
									backgroundColor: colors.red[100],
								},
							}}
							onClick={() => removeItem(props.id)}
						>
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				</Box>
			</Grid>
		</Grid>
	);
};
