import {
	Box,
	Button,
	ButtonProps,
	colors,
	IconButton,
	styled,
	Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Link from "next/link";

interface ProductInterface {
	id: number;
	image: string;
	name: string;
	price: string;
	category: string;
}

const myLoader = ({ src, width, quality }: any) => {
	return `https://api.loiheng.duckdns.org${src}?q=${quality || 75}`;
};

const ProductCard = (props: ProductInterface) => {
	return (
		<Box
			sx={{
				border: `1px solid ${colors.grey[300]}`,
				p: 1,
				borderRadius: "4px",
				"&:hover": {
					transition: "0.8s",
					border: `1px solid ${colors.blue[500]}`,
				},
			}}
		>
			<Link href={`/product/${props.id}`} legacyBehavior>
				<StyledLink>
					<Box
						sx={{
							position: "relative",
							width: "100%",
							height: "180px",
							transition: "transform 0.3s",
							"&:hover": {
								transform: " scale(1.05)",
							},
						}}
					>
						<Image
							src={props.image}
							alt={"ProductImage"}
							fill
							loader={myLoader}
							sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
						/>
					</Box>
					<Typography
						sx={{
							textAlign: "center",
							fontSize: 12,
							color: colors.grey[600],
							fontWeight: 500,
							py: 1,
						}}
					>
						{props.category}
					</Typography>
					<Typography
						sx={{
							textAlign: "center",
							fontSize: 14,
							fontWeight: 500,
							overflow: "hidden",
							textOverflow: "ellipsis",
							WebkitLineClamp: { xs: 2, lg: 2 },
							lineClamp: { xs: 2, lg: 2 },
							display: "-webkit-box",
							WebkitBoxOrient: "vertical",
						}}
					>
						{props.name}
					</Typography>
					<Typography
						sx={{
							textAlign: "center",
							fontSize: 13,
							color: colors.grey[700],
							py: 1,
							fontWeight: 500,
						}}
					>
						$ {props.price}
					</Typography>
				</StyledLink>
			</Link>
			<Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
				<AddtoCartButton size="small">Add to Cart</AddtoCartButton>
				<FavButton size={"small"}>
					<FavoriteBorderOutlinedIcon />
				</FavButton>
			</Box>
		</Box>
	);
};

// const ProductImage = styled("img")(({ theme }) => ({
//   width: "100%",
//   objectFit: "cover",
//   transition: "transform 0.3s",
//   "&:hover": {
//     transform: " scale(1.1)",
//   },
// }));
const AddtoCartButton = styled(Button)<ButtonProps>(({ theme }) => ({
	color: theme.palette.getContrastText(colors.blue[500]),
	width: "100%",
	backgroundColor: colors.blue[500],
	"&:hover": {
		backgroundColor: colors.blue[700],
	},
}));
const FavButton = styled(IconButton)<ButtonProps>(({ theme }) => ({
	color: colors.blue[500],
	borderRadius: "50%",
	border: `1px solid ${colors.blue[500]}`,
	transition: "0.3s",
	"&:hover": {
		color: "#fff",
		backgroundColor: colors.blue[500],
	},
}));

const StyledLink = styled("a")(({ theme }) => ({
	cursor: "pointer",
}));

export default ProductCard;
