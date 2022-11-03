import { Box, Container, Grid, Typography, Stack } from "@mui/material";
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

const HomeComponent = () => {
  return (
    <Box sx={{ py: 2 }}>
      <Container maxWidth="lg">
        <Swiper
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
            <Box sx={{ position: "relative", width: "100%", height: "500px" }}>
              <img
                src="https://swiperjs.com/demos/images/nature-1.jpg"
                alt={"Slider"}
                style={{ width: "100%" }}
              />
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box sx={{ position: "relative", width: "100%", height: "500px" }}>
              <img
                src="https://swiperjs.com/demos/images/nature-2.jpg"
                alt={"Slider"}
                style={{ width: "100%" }}
              />
            </Box>
          </SwiperSlide>
        </Swiper>
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
                <a>View all</a>
              </Link>
            </Box>
          </Stack>
          <Box>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              navigation={true}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 2,
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
              <Typography variant="h5">Featured Brarnd Store</Typography>
            </Box>
            <Box>
              <Link href={"/"} legacyBehavior>
                <a>View all</a>
              </Link>
            </Box>
          </Stack>
          <Box>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              navigation={true}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 2,
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
              <Typography variant="h5">Featured Products</Typography>
            </Box>
            <Box>
              <Link href={"/"} legacyBehavior>
                <a>View all</a>
              </Link>
            </Box>
          </Stack>
          <Box>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              navigation={true}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 2,
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

export default HomeComponent;
