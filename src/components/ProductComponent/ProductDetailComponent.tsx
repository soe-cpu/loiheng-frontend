import {
  Box,
  Button,
  ButtonProps,
  colors,
  Container,
  Divider,
  Grid,
  IconButton,
  InputBase,
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
import React, { useRef, useState } from "react";
import { GoLocation } from "react-icons/go";
import { BsTruck, BsCash, BsShare } from "react-icons/bs";
import { FiRotateCcw } from "react-icons/fi";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { MdOutlineSecurity } from "react-icons/md";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ProductCard from "@common/ProductCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, type Swiper as SwiperRef } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

// import required modules
import {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
  FreeMode,
  Thumbs,
} from "swiper";
// Tab start //
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
// Tab end //

// Table Styled start //
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    borderBottom: `2px solid ${colors.grey[700]}`,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
// Table Styled end //

const ProductDetailComponent = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const swiperRef = useRef<SwiperRef>();

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth={"lg"}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Swiper
              loop={true}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper2"
            >
              <SwiperSlide>
                <img
                  src="https://swiperjs.com/demos/images/nature-1.jpg"
                  style={{ maxHeight: "250px", width: "100%" }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://swiperjs.com/demos/images/nature-2.jpg"
                  style={{ maxHeight: "250px", width: "100%" }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://swiperjs.com/demos/images/nature-3.jpg"
                  style={{ maxHeight: "250px", width: "100%" }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://swiperjs.com/demos/images/nature-4.jpg"
                  style={{ maxHeight: "250px", width: "100%" }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://swiperjs.com/demos/images/nature-5.jpg"
                  style={{ maxHeight: "250px", width: "100%" }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://swiperjs.com/demos/images/nature-6.jpg"
                  style={{ maxHeight: "250px", width: "100%" }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://swiperjs.com/demos/images/nature-7.jpg"
                  style={{ maxHeight: "250px", width: "100%" }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://swiperjs.com/demos/images/nature-8.jpg"
                  style={{ maxHeight: "250px", width: "100%" }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://swiperjs.com/demos/images/nature-9.jpg"
                  style={{ maxHeight: "250px", width: "100%" }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://swiperjs.com/demos/images/nature-10.jpg"
                  style={{ maxHeight: "250px", width: "100%" }}
                />
              </SwiperSlide>
            </Swiper>
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              loop={true}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper"
            >
              <SwiperSlide>
                <img
                  src="https://swiperjs.com/demos/images/nature-1.jpg"
                  style={{ height: "100px", width: "100%" }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://swiperjs.com/demos/images/nature-2.jpg"
                  style={{ height: "100px", width: "100%" }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://swiperjs.com/demos/images/nature-3.jpg"
                  style={{ height: "100px", width: "100%" }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://swiperjs.com/demos/images/nature-4.jpg"
                  style={{ height: "100px", width: "100%" }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://swiperjs.com/demos/images/nature-5.jpg"
                  style={{ height: "100px", width: "100%" }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://swiperjs.com/demos/images/nature-6.jpg"
                  style={{ height: "100px", width: "100%" }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://swiperjs.com/demos/images/nature-7.jpg"
                  style={{ height: "100px", width: "100%" }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://swiperjs.com/demos/images/nature-8.jpg"
                  style={{ height: "100px", width: "100%" }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://swiperjs.com/demos/images/nature-9.jpg"
                  style={{ height: "100px", width: "100%" }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://swiperjs.com/demos/images/nature-10.jpg"
                  style={{ height: "100px", width: "100%" }}
                />
              </SwiperSlide>
            </Swiper>
          </Grid>
          <Grid item xs={12} md={6} lg={5}>
            <Stack>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: 500, fontSize: 16 }}>
                  Mikrotik Cloud Core Router CCR2004-1G-12S+2XS
                </Typography>
                <BsShare />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: colors.blue[500],
                }}
              >
                <Typography>Ks 2,381,580</Typography>
                <Typography>Be The First Review</Typography>
              </Box>
              <Box sx={{ py: 2 }}>
                <ul>
                  <li>Mikrotik Cloud Core Router</li>
                  <li>1 * 10/100/1000 Ethernet ports</li>
                  <li>12 * SFP+ ports</li>
                  <li>Size of RAM : 4 GB</li>
                </ul>
              </Box>
              <Box
                sx={{ display: "flex", gap: 2, alignItems: "center", pb: 1 }}
              >
                <Typography sx={{ fontWeight: 600 }}>Brands:</Typography>
                <Typography sx={{ fontSize: 14 }}>MikroTik</Typography>
              </Box>
              <Box
                sx={{ display: "flex", gap: 2, alignItems: "center", pb: 1 }}
              >
                <Typography sx={{ fontWeight: 600 }}>Category:</Typography>
                <Typography sx={{ fontSize: 14 }}>MikroTik</Typography>
              </Box>
              <Box
                sx={{ display: "flex", gap: 2, alignItems: "center", pb: 4 }}
              >
                <Typography sx={{ fontWeight: 600 }}>SKU :</Typography>
                <Typography sx={{ fontSize: 14 }}>MikroTik</Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", pb: 4 }}
              >
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <IconButton
                    sx={{
                      color: colors.red[500],
                      backgroundColor: colors.grey[100],
                    }}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <InputBase
                    sx={{
                      border: `2px solid ${colors.blue[500]}`,
                      width: "40px",
                      height: "40px",
                      borderRadius: "4px",
                      px: 1,
                    }}
                    value={1}
                  ></InputBase>
                  <IconButton
                    sx={{
                      color: colors.green[500],
                      backgroundColor: colors.grey[100],
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <Typography sx={{ fontWeight: 600, color: colors.red[600] }}>
                    Out of Stock
                  </Typography>
                  <FavButton size={"small"}>
                    <FavoriteBorderOutlinedIcon />
                  </FavButton>
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button variant="contained">Add to Cart</Button>
                <Button variant="contained">Buy Now</Button>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Stack
              spacing={2}
              sx={{ border: `1px solid ${colors.grey[300]}`, p: 2 }}
            >
              <Typography sx={{ fontWeight: 500 }}>Delivery</Typography>
              <Box sx={{ display: "flex", alignItems: "start", gap: 2 }}>
                <GoLocation style={{ color: colors.blue[500], fontSize: 20 }} />
                <Typography sx={{ fontSize: 12 }}>
                  No.10, Nanthar Road, Ahlone Township, Yangon , Myanmar
                  (Burma).
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ display: "flex", alignItems: "start", gap: 2 }}>
                <BsTruck style={{ color: colors.blue[500], fontSize: 20 }} />
                <Typography sx={{ fontSize: 12 }}>
                  32 hours for downtown YGN & 1-5 days for the others
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ display: "flex", alignItems: "start", gap: 2 }}>
                <BsCash style={{ color: colors.blue[500], fontSize: 20 }} />
                <Typography sx={{ fontSize: 12 }}>
                  Cash On Delivery is available
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ display: "flex", alignItems: "start", gap: 2 }}>
                <FiRotateCcw
                  style={{ color: colors.blue[500], fontSize: 20 }}
                />
                <Typography sx={{ fontSize: 12 }}>
                  Shipping is available
                </Typography>
              </Box>
            </Stack>
            <Stack
              spacing={2}
              sx={{ border: `1px solid ${colors.grey[300]}`, p: 2, mt: 2 }}
            >
              <Typography sx={{ fontWeight: 500 }}>Service</Typography>
              <Box sx={{ display: "flex", alignItems: "start", gap: 2 }}>
                <GoLocation style={{ color: colors.blue[500], fontSize: 20 }} />
                <Typography sx={{ fontSize: 12 }}>100 % Authentic</Typography>
              </Box>
              <Divider />
              <Box sx={{ display: "flex", alignItems: "start", gap: 2 }}>
                <MdOutlineSecurity
                  style={{ color: colors.blue[500], fontSize: 20 }}
                />
                <Typography sx={{ fontSize: 12 }}>1 Year Warranty</Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Description" {...a11yProps(0)} />
            <Tab label="Other Specification" {...a11yProps(1)} />
            <Tab label="Support & Download" {...a11yProps(2)} />
            <Tab label="Reviews" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Stack>
            <Typography sx={{ color: colors.grey[600] }}>
              The “Improvise. Adapt. Overcome.” mindset can be very helpful, but
              sometimes you simply need a device that works and solves the
              problem without additional tinkering. The CCR2004-1G-12S+2XS does
              just that – forget about all connectivity troubles and expand your
              setup in any way you please. This handy router features 12 x 10G
              SFP+ and 2 x 25G SFP28 ports. CCR2004-1G-12S+2XS is our router
              with the most powerful single-core performance so far. It provides
              incredible results in single tunnel (up to 3.4 Gbps) and BGP feed
              processing. Be prepared for anything: 10G, 40G and now 25G! Paired
              with such MikroTik multiport products as CRS317-1G-16S+RM,
              CRS312-4C+8XG-RM and CRS326-24S+2Q+RM, your networking setup will
              know no bounds. Performance-wise, CCR2004-1G-12S+2XS is on par
              with the renowned CCR1009/CCR1016 routers. And with dual redundant
              power supply you can forget about unexpected downtime! With its
              elaborate port configuration, the new CCR2004-1G-12S+2XS is the
              perfect addition to any professional networking arsenal – it will
              save you tons of time in some tricky situations! Size of RAM in
              RouterOS v7 4GB ECC
            </Typography>
            <Box sx={{ py: 2 }}>
              <Typography
                sx={{ fontWeight: 600, fontSize: 18, color: colors.grey[600] }}
              >
                Specifications
              </Typography>
              <TableContainer>
                <Table
                  sx={{ minWidth: 700 }}
                  aria-label="customized table"
                  size="small"
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell colSpan={2}>Details</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell component="th" scope="row">
                        Product Code
                      </StyledTableCell>
                      <StyledTableCell>test</StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Box sx={{ py: 2 }}>
              <Typography
                sx={{ fontWeight: 600, fontSize: 18, color: colors.grey[600] }}
              >
                Powering
              </Typography>
              <TableContainer>
                <Table
                  sx={{ minWidth: 700 }}
                  aria-label="customized table"
                  size="small"
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell colSpan={2}>Details</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell component="th" scope="row">
                        Product Code
                      </StyledTableCell>
                      <StyledTableCell>test</StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Box sx={{ py: 2 }}>
              <Typography
                sx={{ fontWeight: 600, fontSize: 18, color: colors.grey[600] }}
              >
                Ethernet
              </Typography>
              <TableContainer>
                <Table
                  sx={{ minWidth: 700 }}
                  aria-label="customized table"
                  size="small"
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell colSpan={2}>Details</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell component="th" scope="row">
                        Product Code
                      </StyledTableCell>
                      <StyledTableCell>test</StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Box sx={{ py: 2 }}>
              <Typography
                sx={{ fontWeight: 600, fontSize: 18, color: colors.grey[600] }}
              >
                Fiber
              </Typography>
              <TableContainer>
                <Table
                  sx={{ minWidth: 700 }}
                  aria-label="customized table"
                  size="small"
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell colSpan={2}>Details</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell component="th" scope="row">
                        Product Code
                      </StyledTableCell>
                      <StyledTableCell>test</StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Box sx={{ py: 2 }}>
              <Typography
                sx={{ fontWeight: 600, fontSize: 18, color: colors.grey[600] }}
              >
                Peripherals
              </Typography>
              <TableContainer>
                <Table
                  sx={{ minWidth: 700 }}
                  aria-label="customized table"
                  size="small"
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell colSpan={2}>Details</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell component="th" scope="row">
                        Product Code
                      </StyledTableCell>
                      <StyledTableCell>test</StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Stack>
        </TabPanel>
        <TabPanel value={value} index={1}></TabPanel>
        <TabPanel value={value} index={2}></TabPanel>
        <TabPanel value={value} index={3}></TabPanel>
        <Box>
          <Typography variant="h5">You may also like</Typography>
          <Box sx={{ py: 2 }}>
            <Swiper
              slidesPerView={2}
              spaceBetween={10}
              navigation={true}
              breakpoints={{
                640: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 10,
                },
              }}
              modules={[Navigation]}
              className="mySwiper"
            >
              <SwiperSlide>
                <ProductCard />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard />
              </SwiperSlide>
            </Swiper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

const FavButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: colors.pink[500],
  borderRadius: "4px",
  border: `1px solid ${colors.pink[500]}`,
  "&:hover": {
    color: "#fff",
    backgroundColor: colors.pink[700],
  },
}));
export default ProductDetailComponent;
