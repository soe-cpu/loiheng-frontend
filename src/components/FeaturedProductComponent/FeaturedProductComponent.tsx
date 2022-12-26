import useAllFeatureProduct from "@apis/useAllFeatureProduct";
import { GetProductListResponse } from "@atoms/productListAtom";
import ProductCard from "@common/ProductCard";
import {
	Box,
	Container,
	Grid,
	Pagination,
	Stack,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import React, { useState } from "react";

const FeaturedProductComponent = () => {
	// States
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(1);

	const { data, error, isValidating } = useAllFeatureProduct();

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const [featured, setFeatured] =
		React.useState<GetProductListResponse["data"]>();

	const handlePage = (e: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	React.useEffect(() => {
		if (data) {
			setFeatured(data.data);
			setTotal(data.data.pagination.last_page);
		}
	}, [data, setFeatured]);

	return (
		<Box sx={{ py: 2 }}>
			<Container maxWidth={"lg"}>
				<Typography variant="h6">Featured Products</Typography>
				<Typography variant="body2">
					Show all ({featured?.products.length}) results.
				</Typography>

				<Grid container spacing={1} sx={{ py: 2 }} columns={15}>
					{featured?.products.map((product, index) => {
						return (
							<Grid item xs={15} md={3} key={index}>
								<ProductCard data={product} />
							</Grid>
						);
					})}
				</Grid>
				<Stack
					sx={{ paddingY: theme.spacing(5), marginTop: theme.spacing(5) }}
					justifyContent={"center"}
					alignItems={"center"}
				>
					<Pagination
						count={total}
						page={page}
						onChange={handlePage}
						variant="outlined"
						shape="rounded"
						showFirstButton
						showLastButton
						size={isMobile ? "medium" : "large"}
					/>
				</Stack>
			</Container>
		</Box>
	);
};

export default FeaturedProductComponent;
