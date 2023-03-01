import { Check } from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Chip,
  colors,
  Divider,
  Grid,
  Paper,
  Stack,
  Step,
  StepConnector,
  stepConnectorClasses,
  StepIconProps,
  StepLabel,
  Stepper,
  styled,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import orderStore from "@stores/order.store";
import { useRouter } from "next/router";
import React, { useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { BsFillClockFill } from "react-icons/bs";
import { MdConfirmationNumber } from "react-icons/md";
import { FaTruck } from "react-icons/fa";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Image from "next/image";
import { Product } from "@interfaces/product.interface";
import { Cart } from "@stores/cart.store";
import { CartItem, Order } from "@interfaces/order.interface";
import Link from "next/link";
import { fontWeight } from "@mui/system";

const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
      color: "#784af4",
    }),
    "& .QontoStepIcon-completedIcon": {
      color: "#784af4",
      zIndex: 1,
      fontSize: 18,
    },
    "& .QontoStepIcon-circle": {
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
  })
);

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <BsFillClockFill />,
    2: <MdConfirmationNumber />,
    3: <FaTruck />,
    4: <IoIosCheckmarkCircleOutline />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2, height: "100%" }}>{children}</Box>}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const myLoader = ({ src, width, quality }: any) => {
  return `https://api.loiheng.duckdns.org${src}?q=${quality || 75}`;
};

const myGif = ({ src, width, quality }: any) => {
  return `${src}?q=${quality || 75}`;
};
const OrderDetailComponent = () => {
  const orders = orderStore((store) => store.orders);
  const [orderDetail, setOrderDetail] = useState<Order>();
  const [cartItem, setCartItem] = useState<CartItem[] | undefined>();
  const [orderStep, setOrderStep] = useState(0);
  const router = useRouter();
  const { id } = router.query;
  console.log(cartItem);
  React.useEffect(() => {
    if (id && orders) {
      const od = orders?.find((o) => Number(o.id) == Number(id));
      setOrderDetail(od);

      if (od) {
        switch (od.status) {
          case "pending":
            setOrderStep(0);
            break;
          case "confirm":
            setOrderStep(1);
            break;
          case "ontheway":
            setOrderStep(2);
            break;
          case "complete":
            setOrderStep(3);
            break;
          default:
            setOrderStep(0);
            break;
        }
        const cartItem = od.cart?.cart_item;
        setCartItem(cartItem);
      }
    }
  }, [id, setOrderDetail, orders]);

  const steps = ["Pending", "Confirm", "On The Way", "Complete"];

  const breadcrumbs = [
    <Link href={"/profile"} key="1" legacyBehavior>
      <a style={{ color: "#000", fontWeight: 500 }}>Profile</a>
    </Link>,
    <Link href={"/profile/my-orders"} key="2" legacyBehavior>
      <a style={{ color: "#000", fontWeight: 500 }}>My Order</a>
    </Link>,
    <Typography key="3" sx={{ color: colors.grey[600] }}>
      Order Detail
    </Typography>,
  ];

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Stack direction={"row"} alignItems={"center"} spacing={1} sx={{ p: 2 }}>
        <ShoppingCartOutlinedIcon />
        <Typography variant="h6">
          My Orders{" "}
          <span style={{ color: colors.blue[500] }}>
            ({orderDetail?.order_no})
          </span>
        </Typography>
      </Stack>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
      </Box>
      <Divider />

      <Box sx={{ width: "100%" }}>
        {/* <Typography variant="h6" sx={{ p: 2 }}>
          Order Detail
        </Typography> */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", px: 2 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Overview" {...a11yProps(0)} />
            <Tab label="Product" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Stack sx={{ width: "100%", py: 2 }} spacing={4}>
            <Stepper
              alternativeLabel
              activeStep={orderStep}
              connector={<ColorlibConnector />}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Stack>
          <Divider />
          <Typography variant="h6" sx={{ pt: 2 }}>
            Detail
          </Typography>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Order Code</TableCell>
                  <TableCell>Payment Method</TableCell>
                  <TableCell>Total Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Typography variant="subtitle2">
                      {orderDetail?.order_no}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={orderDetail?.payment_method}
                      sx={{
                        textTransform: "capitalize",
                        backgroundColor: colors.green[200],
                        fontWeight: 700,
                      }}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <span style={{ color: colors.red[500], fontWeight: 700 }}>
                      {new Intl.NumberFormat("mm-MM", {
                        style: "currency",
                        currency: "MMK",
                        currencyDisplay: "code",
                      }).format(Number(orderDetail?.total_price))}
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Divider />
          <Box>
            <Typography variant="h6" sx={{ py: 2 }}>
              Shipping Address
            </Typography>
            <Box
              sx={{
                border: `1px solid ${colors.blue[500]}`,
                p: 2,
                borderRadius: "4px",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Image
                      src={"/address.gif"}
                      width={200}
                      height={200}
                      alt="Address"
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6">
                    {orderDetail?.address.full_name} (
                    {orderDetail?.address.phone})
                  </Typography>
                  <Stack sx={{ pt: 2 }} spacing={1}>
                    <Typography variant="subtitle2">
                      Address Type:{" "}
                      <span style={{ color: colors.grey[600] }}>
                        {Number(orderDetail?.address.address_type) == 1
                          ? "Home"
                          : Number(orderDetail?.address.address_type) == 2
                          ? "Work"
                          : Number(orderDetail?.address.address_type) == 3
                          ? "Address One"
                          : Number(orderDetail?.address.address_type) == 4
                          ? "Address Two"
                          : "Address Three"}
                      </span>
                    </Typography>
                    <Typography variant="subtitle2">
                      Region:{" "}
                      <span style={{ color: colors.grey[600] }}>
                        {orderDetail?.address.region}
                      </span>
                    </Typography>
                    <Typography variant="subtitle2">
                      City:{" "}
                      <span style={{ color: colors.grey[600] }}>
                        {orderDetail?.address.city}
                      </span>
                    </Typography>
                    <Typography variant="subtitle2">
                      Township:{" "}
                      <span style={{ color: colors.grey[600] }}>
                        {orderDetail?.address.township}
                      </span>
                    </Typography>
                    <Typography variant="subtitle2">
                      Street Address:{" "}
                      <span style={{ color: colors.grey[600] }}>
                        {orderDetail?.address.street_address}
                      </span>
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Preview</TableCell>
                    <TableCell>SKU</TableCell>
                    <TableCell>Qty</TableCell>
                    <TableCell>Discount</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItem?.map((p) => (
                    <TableRow
                      key={p.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Image
                          src={p.product[0].cover_img}
                          alt={"ProductImage"}
                          loader={myLoader}
                          width={70}
                          height={70}
                          style={{
                            objectFit: "cover",
                            border: `1px solid ${colors.grey[300]}`,
                            borderRadius: "4px",
                          }}
                          sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Link
                          href={`/product/${p.product[0].id}`}
                          legacyBehavior
                        >
                          <a>{p.product[0].sku}</a>
                        </Link>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography>{p.qty}</Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography color={"error"}>
                          {p.product[0].discount[0]?.percent
                            ? p.product[0].discount[0]?.percent
                            : 0}{" "}
                          %
                        </Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography>
                          {new Intl.NumberFormat("mm-MM", {
                            style: "currency",
                            currency: "MMK",
                            currencyDisplay: "code",
                          }).format(Number(p.product[0].price))}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell colSpan={4} align="right">
                      <Typography variant="subtitle2">Subtotal:</Typography>
                    </TableCell>
                    <TableCell>
                      {new Intl.NumberFormat("mm-MM", {
                        style: "currency",
                        currency: "MMK",
                        currencyDisplay: "code",
                      }).format(Number(orderDetail?.cart.subtotal))}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell colSpan={4} align="right">
                      <Typography variant="subtitle2">Delivery Fee:</Typography>
                    </TableCell>
                    <TableCell>
                      {new Intl.NumberFormat("mm-MM", {
                        style: "currency",
                        currency: "MMK",
                        currencyDisplay: "code",
                      }).format(Number(orderDetail?.delivery_fee))}
                    </TableCell>
                  </TableRow>
                  {orderDetail?.coupon_price ? (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell colSpan={4} align="right">
                        <Typography variant="subtitle2">
                          Delivery Fee:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {new Intl.NumberFormat("mm-MM", {
                          style: "currency",
                          currency: "MMK",
                          currencyDisplay: "code",
                        }).format(Number(orderDetail?.coupon_price))}
                      </TableCell>
                    </TableRow>
                  ) : (
                    ""
                  )}
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell colSpan={4} align="right">
                      <Typography variant="subtitle2">Total:</Typography>
                    </TableCell>
                    <TableCell>
                      {new Intl.NumberFormat("mm-MM", {
                        style: "currency",
                        currency: "MMK",
                        currencyDisplay: "code",
                      }).format(Number(orderDetail?.total_price))}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </TabPanel>
      </Box>
    </Box>
  );
};

export default OrderDetailComponent;
