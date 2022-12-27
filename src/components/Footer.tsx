import {
  Box,
  Button,
  colors,
  Container,
  Grid,
  InputBase,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import useAllSetting from "@apis/useAllSetting";
import { GetSettingResponse } from "@atoms/settingListAtom";
import Link from "next/link";

const Footer = () => {
  const {
    data: footerM,
    error: foterMError,
    isValidating: footerMIsValidating,
  } = useAllSetting("footer_mail");
  const {
    data: footerPh,
    error: foterPhError,
    isValidating: footerPhIsValidating,
  } = useAllSetting("footer_phone");
  const {
    data: footerAdd,
    error: foterAddError,
    isValidating: footerAddIsValidating,
  } = useAllSetting("footer_address");
  const [footerMail, setFooterMail] = React.useState<GetSettingResponse>();
  const [footerPhone, setFooterPhone] = React.useState<GetSettingResponse>();
  const [footerAddress, setFooterAddress] =
    React.useState<GetSettingResponse>();

  React.useEffect(() => {
    if (footerM) {
      setFooterMail(footerM);
    }
    if (footerPh) {
      setFooterPhone(footerPh);
    }
    if (footerAdd) {
      setFooterAddress(footerAdd);
    }
  }, [
    footerM,
    setFooterMail,
    footerAdd,
    setFooterAddress,
    footerPh,
    setFooterPhone,
  ]);
  return (
    <Box
      sx={{
        backgroundColor: "#F4F6F8",
        borderTop: `1px solid ${colors.grey[200]}`,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Container maxWidth={"lg"} sx={{ py: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={3}>
              <Stack spacing={2}>
                <Typography variant="h6">Get In Touch</Typography>
                <Stack direction={"row"} spacing={1} alignItems={"start"}>
                  <LocationOnIcon sx={{ color: colors.blue[500] }} />
                  <Typography variant="subtitle2">
                    {footerAddress?.data.value}
                  </Typography>
                </Stack>
                <Stack direction={"row"} spacing={1} alignItems={"start"}>
                  <EmailIcon sx={{ color: colors.blue[500] }} />
                  <Typography variant="subtitle2">
                    {footerMail?.data.value}
                  </Typography>
                </Stack>
                <Stack direction={"row"} spacing={1} alignItems={"start"}>
                  <PhoneAndroidIcon sx={{ color: colors.blue[500] }} />
                  <Typography variant="subtitle2">
                    {footerPhone?.data.value}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Stack spacing={3}>
                <Typography variant="h6">Footer Menu</Typography>
                <Box>
                  <Typography variant="body1">
                    <Link href={"/product"} legacyBehavior>
                      <a style={{ textDecoration: "none", color: "#000" }}>
                        Our Products
                      </a>
                    </Link>
                  </Typography>
                  <Typography variant="body1">
                    <Link href={"/brands"} legacyBehavior>
                      <a style={{ textDecoration: "none", color: "#000" }}>
                        Brands
                      </a>
                    </Link>
                  </Typography>
                  <Typography variant="body1">Your Account</Typography>
                  <Typography variant="body1">Your Orders</Typography>
                  <Typography variant="body1">Returns & Refunds</Typography>
                  <Typography variant="body1">
                    <Link href={"/contact-us"} legacyBehavior>
                      <a style={{ textDecoration: "none", color: "#000" }}>
                        {" "}
                        Find Us On Map
                      </a>
                    </Link>
                  </Typography>
                  <Typography variant="body1">
                    <Link href={"/term-and-condition"} legacyBehavior>
                      <a style={{ textDecoration: "none", color: "#000" }}>
                        {" "}
                        Terms & Conditions
                      </a>
                    </Link>
                  </Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Stack spacing={3}>
                <Typography variant="h6">Email Deal Alerts</Typography>
                <Box>
                  <Typography variant="caption">
                    Sign up to receive special offers & deals
                  </Typography>
                  <InputBase
                    fullWidth
                    placeholder="Enter Your Email Address..."
                    sx={{
                      border: `1px solid ${colors.grey[400]}`,
                      backgroundColor: "#fff",
                      borderRadius: "4px",
                      px: 1,
                    }}
                  />
                  <button
                    style={{
                      color: "#fff",
                      marginTop: "6px",
                      padding: "2px 6px",
                      borderRadius: "2px",
                      backgroundColor: "#000",
                    }}
                  >
                    Sign Me Up!
                  </button>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Box>
                <iframe
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Floihengmm&tabs=timeline&width=300&height=220&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=693283734995039"
                  width="300"
                  height="220"
                  scrolling="no"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                ></iframe>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        sx={{
          height: "64px",
          borderTop: `1px solid  ${colors.grey[300]}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>
          LoiHeng © 2022 | Developed by LoiHeng Development.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
