import MainLayout from "@layouts/MainLayout";
import { Box, Container, Grid, Typography } from "@mui/material";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { ReactElement } from "react";
import axios from "axios";
import wishlistStore from "@stores/wishlist.store";
import ProductCard from "@common/ProductCard";
import { authOptions, Me } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import Router from "next/router";
import { signIn } from "next-auth/react";

// export const getServerSideProps: GetServerSideProps = async (context) => {
// 	const session = await unstable_getServerSession(
// 		context.req,
// 		context.res,
// 		authOptions
// 	);

// 	if (!session) {
// 		signIn();
// 		return {
// 			redirect: {
// 				destination: "/auth/login?callbackUrl=" + context.req.url,
// 				permanent: false,
// 			},
// 		};
// 	}

// 	const data = (await axios
// 		.get(`${process.env.API_URL}auth/me`, {
// 			headers: {
// 				Authorization: `${session.token}`,
// 			},
// 		})
// 		.then((res) => res.data)) as Me;

// 	return {
// 		props: { data },
// 	};
// };

const WishlistPage = () => {
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
          <Grid container spacing={1} paddingY={2} columns={15}>
            {wishlists?.map((product) => {
              return (
                <Grid item key={product.id} xs={15} lg={3} md={3} sm={6}>
                  <ProductCard data={product} />
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
