import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Typography,
  colors,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  useTheme,
  Divider,
  styled,
} from "@mui/material";
import Link from "next/link";
import React, { useRef, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import Image from "next/image";
import cartStore from "@stores/cart.store";
import addressStore, { Address } from "@stores/addressStore";
import orderStore from "@stores/order.store";
import { Session } from "next-auth";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";

const myLoader = ({ src, width, quality }: any) => {
  return `${src}?q=${quality || 75}`;
};

const CheckoutComponent = () => {
  const router = useRouter();
  const theme = useTheme();

  const cartData = cartStore((store) => store.cart);
  const [address, setAddress] = React.useState("0");
  const [country, setCountry] = React.useState("");
  const [addressType, setAddressType] = React.useState("");
  const [showAddress, setShowAddress] = React.useState<Address>();

  const handleChangeAddressType = (event: SelectChangeEvent) => {
    setAddressType(event.target.value as string);
  };
  const handleChangeAddress = (event: SelectChangeEvent) => {
    setAddress(event.target.value as string);
  };
  const handleChangeCountry = (event: SelectChangeEvent) => {
    setCountry(event.target.value as string);
  };

  const [payment, setPayment] = useState("");
  console.log(payment);

  const { data: session } = useSession();
  // Api get Address start //
  const fullNameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const townshipRef = useRef<HTMLInputElement>(null);
  const regionRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const addressData = addressStore((store) => store.address);
  const order = orderStore((store) => store.createOrder);
  const isSaving = addressStore((store) => store.isSaving);

  const createOrder = () => {
    const address_id = Number(address);
    const full_name = fullNameRef.current?.value;
    const street_address = addressRef.current?.value;
    const city = cityRef.current?.value;
    const township = townshipRef.current?.value;
    const region = regionRef.current?.value;
    const phone = phoneRef.current?.value;
    const address_type = Number(addressType);
    const coupon_code = "";
    const coupon_price = "";
    if (session && cartData) {
      const res = order(
        session,
        address_id,
        full_name,
        phone,
        city,
        township,
        region,
        address_type,
        street_address,
        cartData.id,
        payment,
        coupon_code,
        coupon_price,
        cartData.subtotal
      ).then((res) => {
        if (res) {
          toast.success("Order successfully!");
        }
      });
    } else {
      toast.error("Something went wrong!");
    }
  };

  React.useEffect(() => {
    if (address) {
      const addr = addressData?.find((data) => data.id == Number(address));
      setShowAddress(addr);
    }
  }, [address, addressData]);

  return (
    <Box>
      <Container maxWidth={"lg"}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ py: 2 }}>
          <Link href="/" legacyBehavior>
            <a style={{ textDecoration: "none" }}>Home</a>
          </Link>
          <Link href="/product" legacyBehavior>
            <a style={{ textDecoration: "none" }}>Product</a>
          </Link>
          <Typography color="text.primary">Product Detail</Typography>
          <Typography color="text.primary">Payment</Typography>
        </Breadcrumbs>
        <Grid container spacing={3} sx={{ pb: 2 }}>
          <Grid item xs={12} md={6}>
            <Typography
              sx={{ color: colors.blue[500], fontWeight: 500, pb: 2 }}
            >
              Shopping Information
            </Typography>
            <Box sx={{ pb: 2 }}>
              <label>Your Address</label>
              <FormControl fullWidth size="small" sx={{ mt: 2 }}>
                <InputLabel id="demo-simple-select-label-country">
                  Address
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label-country"
                  id="demo-simple-select-country"
                  value={address}
                  label="Address"
                  onChange={handleChangeAddress}
                >
                  <MenuItem value="0">Create New</MenuItem>
                  {addressData?.map((data, index) => {
                    return (
                      <MenuItem value={data.id} key={index}>
                        {data.full_name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>

            {showAddress ? (
              <Box sx={{ border: `1px solid ${colors.blue[300]}` }}>
                <Typography sx={{ p: 2, fontWeight: 500 }}>
                  {showAddress.full_name}
                </Typography>
                <Divider />
                <Box
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ fontWeight: 500 }}>
                    Name:{" "}
                    <span style={{ color: colors.grey[600] }}>
                      {showAddress.full_name}
                    </span>
                  </Typography>
                  <Typography sx={{ fontWeight: 500 }}>
                    Address Type:{" "}
                    <span style={{ color: colors.grey[600] }}>
                      {showAddress.address_type}
                    </span>
                  </Typography>
                  <Typography sx={{ fontWeight: 500 }}>
                    City:{" "}
                    <span style={{ color: colors.grey[600] }}>
                      {showAddress.city}
                    </span>
                  </Typography>
                  <Typography sx={{ fontWeight: 500 }}>
                    Township:{" "}
                    <span style={{ color: colors.grey[600] }}>
                      {showAddress.township}
                    </span>
                  </Typography>
                  <Typography sx={{ fontWeight: 500 }}>
                    Region:{" "}
                    <span style={{ color: colors.grey[600] }}>
                      {showAddress.region}
                    </span>
                  </Typography>
                  <Typography sx={{ fontWeight: 500 }}>
                    Phone No:{" "}
                    <span style={{ color: colors.grey[600] }}>
                      {showAddress.phone}
                    </span>
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Box sx={{ border: `1px solid ${colors.blue[300]}`, p: 2 }}>
                <Grid container spacing={4}>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="Full Name"
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="Email Address"
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="Phone Number"
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="Billing Address"
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="outlined-basic"
                      label="City"
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="outlined-basic"
                      label="Region"
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="demo-simple-select-label">
                        Address Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={addressType}
                        label="Age"
                        onChange={handleChangeAddressType}
                      >
                        <MenuItem value={1}>Home</MenuItem>
                        <MenuItem value={2}>Work</MenuItem>
                        <MenuItem value={3}>Address 1</MenuItem>
                        <MenuItem value={4}>Address 2</MenuItem>
                        <MenuItem value={5}>Address 3</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="demo-simple-select-label-country">
                        Country
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label-country"
                        id="demo-simple-select-country"
                        value={country}
                        label="Age"
                        onChange={handleChangeCountry}
                      >
                        <MenuItem value={10}>Myanmar</MenuItem>
                        <MenuItem value={20}>Singapore</MenuItem>
                        <MenuItem value={30}>Japan</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 2,
              }}
            >
              <Button variant="outlined" onClick={() => router.back()}>
                Back
              </Button>
              <Button
                sx={{
                  boxShadow: "0px",
                  backgroundColor: colors.blue[500],
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: colors.blue[700],
                  },
                }}
                onClick={createOrder}
                disabled={isSaving}
              >
                Order Now
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              sx={{ color: colors.blue[500], fontWeight: 500, pb: 2 }}
            >
              Choose a payment method
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} md={4}>
                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="banaccount"
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  <Box
                    className="radio_check"
                    sx={{
                      border: `1px solid ${colors.grey[300]}`,
                      py: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      flexDirection: "column",
                      borderRadius: "4px",
                      boxShadow: `1px 1px 5px ${colors.grey[100]}`,
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: "80px",
                        height: "80px",
                      }}
                    >
                      <Image
                        src={"/bank.gif"}
                        alt="Bank Gif"
                        loader={myLoader}
                        fill
                        sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                      />
                    </Box>
                    <Typography sx={{ color: colors.blue[500], fontSize: 14 }}>
                      Bank Account
                    </Typography>
                  </Box>
                </label>
              </Grid>
              <Grid item xs={6} md={4}>
                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="pickup"
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  <Box
                    className="radio_check"
                    sx={{
                      border: `1px solid ${colors.grey[300]}`,
                      py: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      flexDirection: "column",
                      borderRadius: "4px",
                      boxShadow: `1px 1px 1px ${colors.blue[100]}`,
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: "80px",
                        height: "80px",
                      }}
                    >
                      <Image
                        src={"/pickup.gif"}
                        alt="Pickup Gif"
                        loader={myLoader}
                        fill
                        sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                      />
                    </Box>
                    <Typography sx={{ color: colors.blue[500], fontSize: 14 }}>
                      Pickup By Myself
                    </Typography>
                  </Box>
                </label>
              </Grid>
              <Grid item xs={6} md={4}>
                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  <Box
                    className="radio_check"
                    sx={{
                      border: `1px solid ${colors.grey[300]}`,
                      py: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      flexDirection: "column",
                      borderRadius: "4px",
                      boxShadow: `1px 1px 1px ${colors.blue[100]}`,
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: "80px",
                        height: "80px",
                      }}
                    >
                      <Image
                        src={"/cod.gif"}
                        alt="Cod Gif"
                        loader={myLoader}
                        fill
                        sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                      />
                    </Box>
                    <Typography sx={{ color: colors.blue[500], fontSize: 14 }}>
                      Cash On Delivery(COD)
                    </Typography>
                  </Box>
                </label>
              </Grid>
              <Grid item xs={6} md={4}>
                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="2c2p"
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  <Box
                    className="radio_check"
                    sx={{
                      border: `1px solid ${colors.grey[300]}`,
                      py: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      flexDirection: "column",
                      borderRadius: "4px",
                      boxShadow: `1px 1px 1px ${colors.blue[100]}`,
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: "80px",
                        height: "80px",
                      }}
                    >
                      <Image
                        src={"/2c2p.png"}
                        alt="2c2p Gif"
                        loader={myLoader}
                        fill
                        sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                      />
                    </Box>
                    <Typography sx={{ color: colors.blue[500], fontSize: 14 }}>
                      2C2P
                    </Typography>
                  </Box>
                </label>
              </Grid>
            </Grid>
            <Typography
              sx={{ color: colors.blue[500], fontWeight: 500, py: 2 }}
            >
              Order Summary
            </Typography>
            <TableContainer>
              <Table aria-label="simple table">
                <TableBody>
                  {cartData?.cart_item.map((cart, index) => {
                    return (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                            borderBottom: `1px solid ${colors.grey[300]}`,
                          },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {(index = index + 1)}
                        </TableCell>
                        <TableCell>{cart.product[0].name}</TableCell>
                        <TableCell>
                          {new Intl.NumberFormat("mm-MM", {
                            style: "currency",
                            currency: "MMK",
                            currencyDisplay: "code",
                          }).format(
                            cart.product[0].discount.length > 0
                              ? cart.product[0].discount[0].promo_price
                              : cart.product[0].price
                          )}
                        </TableCell>
                        <TableCell>{cart.qty}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                py: 2,
                px: 1,
              }}
            >
              <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                Subtotal:{" "}
              </Typography>
              {cartData ? (
                <Typography sx={{ fontSize: 14 }}>
                  {new Intl.NumberFormat("mm-MM", {
                    style: "currency",
                    currency: "MMK",
                    currencyDisplay: "code",
                  }).format(cartData.subtotal)}
                </Typography>
              ) : (
                ""
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                py: 2,
                backgroundColor: colors.grey[100],
                alignItems: "center",
                px: 1,
              }}
            >
              <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                Standard Delivery:{" "}
              </Typography>
              <Typography sx={{ fontSize: 14 }}>0 Ks </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                py: 2,
                alignItems: "center",
                px: 1,
              }}
            >
              <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
                Total:{" "}
              </Typography>
              <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
                {cartData ? (
                  <Typography sx={{ fontSize: 14 }}>
                    {new Intl.NumberFormat("mm-MM", {
                      style: "currency",
                      currency: "MMK",
                      currencyDisplay: "code",
                    }).format(cartData.subtotal)}
                  </Typography>
                ) : (
                  ""
                )}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                color: colors.blue[500],
                marginTop: theme.spacing(3),
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
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CheckoutComponent;
