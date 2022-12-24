import {
  Box,
  Button,
  colors,
  Container,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import Image from "next/image";
import cartStore from "@stores/cart.store";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { CartItemComponent } from "./CartItem";

const myLoaderGif = ({ src, width, quality }: any) => {
  return `${src}?q=${quality || 75}`;
};

const AddToCartComponent = () => {
  const [subtotal, setSubtotal] = useState<number>();
  const cartData = cartStore((store) => store.cart);
  const removeCartItem = cartStore((store) => store.removeFromCart);

  const { data: session } = useSession();

  const removeItem = (cart_item_id: number) => {
    if (session) {
      const res = removeCartItem(session, cart_item_id);
      res.then((d) => {
        d.success ? toast.success(d.message) : toast.error(d.message);
      });
    }
  };

  console.log(subtotal);

  return (
    <Box sx={{ py: 2 }}>
      <Container>
        <Box sx={{ border: `1px solid ${colors.grey[300]}` }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
            <Typography sx={{ fontWeight: 500 }}>Shopping Cart</Typography>
            <Typography>{cartData?.cart_item?.length} items</Typography>
          </Box>
          <Divider />
          {cartData && (
            <Box>
              {cartData.cart_item?.map((cart_item, index) => {
                return <CartItemComponent key={cart_item.id} {...cart_item} />;
              })}
            </Box>
          )}
          {cartData?.cart_item?.length ? (
            ""
          ) : (
            <Stack
              justifyContent={"center"}
              alignItems={"center"}
              spacing={4}
              sx={{ p: 6 }}
            >
              <Box
                sx={{ position: "relative", width: "300px", height: "300px" }}
              >
                <Image
                  src={"/cart.gif"}
                  alt="Cart Gif"
                  loader={myLoaderGif}
                  fill
                  sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                />
              </Box>
              <Typography variant="h5">
                <span style={{ color: colors.blue[500] }}>Expre More</span> -
                with - <span style={{ color: colors.red[500] }}>LOI HENG</span>
              </Typography>
            </Stack>
          )}
        </Box>
        <Grid container sx={{ mt: 4 }} spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", gap: 4 }}>
              <Typography variant="h6">Promocode:</Typography>
              <InputBase
                sx={{ border: `1px solid ${colors.grey[300]}` }}
                fullWidth
              ></InputBase>
              <Button
                sx={{
                  boxShadow: "0px",
                  backgroundColor: colors.blue[500],
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: colors.blue[700],
                  },
                }}
              >
                Apply
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography sx={{ fontWeight: 500 }}>Sub Total:</Typography>
                <Typography sx={{ fontWeight: 500 }}>
                  Promocode discount:
                </Typography>
                <Typography sx={{ fontWeight: 500 }}>Total:</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "end",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                {cartData ? (
                  <Typography>
                    {new Intl.NumberFormat("mm-MM", {
                      style: "currency",
                      currency: "MMK",
                      currencyDisplay: "code",
                    }).format(cartData.subtotal)}
                  </Typography>
                ) : (
                  <Typography></Typography>
                )}

                <Typography>0 MMK</Typography>
                {cartData ? (
                  <Typography>
                    {new Intl.NumberFormat("mm-MM", {
                      style: "currency",
                      currency: "MMK",
                      currencyDisplay: "code",
                    }).format(cartData.subtotal)}
                  </Typography>
                ) : (
                  <Typography></Typography>
                )}
              </Box>
            </Box>
            <Divider />
            <Box
              sx={{ py: 2, display: "flex", justifyContent: "space-between" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  color: colors.blue[500],
                }}
              >
                <ArrowBackIcon />
                <Link href={"/product"} legacyBehavior>
                  <a
                    style={{
                      textDecoration: "none",
                      fontWeight: 500,
                      color: colors.blue[500],
                    }}
                  >
                    Continue Shopping
                  </a>
                </Link>
              </Box>
              <Box>
                <Link href={"/checkout"} legacyBehavior>
                  <a style={{ textDecoration: "none" }}>
                    <Button
                      sx={{
                        boxShadow: "0px",
                        backgroundColor: colors.blue[500],
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: colors.blue[700],
                        },
                      }}
                      fullWidth
                    >
                      Checkout
                    </Button>
                  </a>
                </Link>
              </Box>
            </Box>
            <Divider />
          </Grid>
        </Grid>
        <Box
          sx={{
            border: `1px solid ${colors.blue[500]}`,
            px: 2,
            py: 4,
            borderRadius: "6px",
            mt: 4,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={3}>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  borderRight: `1px solid ${colors.grey[300]}`,
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "70px",
                    height: "70px",
                  }}
                >
                  <Image
                    src={"/cart.gif"}
                    alt="Cart Gif"
                    loader={myLoaderGif}
                    fill
                    sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                  />
                </Box>
                <Box>
                  <Typography variant="h6">Add to Cart</Typography>
                  <Typography variant="caption">Add your products.</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  borderRight: `1px solid ${colors.grey[300]}`,
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "70px",
                    height: "70px",
                  }}
                >
                  <Image
                    src={"/payment.gif"}
                    alt="Payment Gif"
                    loader={myLoaderGif}
                    fill
                    sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                  />
                </Box>
                <Box>
                  <Typography variant="h6">Payment</Typography>
                  <Typography variant="caption">
                    Pay for many method.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  borderRight: `1px solid ${colors.grey[300]}`,
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "70px",
                    height: "70px",
                  }}
                >
                  <Image
                    src={"/shipping.gif"}
                    alt="Shipping Gif"
                    loader={myLoaderGif}
                    fill
                    sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                  />
                </Box>
                <Box>
                  <Typography variant="h6">Shipping</Typography>
                  <Typography variant="caption">
                    Order from anywhere.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  borderRight: `1px solid ${colors.grey[300]}`,
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "70px",
                    height: "70px",
                  }}
                >
                  <Image
                    src={"/service.gif"}
                    alt="Service Gif"
                    loader={myLoaderGif}
                    fill
                    sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                  />
                </Box>
                <Box>
                  <Typography variant="h6">Service</Typography>
                  <Typography variant="caption">24 hr service.</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default AddToCartComponent;
