import useAllNewArrivalProduct from "@apis/useAllNewArrivalProduct";
import { GetProductListResponse } from "@atoms/productListAtom";
import ProductCard from "@common/ProductCard";
import { Box, Container, Grid, Typography, useTheme } from "@mui/material";
import { ProductByCategory } from "pages/categories/[id]";
import React from "react";
import Image from "next/image";

const myLoaderGif = ({ src, width, quality }: any) => {
  return `${src}?q=${quality || 75}`;
};
const ProductByCategoryComponent = (props: ProductByCategory) => {
  const { products } = props.data;

  const theme = useTheme();
  return (
    <Box sx={{ py: 2 }}>
      <Container maxWidth={"lg"}>
        <Typography variant="h6">
          Product of{" "}
          {props.data.products[0]
            ? props.data.products[0]?.category[0].name
            : ""}
        </Typography>
        <Typography variant="body2">
          Show all ({props.data.products.length}) results.
        </Typography>

        <Grid container spacing={1} sx={{ py: 2 }} columns={15}>
          {products.length > 0 ? (
            products.map((product, index) => {
              return (
                <Grid item xs={15} md={3} key={index}>
                  <ProductCard data={product} />
                </Grid>
              );
            })
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "400px",
                  height: "400px",
                }}
              >
                <Image
                  src={"/no-prod.gif"}
                  alt="Shipping Gif"
                  loader={myLoaderGif}
                  fill
                  sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                />
              </Box>
              <Typography>No product found!</Typography>
            </Box>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductByCategoryComponent;
