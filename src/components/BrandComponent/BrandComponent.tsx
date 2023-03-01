import useAllBrand from "@apis/useAllBrand";
import { GetBrandResponse } from "@atoms/brandListAtom";
import ProductCard from "@common/ProductCard";
import {
  Box,
  colors,
  Container,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const myLoader = ({ src, width, quality }: any) => {
  return `https://api.loiheng.duckdns.org${src}?q=${quality || 75}`;
};

const BrandComponent = () => {
  const { data, error, isValidating } = useAllBrand();

  const [brand, setBrand] = React.useState<GetBrandResponse["data"]>();

  React.useEffect(() => {
    if (data) {
      setBrand(data.data);
    }
  }, [data, setBrand]);
  return (
    <Box sx={{ py: 2 }}>
      <Container maxWidth={"lg"}>
        <Typography variant="h6">Brands</Typography>
        <Typography variant="body2">
          Show all ({brand?.brands.length}) results.
        </Typography>

        <Grid container spacing={2} sx={{ py: 2 }} columns={15}>
          {brand?.brands.map((brand, index) => {
            return (
              <Grid item xs={7} md={3} key={index}>
                <Box
                  sx={{
                    width: "100%",
                    height: "120px",
                    position: "relative",
                    border: `1px solid ${colors.grey[300]}`,
                    "&:hover": {
                      boxShadow: 1,
                      transition: "0.5s",
                      transitionTimingFunction: "ease-in-out",
                    },
                  }}
                >
                  {!brand.picture ? (
                    <Skeleton
                      variant="rectangular"
                      animation={"wave"}
                      width={"100%"}
                      height={"400px"}
                    />
                  ) : (
                    <Link href={`/product?brands=${brand.id}`}>
                      <Image
                        loader={myLoader}
                        src={brand.picture}
                        alt="Brand Image"
                        fill
                        style={{ objectFit: "contain", padding: "4px" }}
                        sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                      />
                    </Link>
                  )}
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default BrandComponent;
