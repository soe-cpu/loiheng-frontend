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
            <Grid item xs={6}>
              <StyledCouponBox>
                <Typography>
                  20% flat off on all rides within the city
                  <br />
                  using HDFC Credit Card
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
                    STEALDEAL20
                  </span>
                  <span
                    style={{
                      border: "1px solid #fff",
                      background: "#fff",
                      padding: "6px 10px",
                      color: "#E91E63",
                      cursor: "pointer",
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      fontSize: 14,
                    }}
                  >
                    Copy Code
                  </span>
                </Box>
                <Typography>Valid Till: 20Dec, 2021</Typography>
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
            <Grid item xs={6}>
              <StyledCouponBox>
                <Typography>
                  20% flat off on all rides within the city
                  <br />
                  using HDFC Credit Card
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
                    STEALDEAL20
                  </span>
                  <span
                    style={{
                      border: "1px solid #fff",
                      background: "#fff",
                      padding: "6px 10px",
                      color: "#E91E63",
                      cursor: "pointer",
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      fontSize: 14,
                    }}
                  >
                    Copy Code
                  </span>
                </Box>
                <Typography>Valid Till: 20Dec, 2021</Typography>
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
            <Grid item xs={4}></Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Typography>Hi</Typography>
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

export default MyCouponComponent;
