import useAllFeatureProduct from "@apis/useAllFeatureProduct";
import { GetProductListResponse } from "@atoms/productListAtom";
import ProductCard from "@common/ProductCard";
import {
  Box,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";

const FeaturedProductComponent = () => {
  const { data, error, isValidating } = useAllFeatureProduct();

  const [featured, setFeatured] =
    React.useState<GetProductListResponse["data"]>();

  React.useEffect(() => {
    if (data) {
      setFeatured(data.data);
    }
  }, [data, setFeatured]);

  return (
    <Box sx={{ py: 2 }}>
      <Container maxWidth={"lg"}>
        <Typography variant="h6">Featured Products</Typography>
        <Typography variant="body2">
          Show all ({featured?.products.length}) results.
        </Typography>

        <Grid container spacing={2} sx={{ py: 2 }}>
          {featured?.products.map((product, index) => {
            return (
              <Grid item xs={12} md={3} key={index}>
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.cover_img}
                  category={product.category[0].name}
                  data={product}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturedProductComponent;
