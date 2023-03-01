import {
  Box,
  Button,
  ButtonProps,
  colors,
  Container,
  Divider,
  Grid,
  IconButton,
  IconButtonProps,
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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { GoLocation } from "react-icons/go";
import { BsTruck, BsCash, BsShare } from "react-icons/bs";
import { FiRotateCcw } from "react-icons/fi";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { MdOutlineSecurity } from "react-icons/md";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ProductCard from "@common/ProductCard";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProductDetails } from "@apis/useProductDetails";
import Link from "next/link";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import wishlistStore, { Product } from "@stores/wishlist.store";
import { useRouter } from "next/router";
import useAllProduct from "@apis/useAllProduct";
import { GetProductListResponse } from "@atoms/productListAtom";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import { isInWishlist } from "src/utils/isInWishlist";
import cartStore from "@stores/cart.store";
import InnerImageZoom from "react-inner-image-zoom";
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

// Stick Slide start //
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
// Stick Slide end //

const ProductDetailComponent = (props: Product) => {
  // states
  const [value, setValue] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);

  const slider1 = useRef(null);
  const slider2 = useRef(null);
  const [nav1, setNav1] = useState<any>();
  const [nav2, setNav2] = useState<any>();

  // Hooks
  const { data } = useSession();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const increaseQuantity = () => {
    const stock = props.stock ?? 0;
    if (stock > quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const {
    data: productData,
    error,
    isValidating,
  } = useAllProduct([], [], "", 1);
  const [products, setProduct] =
    React.useState<GetProductListResponse["data"]>();
  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
    if (productData) {
      setProduct(productData.data);
    }
  }, [productData, setProduct]);

  const addProductToWishlist = () => {
    if (data) {
      const { getState } = wishlistStore;
      const wishlists = getState().wishlists;
      const addWishlist = getState().addWishlist;
      const removeWishlist = getState().removeWishlist;
      if (props)
        if (wishlists?.find((p) => p.id === props.id)) {
          removeWishlist(data, props);
        } else {
          addWishlist(data, props);
        }
    } else {
      signIn();
    }
  };

  const productSlide = {
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
          infinite: true,
          dots: true,
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
  const asNav = {
    slidesToShow: 5,
    swipeToSlide: true,
    focusOnSelect: true,
    infinite: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dots: false,
  };

  const wishlists = wishlistStore((store) => store.wishlists);

  const check = isInWishlist(props, wishlists);

  const { addToCart } = cartStore();

  const handleAddToCart = () => {
    if (data) {
      addToCart(data, props.id, quantity);
    } else {
      signIn();
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth={"lg"}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={4}>
            <div style={{ display: "flex", gap: 4, flexDirection: "column" }}>
              <Slider
                infinite={false}
                asNavFor={nav2}
                ref={slider1}
                arrows={false}
              >
                {props.product_pictures.map((pic) => {
                  return (
                    <Box
                      key={pic.id}
                      sx={{
                        width: "100%",
                        height: isMobile ? "300px" : "350px",
                        position: "relative",
                        p: 3,
                        border: `1px solid ${colors.grey[300]}`,
                      }}
                    >
                      <InnerImageZoom
                        src={"https://api.loiheng.duckdns.org/" + pic.image}
                        className={"absolute object-contain"}
                        zoomType="click"
                        zoomPreload={true}
                      />
                      {/* <Image
												src={"https://api.loiheng.duckdns.org/" + pic.image}
												alt={"Product Image"}
												fill
												style={{
													objectFit: "contain",
												}}
											/> */}
                    </Box>
                  );
                })}
              </Slider>
              <Slider asNavFor={nav1} ref={slider2} {...asNav}>
                {props.product_pictures.map((pic) => {
                  return (
                    <Box sx={{ p: "2px" }} key={pic.id}>
                      <Box width={"100%"} height={"70px"} position={"relative"}>
                        <Image
                          src={"https://api.loiheng.duckdns.org/" + pic.image}
                          alt={"Product Image"}
                          fill
                          style={{
                            border: `1px solid ${colors.grey[300]}`,
                            boxShadow: `1px 1px 5px ${colors.grey[300]}`,
                            borderRadius: "4px",
                          }}
                        />
                      </Box>
                    </Box>
                  );
                })}
                {/*
								<Box sx={{ pr: 1 }}>
									<img
										src="/test/3.jpg"
										alt=""
										width={"100%"}
										height={"60px"}
									/>
								</Box>
								<Box sx={{ pr: 1 }}>
									<img
										src="/test/3.jpg"
										alt=""
										width={"100%"}
										height={"60px"}
									/>
								</Box>
								<Box sx={{ pr: 1 }}>
									<img
										src="/test/3.jpg"
										alt=""
										width={"100%"}
										height={"60px"}
									/>
								</Box> */}
              </Slider>
            </div>
          </Grid>
          <Grid item xs={12} md={6} lg={5}>
            <Stack>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: 500, fontSize: 16 }}>
                  {props.name ?? "Name"}
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
                {props.discount.length > 0 ? (
                  <Typography>
                    <del style={{ color: colors.red[500] }}>
                      {new Intl.NumberFormat("mm-MM", {
                        style: "currency",
                        currency: "MMK",
                        currencyDisplay: "code",
                      }).format(props.price ?? 1000)}
                    </del>
                    <span style={{ paddingLeft: "6px" }}>
                      {new Intl.NumberFormat("mm-MM", {
                        style: "currency",
                        currency: "MMK",
                        currencyDisplay: "code",
                      }).format(props.discount[0].promo_price)}
                    </span>
                  </Typography>
                ) : (
                  <Typography>
                    {new Intl.NumberFormat("mm-MM", {
                      style: "currency",
                      currency: "MMK",
                      currencyDisplay: "code",
                    }).format(props.price ?? 1000)}
                  </Typography>
                )}

                <Typography>Be The First Review</Typography>
              </Box>
              <Box sx={{ py: 2 }}>
                {props.short_description ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: props.short_description,
                    }}
                  />
                ) : (
                  "-"
                )}
              </Box>
              <Box
                sx={{ display: "flex", gap: 2, alignItems: "center", pb: 1 }}
              >
                <Typography sx={{ fontWeight: 600 }}>Brands:</Typography>
                <Typography sx={{ fontSize: 14 }}>
                  {props.brand.map((b) => {
                    return (
                      <Link href={"/product?brands=" + b.id} key={b.id}>
                        <span>{b.name}</span>
                        {", "}
                      </Link>
                    );
                  })}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", gap: 2, alignItems: "center", pb: 1 }}
              >
                <Typography sx={{ fontWeight: 600 }}>Category:</Typography>
                <Typography sx={{ fontSize: 14 }}>
                  {props.category.map((c) => {
                    return (
                      <Link href={"/product?categories=" + c.id} key={c.id}>
                        <span>{c.name}</span>
                        {", "}
                      </Link>
                    );
                  })}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", gap: 2, alignItems: "center", pb: 1 }}
              >
                <Typography sx={{ fontWeight: 600 }}>SKU :</Typography>
                <Typography sx={{ fontSize: 14 }}>{props.sku}</Typography>
              </Box>
              {props.discount.length > 0 ? (
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <Typography sx={{ fontWeight: 600 }}>Discount :</Typography>
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: colors.red[500],
                      fontWeight: 500,
                    }}
                  >
                    {props.discount[0].percent} %
                  </Typography>
                </Box>
              ) : (
                ""
              )}
              <Box
                sx={{ display: "flex", justifyContent: "space-between", py: 4 }}
              >
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  {props.stock ? (
                    props.stock > 0 ? (
                      <Box display={"flex"} gap={1} alignItems={"center"}>
                        <IconButton
                          sx={{
                            color: colors.red[500],
                            backgroundColor: colors.grey[100],
                          }}
                          onClick={() => decreaseQuantity()}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <InputBase
                          sx={{
                            border: `2px solid ${colors.blue[500]}`,
                            width: "60px",
                            height: "40px",
                            borderRadius: "4px",
                            textAlign: "center",
                            px: 1,
                            "& input": {
                              textAlign: "center",
                            },
                          }}
                          value={quantity}
                        />
                        <IconButton
                          sx={{
                            color: colors.green[500],
                            backgroundColor: colors.grey[100],
                          }}
                          onClick={() => increaseQuantity()}
                        >
                          <AddIcon />
                        </IconButton>
                        <Typography
                          sx={{ color: colors.grey[500], fontSize: 14 }}
                        >
                          Only {props.stock} items
                        </Typography>
                      </Box>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </Box>
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  {props.stock ? (
                    props.stock > 0 ? (
                      <Typography
                        sx={{ fontWeight: 600, color: colors.green[600] }}
                      >
                        In Stock
                      </Typography>
                    ) : props.is_preorder ? (
                      <Typography
                        sx={{ fontWeight: 600, color: colors.green[600] }}
                      >
                        Pre-order
                      </Typography>
                    ) : (
                      <Typography
                        sx={{ fontWeight: 600, color: colors.red[600] }}
                      >
                        Out of Stock
                      </Typography>
                    )
                  ) : (
                    <Typography
                      sx={{ fontWeight: 600, color: colors.red[600] }}
                    >
                      Out of Stock
                    </Typography>
                  )}
                  <FavButton
                    size={"small"}
                    onClick={() => addProductToWishlist()}
                  >
                    {check ? (
                      <FavoriteSharpIcon sx={{ color: colors.pink[500] }} />
                    ) : (
                      <FavoriteBorderOutlinedIcon />
                    )}
                  </FavButton>
                </Box>
              </Box>
              {props.stock ? (
                props.stock > 0 ? (
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        backgroundColor: colors.blue[500],
                        boxShadow: 0,
                        color: "#fff",
                        "&:hover": {
                          boxShadow: 0,
                          backgroundColor: colors.blue[700],
                        },
                      }}
                      onClick={() => handleAddToCart()}
                    >
                      Add to cart
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        backgroundColor: colors.blue[500],
                        boxShadow: 0,
                        color: "#fff",
                        "&:hover": {
                          boxShadow: 0,
                          backgroundColor: colors.blue[700],
                        },
                      }}
                      onClick={() => {
                        router.push(
                          `/checkout?product_id=${props.id}&qty=${quantity}`
                        );
                      }}
                    >
                      Buy Now
                    </Button>
                  </Box>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
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
              {props.product_warranties.map((warranty) => {
                return (
                  <Box
                    key={warranty.id}
                    sx={{ display: "flex", alignItems: "start", gap: 2 }}
                  >
                    {warranty.service_key === "shield" ? (
                      <MdOutlineSecurity
                        style={{ color: colors.blue[500], fontSize: 20 }}
                      />
                    ) : (
                      <GoLocation
                        style={{ color: colors.blue[500], fontSize: 20 }}
                      />
                    )}
                    <Typography sx={{ fontSize: 12 }}>
                      {warranty.service_value}
                    </Typography>
                    <Divider />
                  </Box>
                );
              })}
              {/* <Box >
								<GoLocation style={{ color: colors.blue[500], fontSize: 20 }} />
								<Typography sx={{ fontSize: 12 }}>100 % Authentic</Typography>
							</Box>
							<Divider />
							<Box sx={{ display: "flex", alignItems: "start", gap: 2 }}>
								<MdOutlineSecurity
									style={{ color: colors.blue[500], fontSize: 20 }}
								/>
								<Typography sx={{ fontSize: 12 }}>1 Year Warranty</Typography>
							</Box> */}
            </Stack>
          </Grid>
        </Grid>
        <Box
          sx={{
            borderBottom: 1,
            marginTop: 10,
            borderColor: "divider",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Description" {...a11yProps(0)} />
            <Tab label="Other Specification" {...a11yProps(1)} />
            <Tab label="Support & Download" {...a11yProps(2)} />
            {/* <Tab label="Reviews" {...a11yProps(3)} /> */}
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box sx={{ overflowX: "scroll" }}>
            {props.description ? (
              <div dangerouslySetInnerHTML={{ __html: props.description }} />
            ) : (
              "-"
            )}
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          -
        </TabPanel>
        <TabPanel value={value} index={2}>
          {props.desc_file ? (
            <a href={"https://api.loiheng.duckdns.org" + props.desc_file}>
              Support & Download
            </a>
          ) : (
            ""
          )}
        </TabPanel>
        <TabPanel value={value} index={3}></TabPanel>
        <Box sx={{ marginTop: 10 }}>
          <Typography variant="h5">You may also like</Typography>
          <Box sx={{ py: 2 }}>
            <Slider {...productSlide}>
              {products?.products.map((product, index) => {
                return (
                  <Box sx={{ pr: 1 }} key={index}>
                    <ProductCard data={product} />
                  </Box>
                );
              })}
            </Slider>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

const FavButton = styled(IconButton)<ButtonProps>(({ theme }) => ({
  color: colors.blue[500],
  borderRadius: "5px",
  border: `1px solid ${colors.blue[500]}`,
  transition: "0.3s",
  // "&:hover": {
  // 	color: "#fff",
  // 	backgroundColor: colors.blue[500],
  // },
}));

export default ProductDetailComponent;
