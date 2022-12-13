import MainLayout from "@layouts/MainLayout";
import { Box, Container, Grid, Typography } from "@mui/material";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { ReactElement } from "react";
import axios from "axios";
import { SettingResponse } from "@atoms/settingResponse";
import wishlistStore from "@stores/wishlist.store";
import ProductCard from "@common/ProductCard";
import { authOptions, Me } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await unstable_getServerSession(
		context.req,
		context.res,
		authOptions
	);

	if (!session) {
		return {
			redirect: {
				destination: "/auth/login",
				permanent: false,
			},
		};
	}

	const data = (await axios
		.get(`${process.env.API_URL}auth/me`, {
			headers: {
				Authorization: `${session.token}`,
			},
		})
		.then((res) => res.data)) as Me;

	return {
		props: { data },
	};
};

const WishlistPage = (props: { data: Me }) => {
	const wishlists = wishlistStore((store) => store.wishlists);

	return (
		<Box>
			<Head>
				<title>Loi Heng | Wishlists</title>
				<meta name="description" content="Loi Heng About Us" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Box sx={{ py: 2 }}>
				<Container>
					<Typography variant="h6">Wishlists</Typography>
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
										data={product}
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
