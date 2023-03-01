import React from "react";
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
  Skeleton,
} from "@mui/material";

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
import useAllHomePageBanner from "@apis/useAllHomePageBanner";
import { GetHomePageBannerListResponse } from "@atoms/homePageBannerListAtom";
import Image from "next/image";
import useAllNewArrivalProduct from "@apis/useAllNewArrivalProduct";
import useAllBrand from "@apis/useAllBrand";
import { GetBrandResponse } from "@atoms/brandListAtom";
import { relative } from "path";
import { GetProductListResponse } from "@atoms/productListAtom";
import useAllFeatureProduct from "@apis/useAllFeatureProduct";
import { useSession } from "next-auth/react";
import wishlistStore, { Product } from "@stores/wishlist.store";
import useAllPromoProduct from "@apis/useAllPromoProduct";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import { Banner } from "./Banner";

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

const myLoader = ({ src, width, quality }: any) => {
  return `https://api.loiheng.duckdns.org${src}?q=${quality || 75}`;
};

const HomeComponent = () => {
  const theme = useTheme();
  const { data: session } = useSession();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const homeSlide = {
    dots: false,
    infinite: true,
    speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };
  var productSlide = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    swipeToSlide: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          initialSlide: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };
  var brandSlide = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    swipeToSlide: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          initialSlide: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  const { data, error, isValidating } = useAllHomePageBanner();
  const {
    data: newProductData,
    error: newProductError,
    isValidating: newProductIsValidating,
  } = useAllNewArrivalProduct();
  // const {
  // 	data: featureProductData,
  // 	error: featureProductError,
  // 	isValidating: featureProductIsValidating,
  // } = useAllFeatureProduct();
  const {
    data: brandData,
    error: brandError,
    isValidating: brandIsValidating,
  } = useAllBrand();

  const { data: promotionProducts } = useAllPromoProduct([], [], 1, 20);

  const [banner, setBanner] =
    React.useState<GetHomePageBannerListResponse["data"]>();
  const [newProduct, setNewProduct] =
    React.useState<GetProductListResponse["data"]>();
  const [featureProduct, setFeatureProduct] =
    React.useState<GetProductListResponse["data"]>();
  const [brand, setBrand] = React.useState<GetBrandResponse["data"]>();

  const [promotions, setPromotions] = React.useState<Product[]>([]);

  React.useEffect(() => {
    if (data) {
      setBanner(data.data);
    }
    if (newProductData) {
      setNewProduct(newProductData.data);
    }
    // if (featureProductData) {
    // 	setFeatureProduct(featureProductData.data);
    // }
    if (brandData) {
      setBrand(brandData.data);
    }
    if (promotionProducts) {
      setPromotions(promotionProducts.data.products);
    }
  }, [
    data,
    setBanner,
    newProductData,
    setNewProduct,
    brandData,
    setBrand,
    // featureProductData,
    setFeatureProduct,
    promotionProducts,
  ]);

  const myLoaderGif = ({ src, width, quality }: any) => {
    return `${src}?q=${quality || 75}`;
  };

  return (
    <Box sx={{ py: 0 }}>
      <Banner banners={banner?.banner_sliders} />
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Stack
            justifyContent={"space-between"}
            direction={"row"}
            sx={{ pb: 4 }}
          >
            <Box>
              <Typography variant="h6">New Arrivals</Typography>
            </Box>
            <Box>
              <Link href={"/new-arrivals"} legacyBehavior>
                <ViewAllLink>View all</ViewAllLink>
              </Link>
            </Box>
          </Stack>
          <Box>
            <Slider {...productSlide}>
              {newProduct?.products.map((product, index) => {
                return (
                  <Box sx={{ pr: 1 }} key={index}>
                    <ProductCard data={product} />
                  </Box>
                );
              })}
            </Slider>
          </Box>
        </Box>
        {/* <Box sx={{ pb: 4 }}>
					<Stack
						justifyContent={"space-between"}
						direction={"row"}
						sx={{ pb: 4 }}
					>
						<Box>
							<Typography variant="h6">Featured Products</Typography>
						</Box>
						<Box>
							<Link href={"/featured-products"} legacyBehavior>
								<ViewAllLink>View all</ViewAllLink>
							</Link>
						</Box>
					</Stack>
					<Box>
						<Slider {...productSlide}>
							{featureProduct?.products.map((featured, index) => {
								return (
									<Box sx={{ pr: 1 }} key={index}>
										<ProductCard data={featured} />
									</Box>
								);
							})}
						</Slider>
					</Box>
				</Box> */}
        <Box sx={{ pb: 4 }}>
          <Stack
            justifyContent={"space-between"}
            direction={"row"}
            sx={{ pb: 4 }}
          >
            <Box>
              <Typography variant="h6">Promotion Products</Typography>
            </Box>
            <Box>
              <Link href={"/deals-and-promotions"} legacyBehavior>
                <ViewAllLink>View all</ViewAllLink>
              </Link>
            </Box>
          </Stack>
          <Box>
            <Slider {...productSlide}>
              {promotions.map((featured, index) => {
                return (
                  <Box sx={{ pr: 1 }} key={index}>
                    <ProductCard data={featured} />
                  </Box>
                );
              })}
            </Slider>
          </Box>
        </Box>
        <Box sx={{ pb: 4 }}>
          <Stack
            justifyContent={"space-between"}
            direction={"row"}
            sx={{ pb: 4 }}
          >
            <Box>
              <Typography variant="h6">Featured Brand Store</Typography>
            </Box>
            <Box>
              <Link href={"/brands"} legacyBehavior>
                <ViewAllLink>View all</ViewAllLink>
              </Link>
            </Box>
          </Stack>
          <Box>
            <Slider {...brandSlide}>
              {brand?.brands.map((brand, index) => {
                return (
                  <Box key={index} sx={{ pr: 1 }}>
                    <Box
                      sx={{
                        width: "100%",
                        height: isMobile ? "140px" : "120px",
                        borderRadius: "4px",
                        position: "relative",
                        border: `1px solid ${colors.grey[300]}`,
                        "&:hover": {
                          boxShadow: 1,
                          transition: "0.5s",
                          transitionTimingFunction: "ease-in-out",
                        },
                      }}
                    >
                      <Link href={`/product?brands=${brand.id}`}>
                        <Image
                          loader={myLoader}
                          src={brand.picture}
                          alt="Brand Image"
                          fill
                          style={{ objectFit: "contain", padding: "4px" }}
                          sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                        />
                      </Link>
                    </Box>
                  </Box>
                );
              })}
            </Slider>
          </Box>
        </Box>
        <Box sx={{ pb: 4 }}>
          <Stack
            justifyContent={"space-between"}
            direction={"row"}
            sx={{ pb: 4 }}
          >
            <Box>
              <Typography variant="h6">Company Profile</Typography>
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
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Image
                    src={"/ec.gif"}
                    alt={"logo"}
                    loader={myLoaderGif}
                    fill
                    sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                  />
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
