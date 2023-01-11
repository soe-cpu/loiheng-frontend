import {
  Box,
  Button,
  ButtonProps,
  colors,
  IconButton,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import Link from "next/link";
import { Session } from "next-auth";
import wishlistStore, { Product } from "@stores/wishlist.store";
import { signIn, useSession } from "next-auth/react";
import Router from "next/router";
import cartStore from "@stores/cart.store";
import { isInWishlist, ProductInterface } from "src/utils/isInWishlist";

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

const ProductCard = (props: ProductInterface) => {
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
        p: 1,
        position: "relative",
        borderRadius: "4px",
        "&:hover": {
          transition: "0.8s",
          border: `1px solid ${colors.blue[500]}`,
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "370px",
      }}
    >
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
              style={{
                objectFit: "contain",
              }}
              sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
            />
          </Box>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: 12,
              color: colors.grey[600],
              fontWeight: 500,
              py: "6px",
            }}
          >
            {props.data.category[0].name}
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: 12,
              fontWeight: 500,
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitLineClamp: { xs: 2, lg: 2 },
              lineClamp: { xs: 2, lg: 2 },
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
            }}
          >
            <Link href={`/product/${props.data.id}`} passHref legacyBehavior>
              <StyledLink>{props.data.name}</StyledLink>
            </Link>
          </Typography>
          {props.data.discount.length > 0 ? (
            <Typography
              sx={{
                textAlign: "center",
                fontSize: 14,
                color: colors.grey[700],
                py: "4px",
                fontWeight: 600,
              }}
            >
              <del
                style={{
                  fontSize: 12,
                  color: colors.grey[600],
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
                textAlign: "center",
                fontSize: 14,
                color: colors.grey[700],
                py: "4px",
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
        </StyledLink>
      </Link>
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
        {props.data.stock <= 0 ? (
          <Button
            size="small"
            disabled
            variant="contained"
            fullWidth
            sx={{ height: "30px" }}
          >
            Out Of Stock
          </Button>
        ) : (
          <Button
            size="small"
            variant="contained"
            color="inherit"
            fullWidth
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
      {props.data.discount.length > 0 ? (
        <Box
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            backgroundColor: colors.red[500],
            borderRadius: "4px",
            color: "#fff",
            padding: "2px 6px",
          }}
        >
          <Typography>- {props.data.discount[0].percent} %</Typography>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

// const ProductImage = styled("img")(({ theme }) => ({
//   width: "100%",
//   objectFit: "cover",
//   transition: "transform 0.3s",
//   "&:hover": {
//     transform: " scale(1.1)",
//   },
// }));
// const AddtoCartButton = styled(Button)(({ theme }) => ({
//   color: theme.palette.getContrastText(colors.blue[500]),
//   backgroundColor: colors.blue[500],
//   "&:hover": {
//     backgroundColor: colors.blue[700],
//   },
// }));

const FavButton = styled(IconButton)<ButtonProps>(({ theme }) => ({
  color: colors.blue[500],
  borderRadius: "5px",
  height: "30px",
  border: `1px solid ${colors.blue[500]}`,
  transition: "0.3s",
  // "&:hover": {
  // 	color: "#fff",
  // 	backgroundColor: colors.blue[500],
  // },
}));

const StyledLink = styled("a")(({ theme }) => ({
  cursor: "pointer",
  textDecoration: "none",
  color: "black",
}));

export default ProductCard;
