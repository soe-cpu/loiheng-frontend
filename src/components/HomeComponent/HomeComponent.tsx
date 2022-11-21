import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  styled,
  colors,
  useMediaQuery,
  useTheme,
  Tooltip,
} from "@mui/material";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import Image from "next/image";
import ProductCard from "@common/ProductCard";
import Link from "next/link";
import { AiFillTwitterCircle } from "react-icons/ai";
import { BsFacebook, BsMessenger } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function NextArrow(props: any) {
  const { style, onClick } = props;
  return (
    <div style={{ ...style, display: "block" }} onClick={onClick}>
      <IoIosArrowDroprightCircle className="slick-arrow-icon-right" />
    </div>
  );
}

function PrevArrow(props: any) {
  const { style, onClick } = props;
  return (
    <div
      style={{ ...style, display: "block" }}
      className="test"
      onClick={onClick}
    >
      <IoIosArrowDropleftCircle className="slick-arrow-icon-left" />
    </div>
  );
}

const HomeComponent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const homeSlide = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  var productSlide = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Box sx={{ py: 2 }}>
      <Container maxWidth="lg">
        {/* <Swiper
          spaceBetween={30}
          effect={"fade"}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[EffectFade, Navigation, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: isMobile ? "250px" : "500px",
              }}
            >
              <img
                src="https://swiperjs.com/demos/images/nature-1.jpg"
                alt={"Slider"}
                style={{ width: "100%" }}
              />
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: isMobile ? "250px" : "500px",
              }}
            >
              <img
                src="https://swiperjs.com/demos/images/nature-2.jpg"
                alt={"Slider"}
                style={{ width: "100%" }}
              />
            </Box>
          </SwiperSlide>
        </Swiper> */}
        <div>
          <Slider {...homeSlide}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: isMobile ? "250px" : "500px",
              }}
            >
              <img
                src="https://swiperjs.com/demos/images/nature-1.jpg"
                alt={"Slider"}
                style={{ width: "100%" }}
              />
            </Box>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: isMobile ? "250px" : "500px",
              }}
            >
              <img
                src="https://swiperjs.com/demos/images/nature-2.jpg"
                alt={"Slider"}
                style={{ width: "100%" }}
              />
            </Box>
          </Slider>
        </div>
        <Box sx={{ py: 4 }}>
          <Stack
            justifyContent={"space-between"}
            direction={"row"}
            sx={{ pb: 4 }}
          >
            <Box>
              <Typography variant="h5">New Arrivals</Typography>
            </Box>
            <Box>
              <Link href={"/"} legacyBehavior>
                <ViewAllLink>View all</ViewAllLink>
              </Link>
            </Box>
          </Stack>
          <Box>
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
        <Box sx={{ py: 4 }}>
          <Stack
            justifyContent={"space-between"}
            direction={"row"}
            sx={{ pb: 4 }}
          >
            <Box>
              <Typography variant="h5">Hots & Sales & Promotion</Typography>
            </Box>
            <Box>
              <Link href={"/"} legacyBehavior>
                <ViewAllLink>View all</ViewAllLink>
              </Link>
            </Box>
          </Stack>
          <Box>
            <Slider {...productSlide}>
              <Box sx={{ pr: 1 }}>
                <ProductCard />
              </Box>
              <Box sx={{ pr: 1 }}>
                <ProductCard />
              </Box>
              <Box sx={{ pr: 1 }}>
                <ProductCard />
              </Box>
              <Box sx={{ pr: 1 }}>
                <ProductCard />
              </Box>
              <Box sx={{ pr: 1 }}>
                <ProductCard />
              </Box>
              <Box sx={{ pr: 1 }}>
                <ProductCard />
              </Box>
            </Slider>
          </Box>
        </Box>
        <Box sx={{ py: 4 }}>
          <Stack
            justifyContent={"space-between"}
            direction={"row"}
            sx={{ pb: 4 }}
          >
            <Box>
              <Typography variant="h5">Featured Brand Store</Typography>
            </Box>
            <Box>
              <Link href={"/"} legacyBehavior>
                <ViewAllLink>View all</ViewAllLink>
              </Link>
            </Box>
          </Stack>
          <Box>
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
        <Box sx={{ py: 4 }}>
          <Stack
            justifyContent={"space-between"}
            direction={"row"}
            sx={{ pb: 4 }}
          >
            <Box>
              <Typography variant="h5">Company Profile</Typography>
            </Box>
          </Stack>
          <Box
            sx={{
              border: `1px solid ${colors.grey[300]}`,
              p: 2,
              borderRadius: "20px",
            }}
          >
            <Grid container spacing={16}>
              <Grid item xs={12} md={6}>
                <Box>
                  <img src="/ec.gif" alt="" />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontWeight: 500,
                        fontSize: 18,
                      }}
                    >
                      About Company
                    </Typography>
                    <Typography sx={{ py: 2 }}>
                      Loi Heng International Pte Ltd is one of the leading IT
                      Company provides products and networking solutions through
                      channel dealers and direct sales, serving both the local
                      and international organizations. Our official name in
                      Myanmar is known as THEIN HAN & KHINE MYAE CO., LTD. (aka
                      LOI HENG INTERNATIONAL). In order to meet the needs of
                      clients, we distribute a wide range of IT products that
                      are well known globally and synonymous with ease of
                      technology leadership. SMC Networks – Full Range of
                      Networking Products (Authorized Distributor for Singapore
                      & Myanmar) EdgeCore – Full Range of Networking Products
                      (Authorized Distributor for Singapore & Myanmar) LevelOne
                      – Full Range of Networking Products (Authorized
                      Distributor for Myanmar) UBiQUiTi – Full Range of
                      Networking Products (Authorized Distributor for Myanmar)
                      SEPOMs – Ink & Paper (Photo Paper, Inkjet Paper… etc).
                    </Typography>
                    <Stack direction={"row"} sx={{ pt: 2 }}>
                      <Box
                        sx={{ display: "flex", gap: 1, alignItems: "center" }}
                      >
                        <Tooltip title="Facebook" arrow>
                          <Link
                            href="https://www.facebook.com/sharer/sharer.php?u=https://www.facebook.com/loihengmm"
                            legacyBehavior
                          >
                            <ShareButton>
                              <BsFacebook />
                            </ShareButton>
                          </Link>
                        </Tooltip>
                        <Tooltip title="Messenger" arrow>
                          <Link
                            href="https://www.messenger.com/sharer/sharer.php?u=https://www.facebook.com/loihengmm"
                            legacyBehavior
                          >
                            <ShareButton>
                              <BsMessenger />
                            </ShareButton>
                          </Link>
                        </Tooltip>
                        <Tooltip title="Twitter" arrow>
                          <Link
                            href="https://www.twitter.com/sharer/sharer.php?u=https://www.twitter.com/loihengmm"
                            legacyBehavior
                          >
                            <ShareButton>
                              <AiFillTwitterCircle />
                            </ShareButton>
                          </Link>
                        </Tooltip>
                        <Tooltip title="Email" arrow>
                          <Link
                            href="https://mail.google.com//sharer/sharer.php?u=sale@loiheng.com"
                            legacyBehavior
                          >
                            <ShareButton>
                              <GrMail />
                            </ShareButton>
                          </Link>
                        </Tooltip>
                      </Box>
                    </Stack>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

const ViewAllLink = styled("a")(({ theme }) => ({
  color: colors.blue[500],
  fontWeight: 600,
  fontSize: 18,
  cursor: "pointer",
  "&:hover": {
    color: colors.blue[700],
  },
}));

const ShareButton = styled("a")(({ theme }) => ({
  backgroundColor: colors.blue[100],
  color: colors.blue[700],
  borderRadius: "4px",
  border: `0px`,
  padding: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: colors.blue[200],
  },
}));

export default HomeComponent;
