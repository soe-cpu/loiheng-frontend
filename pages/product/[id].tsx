import useProductDetails, { ProductDetails } from "@apis/useProductDetails";
import { ProductDetailComponent } from "@components/ProductComponent";
import MainLayout from "@layouts/MainLayout";
import { Box } from "@mui/material";
import axios from "axios";
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement } from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { res, req, params } = context;

	const { id } = params as { id: string };

	res.setHeader(
		"Cache-Control",
		"public, s-maxage=10, stale-while-revalidate=59"
	);
	const url = process.env.API_URL;
	const response = await fetch(`${url}products/detail/${id}`);

	const data = (await response.json()) as ProductDetails;

	return {
		props: { data: data.data.products[0] }, // will be passed to the page component as props
	};
};

interface ProductPage {
	data: ProductDetails["data"]["products"][0];
}

export default function ProductPage(props: ProductPage) {
	const { data } = props;
	return (
		<Box>
			<Head>
				<title>Loi Heng | {data.name}</title>
				<meta name="description" content="Loi Heng" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<ProductDetailComponent {...props.data} />
		</Box>
	);
}

ProductPage.getLayout = function getLayout(page: ReactElement) {
	return <MainLayout>{page}</MainLayout>;
};
