import useAllNewArrivalProduct from "@apis/useAllNewArrivalProduct";
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

const NewArrivalComponent = () => {
	// States
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(1);

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const { data, error, isValidating } = useAllNewArrivalProduct(page);

	const [newProduct, setNewProduct] =
		React.useState<GetProductListResponse["data"]>();

	const handlePage = (e: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	React.useEffect(() => {
		if (data) {
			setNewProduct(data.data);
			setTotal(data.data.pagination.last_page);
		}
	}, [data, setNewProduct]);

	return (
		<Box sx={{ py: 2 }}>
			<Container maxWidth={"lg"}>
				<Typography variant="h6">New Arrivals</Typography>
				<Typography variant="body2">
					Show all ({newProduct?.products.length}) results.
				</Typography>

				<Grid container spacing={1} sx={{ py: 2 }} columns={15}>
					{newProduct?.products.map((product, index) => {
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

export default NewArrivalComponent;
