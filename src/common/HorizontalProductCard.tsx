import {
  Box,
  colors,
  Typography,
  Chip,
  Grid,
  useMediaQuery,
  useTheme,
  Button,
  ButtonProps,
  IconButton,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import { isInWishlist, ProductInterface } from "src/utils/isInWishlist";
import Image from "next/image";
import Link from "next/link";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import wishlistStore, { Product } from "@stores/wishlist.store";
import cartStore from "@stores/cart.store";
import { Session } from "next-auth";
import { signIn, useSession } from "next-auth/react";

const myLoader = ({ src, width, quality }: any) => {
  return `https://api.loiheng.duckdns.org${src}?q=${quality || 75}`;
};
const addToWishlist = (session: Session | null, product?: Product) => {
  if (session) {
    const { getState } = wishlistStore;
    const wishlists = getState().wishlists;
    const addWishlist = getState().addWishlist;
    const removeWishlist = getState().removeWishlist;
    if (product)
      if (wishlists?.find((p) => p.id === product.id)) {
        removeWishlist(session, product);
      } else {
        addWishlist(session, product);
      }
  } else {
    signIn();
  }
};

const HorizontalProductCard = (props: ProductInterface) => {
  const { data } = useSession();

  const wishlists = wishlistStore((store) => store.wishlists);

  const check = isInWishlist(props.data, wishlists);

  const addCart = cartStore((store) => store.addToCart);
  const addToCartClick = (session: Session | null, product_id: number) => {
    if (session) {
      const data = props.data;
      if (session && data) addCart(session, data.id, null);
    } else {
      signIn();
    }
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      sx={{
        border: `1px solid ${colors.grey[300]}`,
        borderRadius: "4px",
        p: 2,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Link href={`/product/${props.data.id}`} legacyBehavior>
            <StyledLink>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: isMobile ? "250px" : "200px",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Image
                  src={props.data.cover_img}
                  alt={"ProductImage"}
                  fill
                  loader={myLoader}
                  sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                />
              </Box>
            </StyledLink>
          </Link>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <Box>
                  <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                    {props.data.name}
                  </Typography>
                </Box>
                <Box>
                  <Box
                    sx={{
                      backgroundColor: colors.red[500],
                      color: "#fff",
                      textAlign: "center",
                      width: "60px",
                      borderRadius: "4px",
                    }}
                  >
                    {props.data.discount.length > 0 ? (
                      <Typography>
                        - {props.data.discount[0].percent} %
                      </Typography>
                    ) : (
                      ""
                    )}
                  </Box>
                </Box>
              </Box>
              <Chip
                label={props.data.category[0].name}
                size={"small"}
                sx={{ backgroundColor: colors.grey[400], fontWeight: 500 }}
              />
              <Box sx={{ py: 2 }}>
                {props.data.discount.length > 0 ? (
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: colors.grey[700],
                      py: 1,
                      fontWeight: 600,
                    }}
                  >
                    <del
                      style={{
                        fontSize: 12,
                        color: colors.red[500],
                        fontWeight: 400,
                      }}
                    >
                      {new Intl.NumberFormat("mm-MM", {
                        style: "currency",
                        currency: "MMK",
                        currencyDisplay: "code",
                      }).format(props.data.price)}
                    </del>
                    <br />
                    <span>
                      {new Intl.NumberFormat("mm-MM", {
                        style: "currency",
                        currency: "MMK",
                        currencyDisplay: "code",
                      }).format(props.data.discount[0].promo_price)}
                    </span>
                  </Typography>
                ) : (
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: colors.grey[700],
                      py: 1,
                      fontWeight: 500,
                    }}
                  >
                    <span>
                      {new Intl.NumberFormat("mm-MM", {
                        style: "currency",
                        currency: "MMK",
                        currencyDisplay: "code",
                      }).format(props.data.price)}
                    </span>
                  </Typography>
                )}
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              {props.data.stock <= 0 ? (
                <Button
                  size="small"
                  disabled
                  variant="contained"
                  sx={{ height: "30px" }}
                >
                  Out Of Stock
                </Button>
              ) : (
                <Button
                  size="small"
                  variant="contained"
                  color="inherit"
                  sx={{
                    boxShadow: 0,
                    backgroundColor: colors.blue[500],
                    color: "#fff",
                    height: "30px",
                    "&:hover": {
                      boxShadow: 0,
                      backgroundColor: colors.blue[700],
                    },
                  }}
                  onClick={() => {
                    if (props.data) {
                      addToCartClick(data, props.data.id);
                    }
                  }}
                >
                  Add to Cart
                </Button>
              )}

              <FavButton
                size={"small"}
                onClick={() => {
                  if (props.data) {
                    addToWishlist(data, props.data);
                  }
                }}
              >
                {check ? (
                  <FavoriteSharpIcon sx={{ color: colors.pink[500] }} />
                ) : (
                  <FavoriteBorderOutlinedIcon />
                )}
              </FavButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const AddtoCartButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(colors.blue[500]),
  backgroundColor: colors.blue[500],
  padding: "0px 10px",
  "&:hover": {
    backgroundColor: colors.blue[700],
  },
  borderRadius: "5px",
}));

const FavButton = styled(IconButton)<ButtonProps>(({ theme }) => ({
  color: colors.blue[500],
  height: "30px",
  borderRadius: "5px",
  border: `1px solid ${colors.blue[500]}`,
  transition: "0.3s",
  // "&:hover": {
  // 	color: "#fff",
  // 	backgroundColor: colors.blue[500],
  // },
}));

const StyledLink = styled("a")(({ theme }) => ({
  cursor: "pointer",
}));

export default HorizontalProductCard;
