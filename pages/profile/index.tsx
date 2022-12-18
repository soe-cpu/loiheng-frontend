import { ProfileComponent } from "@components/ProfileComponent";
import ProfileLayout from "@layouts/ProfileLayout";
import { Box, Container, Typography } from "@mui/material";
import axios from "axios";
import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { unstable_getServerSession } from "next-auth/next";
import Head from "next/head";
import { authOptions, Me } from "pages/api/auth/[...nextauth]";
import { ReactElement } from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await unstable_getServerSession(
		context.req,
		context.res,
		authOptions
	);

	if (!session) {
		return {
			redirect: {
				destination: "/auth/login?callbackUrl=" + context.req.url,
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

interface ProfileProps {
	data: Me;
	test: string;
}

export default function ProfilePage(props: ProfileProps) {
	const { data } = props;
	return (
		<Box>
			<Head>
				<title>Loi Heng | Profile</title>
				<meta name="description" content="Loi Heng Profile" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<ProfileComponent me={data} />
		</Box>
	);
}

ProfilePage.getLayout = function getLayout(page: ReactElement) {
	return <ProfileLayout>{page}</ProfileLayout>;
};
