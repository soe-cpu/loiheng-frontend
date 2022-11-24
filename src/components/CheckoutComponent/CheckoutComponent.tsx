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
} from "@mui/material";
import Link from "next/link";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";

const CheckoutComponent = () => {
  const [addressType, setAddressType] = React.useState("");

  const handleChangeAddress = (event: SelectChangeEvent) => {
    setAddressType(event.target.value as string);
  };
  const [country, setCountry] = React.useState("");

  const handleChangeCountry = (event: SelectChangeEvent) => {
    setCountry(event.target.value as string);
  };
  const router = useRouter();
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
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography
              sx={{ color: colors.blue[500], fontWeight: 500, pb: 2 }}
            >
              Shopping Information
            </Typography>
            <Box sx={{ border: `1px solid ${colors.grey[300]}`, p: 2 }}>
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
                      onChange={handleChangeAddress}
                    >
                      <MenuItem value={10}>Work</MenuItem>
                      <MenuItem value={20}>Home</MenuItem>
                      <MenuItem value={30}>Address 1</MenuItem>
                      <MenuItem value={30}>Address 2</MenuItem>
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
              >
                Continue
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
              <Grid item xs={4}>
                <Box
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
                  <img src="/bank.gif" alt="" width={"80px"} height={"80px"} />
                  <Typography sx={{ color: colors.blue[500] }}>
                    Bank Account
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box
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
                  <img
                    src="/pickup.gif"
                    alt=""
                    width={"80px"}
                    height={"80px"}
                  />
                  <Typography sx={{ color: colors.blue[500] }}>
                    Pickup By Myself
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box
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
                  <img src="/cod.gif" alt="" width={"80px"} height={"80px"} />
                  <Typography sx={{ color: colors.blue[500] }}>
                    Cash On Delivery(COD)
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box
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
                  <img src="/2c2p.png" alt="" width={"80px"} height={"80px"} />
                  <Typography sx={{ color: colors.blue[500] }}>2C2P</Typography>
                </Box>
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
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                        borderBottom: `1px solid ${colors.grey[300]}`,
                      },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      11
                    </TableCell>
                    <TableCell>ID 984980634</TableCell>
                    <TableCell>
                      Ubiquiti UniFi Cloud Key Gen2 Plus (UCK-G2-PLUS)
                    </TableCell>
                    <TableCell>Ks 805,980</TableCell>
                    <TableCell>11</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Typography sx={{ py: 2, fontSize: 14 }}>Quantity: </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}
            >
              <Typography sx={{ fontSize: 14 }}>Subtotal: </Typography>
              <Typography sx={{ fontSize: 14 }}>3,269,370 Ks </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                py: 2,
                backgroundColor: colors.grey[100],
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: 14 }}>Standard Delivery: </Typography>
              <Typography sx={{ fontSize: 14 }}>3,269,370 Ks </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                py: 2,
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
                Total:{" "}
              </Typography>
              <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
                3,269,370 Ks{" "}
              </Typography>
            </Box>
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
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CheckoutComponent;
