import ProductByBrandComponent from "@components/BrandComponent/ProductByBrandComponent";
import ProductByBrand from "@components/BrandComponent/ProductByBrandComponent";
import MainLayout from "@layouts/MainLayout";
import { Box, Container, Typography } from "@mui/material";
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

export interface Product {
	id: number;
	product_code: string;
	name: string;
	price: string;
	cover_img: string;
	description: any;
	short_description: any;
	sku: string;
	stock: any;
	desc_file: string;
	approved_by: any;
	approved_when: any;
	status: any;
	is_active: number;
	is_preorder: any;
	is_feature_product: number;
	is_new_arrival: number;
	created_by: CreatedBy[];
	category: Category[];
	brand: Brand[];
	product_specs: ProductSpec[];
	product_warranties: ProductWarranty[];
	product_pictures: any[];
	created_at: string;
	updated_at: string;
}

export interface CreatedBy {
	id: number;
	fullname: string;
	email: string;
	email_verified_at: any;
	phone_no: any;
	is_admin: string;
	is_active: number;
	last_login: any;
	role: any;
	status: any;
	dob: any;
	gender: any;
	profile_img: any;
	provider: any;
	provider_id: any;
	provider_token: any;
	created_at: string;
	updated_at: string;
}

export interface Category {
	id: number;
	name: string;
	description: string;
	level: any;
	picture: string;
	picture_blob: any;
	status: any;
	created_by: number;
	parent: number;
	created_at: string;
	updated_at: string;
}

export interface Brand {
	id: number;
	name: string;
	description: string;
	picture: string;
	is_active: number;
	created_by: number;
	created_at: string;
	updated_at: string;
}

export interface ProductSpec {
	id: number;
	product_id: number;
	spec_key: string;
	spec_value: string;
	created_at: string;
	updated_at: string;
}

export interface ProductWarranty {
	id: number;
	product_id: number;
	service_key: string;
	service_value: string;
	created_at: string;
	updated_at: string;
}

export interface Pagination {
	current_page: number;
	first_page_url: string;
	last_page: number;
	last_page_url: string;
	next_page_url: any;
	path: string;
	per_page: number;
	prev_page_url: any;
	total: number;
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
