import MainLayout from "@layouts/MainLayout";
import { Box, Container, Typography } from "@mui/material";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { ReactElement } from "react";
import axios from "axios";
import { SettingResponse } from "@atoms/settingResponse";

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

const AboutUs = (props: { content: string }) => {
	return (
		<Box>
			<Head>
				<title>Loi Heng | About Us</title>
				<meta name="description" content="Loi Heng About Us" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Box sx={{ py: 2 }}>
				<Container>
					<Typography variant="h5">About Us</Typography>
					<div dangerouslySetInnerHTML={{ __html: props.content }}></div>
				</Container>
			</Box>
		</Box>
	);
};

AboutUs.getLayout = function getLayout(page: ReactElement) {
	return <MainLayout>{page}</MainLayout>;
};

export default AboutUs;
