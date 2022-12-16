import { MyOrderComponent } from "@components/ProfileComponent";
import ProfileLayout from "@layouts/ProfileLayout";
import { Box } from "@mui/material";
import axios from "axios";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth/next";
import Head from "next/head";
import { authOptions, Me } from "pages/api/auth/[...nextauth]";
import { ReactElement } from "react";

const MyOrders = () => {
	return (
		<Box>
			<Head>
				<title>Loi Heng | Profile</title>
				<meta name="description" content="Loi Heng Profile" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<MyOrderComponent />
		</Box>
	);
};

MyOrders.getLayout = function getLayout(page: ReactElement) {
	return <ProfileLayout>{page}</ProfileLayout>;
};

export default MyOrders;
