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
import React, { useRef, useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Link from "next/link";
import Image from "next/image";
import cartStore from "@stores/cart.store";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { CartItemComponent } from "./CartItem";
import couponStore from "@stores/coupon.store";
import { Coupon } from "@interfaces/coupon.interface";
import Swal from "sweetalert2";

const myLoaderGif = ({ src, width, quality }: any) => {
  return `${src}?q=${quality || 75}`;
};

const AddToCartComponent = () => {
  const [coupon, setCoupon] = useState<Coupon>();
  const cartData = cartStore((store) => store.cart);
  const removeCartItem = cartStore((store) => store.removeFromCart);

  const applyCoupon = couponStore((store) => store.checkCoupon);

  const { data: session } = useSession();
  const couponCode = useRef<HTMLInputElement>(null);

  // Apply coupon
  const applyCouponCode = () => {
    const code = couponCode.current?.value;

    if (session) {
      const res = applyCoupon(session, code);
      res.then((d) => {
        if (d.success) {
          toast.success(d.message);
          setCoupon(d.data);
        } else {
          if (code == "") {
            return Swal.fire("Opps!", "Coupon code is empty.", "warning");
          } else {
            toast.error(d.message);
          }
        }
      });
    }
  };

  console.log(coupon);

  const removeItem = (cart_item_id: number) => {
    if (session) {
      const res = removeCartItem(session, cart_item_id);
      res.then((d) => {
        d.success ? toast.success(d.message) : toast.error(d.message);
      });
    }
  };

  // console.log(subtotal);

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
              <Box>
                <Link href={"/product"} legacyBehavior>
                  <a
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <Button
                      startIcon={<ShoppingCartCheckoutIcon />}
                      variant="contained"
                      size="small"
                      sx={{
                        boxShadow: 0,
                        "&:hover": {
                          boxShadow: 0,
                        },
                      }}
                    >
                      Go to Shopping
                    </Button>
                  </a>
                </Link>
              </Box>
            </Stack>
          )}
        </Box>
        {cartData ? (
          <Grid container sx={{ mt: 4 }} spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", gap: 4 }}>
                <Typography variant="h6">Promocode:</Typography>
                <InputBase
                  sx={{
                    border: `1px solid ${colors.blue[300]}`,
                    px: 2,
                    backgroundColor: colors.grey[100],
                  }}
                  fullWidth
                  inputRef={couponCode}
                ></InputBase>
                <Button
                  variant="contained"
                  disabled={coupon ? true : false}
                  size="small"
                  sx={{
                    boxShadow: 0,
                    backgroundColor: colors.blue[500],
                    color: "#fff",
                    "&:hover": {
                      boxShadow: 0,
                      backgroundColor: colors.blue[700],
                    },
                  }}
                  onClick={applyCouponCode}
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
                    ""
                  )}

                  <Typography>
                    {coupon ? (
                      coupon.type == "amount" ? (
                        <Typography>
                          {new Intl.NumberFormat("mm-MM", {
                            style: "currency",
                            currency: "MMK",
                            currencyDisplay: "code",
                          }).format(coupon.value)}
                        </Typography>
                      ) : (
                        <Typography>{coupon.value} %</Typography>
                      )
                    ) : (
                      0
                    )}
                  </Typography>
                  {cartData ? (
                    coupon ? (
                      coupon.type == "amount" ? (
                        <Typography>
                          {new Intl.NumberFormat("mm-MM", {
                            style: "currency",
                            currency: "MMK",
                            currencyDisplay: "code",
                          }).format(cartData.subtotal - coupon.value)}
                        </Typography>
                      ) : (
                        <Typography>
                          {new Intl.NumberFormat("mm-MM", {
                            style: "currency",
                            currency: "MMK",
                            currencyDisplay: "code",
                          }).format(
                            cartData.subtotal -
                              (coupon.value / 100) * cartData.subtotal
                          )}
                        </Typography>
                      )
                    ) : (
                      <Typography>
                        {new Intl.NumberFormat("mm-MM", {
                          style: "currency",
                          currency: "MMK",
                          currencyDisplay: "code",
                        }).format(cartData.subtotal)}
                      </Typography>
                    )
                  ) : (
                    ""
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
                  <Link
                    href={`/checkout${
                      coupon
                        ? "?coupon_code=" +
                          coupon.code +
                          "&coupon_type=" +
                          coupon.type +
                          "&coupon_value=" +
                          coupon.value
                        : ""
                    }`}
                    legacyBehavior
                  >
                    <a style={{ textDecoration: "none" }}>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<ShoppingCartCheckoutIcon />}
                        sx={{
                          boxShadow: 0,
                          backgroundColor: colors.blue[500],
                          color: "#fff",
                          "&:hover": {
                            boxShadow: 0,
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
        ) : (
          ""
        )}

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
