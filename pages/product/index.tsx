import { ProductComponent } from "@components/ProductComponent";
import { Brand } from "@interfaces/brand.interface";
import { Category } from "@interfaces/category.interface";
import { Pagination } from "@interfaces/pagination.interface";
import MainLayout from "@layouts/MainLayout";
import { Box } from "@mui/material";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { ReactElement } from "react";

export interface GetAllCategories {
	success: boolean;
	data: Categories;
	message: string;
	status: number;
}

export interface Categories {
	categories: Category[];
	pagination: Pagination;
}

export interface GetAllBrands {
	success: boolean;
	data: Brands;
	message: string;
	status: number;
}

export interface Brands {
	brands: Brand[];
	pagination: Pagination;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const url = process.env.API_URL;
	const categoriesRes = await fetch(url + "categories?limit=1000");
	const brandsRes = await fetch(url + "brands?limit=1000");

	const categories = (await categoriesRes.json()) as GetAllCategories;
	const brands = (await brandsRes.json()) as GetAllCategories;

	return {
		props: {
			categories,
			brands,
		},
	};
};

const Product = (props: {
	brands: GetAllBrands;
	categories: GetAllCategories;
}) => {
	return (
		<Box>
			<Head>
				<title>Loi Heng - Product</title>
				<meta name="description" content="Loi Heng Product" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<ProductComponent {...props} />
		</Box>
	);
};

Product.getLayout = function getLayout(page: ReactElement) {
	return <MainLayout>{page}</MainLayout>;
};

export default Product;
