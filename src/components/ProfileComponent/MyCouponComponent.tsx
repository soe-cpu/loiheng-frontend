import {
  Box,
  colors,
  Divider,
  Grid,
  Stack,
  styled,
  Tab,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import React from "react";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import couponStore from "@stores/coupon.store";
import moment from "moment";
import { toast } from "react-hot-toast";
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

const MyCouponComponent = () => {
  const [value, setValue] = React.useState(0);
  const coupons = couponStore((store) => store.coupons);
  const customer_coupons = couponStore((store) => store.customer_coupons);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box>
      <Stack direction={"row"} alignItems={"center"} spacing={1} sx={{ p: 3 }}>
        <ConfirmationNumberOutlinedIcon />
        <Typography variant="h6">My Coupon</Typography>
      </Stack>
      <Divider />
      <Box sx={{ borderBottom: 1, borderColor: "divider", p: 2 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="General Coupon" {...a11yProps(0)} />
          <Tab label="Personal Coupon" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Grid container spacing={2}>
            {coupons?.map((coupon, key) => {
              return (
                <Grid item xs={6} key={key}>
                  <StyledCouponBox>
                    <Typography variant="subtitle1">
                      {coupon.type == "percent"
                        ? `${coupon.value} %`
                        : `${coupon.value} MMK`}
                      {""} of Discount.
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        margin: "25px auto",
                        width: "fit-content",
                      }}
                    >
                      <span
                        style={{
                          border: "1px dashed #fff",
                          padding: "6px 10px",
                          borderRight: 0,
                          borderRadius: 1,
                          fontSize: 14,
                        }}
                      >
                        {coupon.code}
                      </span>
                      <StyledCopySpan
                        onClick={() => {
                          navigator.clipboard.writeText(coupon.code);
                          toast.success("Coupon code copied!");
                        }}
                      >
                        Copy Code
                      </StyledCopySpan>
                    </Box>
                    <Typography>
                      Valid Till:{" "}
                      {moment(coupon.expired_date).format("MMM Do YY")}
                    </Typography>
                    <Box
                      sx={{
                        background: "#fff",
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)",
                        left: "-25px",
                      }}
                    ></Box>
                    <Box
                      sx={{
                        background: "#fff",
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)",
                        right: "-25px",
                      }}
                    ></Box>
                  </StyledCouponBox>
                </Grid>
              );
            })}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid container spacing={2}>
            {customer_coupons?.map((cu, key) => {
              return (
                <Grid item xs={6} key={key}>
                  <StyledCouponBox>
                    <Typography variant="subtitle1">
                      {cu.coupon_codes.type == "percent"
                        ? `${cu.coupon_codes.value} %`
                        : `${cu.coupon_codes.value} MMK`}
                      {""} of Discount.
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        margin: "25px auto",
                        width: "fit-content",
                      }}
                    >
                      <span
                        style={{
                          border: "1px dashed #fff",
                          padding: "6px 10px",
                          borderRight: 0,
                          borderRadius: 1,
                          fontSize: 14,
                        }}
                      >
                        {cu.coupon_codes.code}
                      </span>
                      <StyledCopySpan
                        onClick={() => {
                          navigator.clipboard.writeText(cu.coupon_codes.code);
                          toast.success("Coupon code copied!");
                        }}
                      >
                        Copy Code
                      </StyledCopySpan>
                    </Box>
                    <Typography>
                      Valid Till:{" "}
                      {moment(cu.coupon_codes.expired_date).format("MMM Do YY")}
                    </Typography>
                    <Box
                      sx={{
                        background: "#fff",
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)",
                        left: "-25px",
                      }}
                    ></Box>
                    <Box
                      sx={{
                        background: "#fff",
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)",
                        right: "-25px",
                      }}
                    ></Box>
                  </StyledCouponBox>
                </Grid>
              );
            })}
          </Grid>
        </TabPanel>
      </Box>
    </Box>
  );
};
const StyledCouponBox = styled(Box)(({ theme }) => ({
  backgroundImage:
    "linear-gradient(to right top, #e91e63, #eb356f, #ed467b, #ef5587, #f06292)",
  color: "#fff",
  position: "relative",
  padding: "20px 20px",
  textAlign: "center",
  borderRadius: "15px",
}));
const StyledCopySpan = styled("span")(({ theme }) => ({
  border: "1px solid #fff",
  background: "#fff",
  padding: "6px 10px",
  color: "#E91E63",
  cursor: "pointer",
  borderRadius: 2,
  display: "flex",
  alignItems: "center",
  fontSize: 14,
  "&:hover": {
    backgroundColor: "#E91E63",
    color: "#fff",
  },
}));

export default MyCouponComponent;
