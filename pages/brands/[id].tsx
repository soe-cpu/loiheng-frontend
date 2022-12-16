import ProductByBrandComponent from "@components/BrandComponent/ProductByBrandComponent";
import ProductByBrand from "@components/BrandComponent/ProductByBrandComponent";
import MainLayout from "@layouts/MainLayout";
import { Box, Container, Typography } from "@mui/material";
import { Pagination, Product } from "@stores/wishlist.store";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { ReactElement } from "react";

export interface ProductByBrand {
	success: boolean;
	data: Data;
	message: string;
	status: number;
}

export interface Data {
	products: Product[];
	pagination: Pagination;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { req, params } = context;

	const { id } = params as { id: string };

	const url = process.env.API_URL;
	const res = await fetch(url + "products/brand/" + id);

	const data = (await res.json()) as ProductByBrand;

	return {
		props: {
			data,
		},
	};
};

const NewArrival = (props: { data: ProductByBrand }) => {
	return (
		<Box>
			<Head>
				<title>Loi Heng | Product by brand</title>
				<meta name="description" content="Loi Heng New Arrivals" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<ProductByBrandComponent {...props.data} />
		</Box>
	);
};

NewArrival.getLayout = function getLayout(page: ReactElement) {
	return <MainLayout>{page}</MainLayout>;
};

export default NewArrival;
