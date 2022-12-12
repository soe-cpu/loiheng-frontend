import MainLayout from "@layouts/MainLayout";
import { Box, Container, Grid, Typography } from "@mui/material";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { ReactElement } from "react";
import axios from "axios";
import { SettingResponse } from "@atoms/settingResponse";
import wishlistStore from "@stores/wishlist.store";
import ProductCard from "@common/ProductCard";

export const getServerSideProps = async () => {
	const url = process.env.API_URL;
	const res = await fetch(url + "settings/about");

	const data = (await res.json()) as SettingResponse;

	return {
		props: {
			content: data.data[0].value,
		},
	};
};

const WishlistPage = (props: { content: string }) => {
	const wishlists = wishlistStore((store) => store.wishlists);

	return (
		<Box>
			<Head>
				<title>Loi Heng | Wishlist</title>
				<meta name="description" content="Loi Heng About Us" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Box sx={{ py: 2 }}>
				<Container>
					<Typography variant="h6">Wishlist</Typography>
					<Typography variant="body2">
						Show all ({wishlists?.length}) results.
					</Typography>
					<Grid container spacing={2} columns={15} paddingY={2}>
						{wishlists?.map((product) => {
							return (
								<Grid item key={product.id} xs={15} lg={3} md={3} sm={5}>
									<ProductCard
										id={product.id}
										image={product.cover_img}
										price={product.price}
										name={product.name}
										category={product.category[0].name}
									/>
								</Grid>
							);
						})}
					</Grid>
				</Container>
			</Box>
		</Box>
	);
};

WishlistPage.getLayout = function getLayout(page: ReactElement) {
	return <MainLayout>{page}</MainLayout>;
};

export default WishlistPage;
