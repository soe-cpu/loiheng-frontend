import useAllNewArrivalProduct from "@apis/useAllNewArrivalProduct";
import { GetProductListResponse } from "@atoms/productListAtom";
import ProductCard from "@common/ProductCard";
import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";

const NewArrivalComponent = () => {
	const { data, error, isValidating } = useAllNewArrivalProduct();

	const [newProduct, setNewProduct] =
		React.useState<GetProductListResponse["data"]>();

	React.useEffect(() => {
		if (data) {
			setNewProduct(data.data);
		}
	}, [data, setNewProduct]);
	return (
		<Box sx={{ py: 2 }}>
			<Container maxWidth={"lg"}>
				<Typography variant="h6">New Arrivals</Typography>
				<Typography variant="body2">
					Show all ({newProduct?.products.length}) results.
				</Typography>

				<Grid container spacing={2} sx={{ py: 2 }} columns={15}>
					{newProduct?.products.map((product, index) => {
						return (
							<Grid item xs={7} md={3} key={index}>
								<ProductCard
									id={product.id}
									name={product.name}
									price={product.price}
									image={product.cover_img}
									category={product.category[0].name}
								/>
							</Grid>
						);
					})}
				</Grid>
			</Container>
		</Box>
	);
};

export default NewArrivalComponent;
