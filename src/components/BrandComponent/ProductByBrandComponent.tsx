import useAllNewArrivalProduct from "@apis/useAllNewArrivalProduct";
import { GetProductListResponse } from "@atoms/productListAtom";
import ProductCard from "@common/ProductCard";
import { Box, Container, Grid, Typography } from "@mui/material";
import { ProductByBrand } from "pages/brands/[id]";
import React from "react";

const ProductByBrandComponent = (props: ProductByBrand) => {
	const { products } = props.data;
	return (
		<Box sx={{ py: 2 }}>
			<Container maxWidth={"lg"}>
				<Typography variant="h6">
					Product of{" "}
					{props.data.products[0] ? props.data.products[0]?.brand[0].name : ""}
				</Typography>
				<Typography variant="body2">
					Show all ({props.data.products.length}) results.
				</Typography>

				<Grid container spacing={2} sx={{ py: 2 }} columns={15}>
					{products.map((product, index) => {
						return (
							<Grid item xs={7} md={3} key={index}>
								<ProductCard
									id={product.id}
									name={product.name}
									price={product.price}
									image={product.cover_img}
									category={product.category[0].name}
									data={product}
								/>
							</Grid>
						);
					})}
				</Grid>
			</Container>
		</Box>
	);
};

export default ProductByBrandComponent;
