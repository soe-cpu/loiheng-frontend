import {
  Box,
  Button,
  ButtonProps,
  colors,
  Container,
  Grid,
  IconButton,
  Stack,
  styled,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { AiFillTwitterCircle } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { GrMail } from "react-icons/gr";
import {
  BsTelephoneInbound,
  BsFacebook,
  BsMessenger,
  BsClockHistory,
  BsFillCalendarXFill,
} from "react-icons/bs";
import Link from "next/link";

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

const ContactComponent = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          height: "300px",
          backgroundImage: "url('contactus-bg.jpg')",
          backgroundSize: "cover",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: isMobile ? "-500px" : "-100px",
            width: "100%",
          }}
        >
          <Container maxWidth={"lg"}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6} lg={4}>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    p: 4,
                    boxShadow: "#3eb2db 5px 5px 5px 0px",
                    borderRadius: "4px",
                    height: "210px",
                  }}
                >
                  <Typography variant="h6">Singapore</Typography>
                  <Box
                    sx={{ display: "flex", gap: 2, alignItems: "start", pt: 2 }}
                  >
                    <GoLocation
                      style={{ fontSize: 24, color: colors.blue[500] }}
                    />
                    <Typography sx={{ fontSize: 14 }}>
                      21, Bukit Batok Crescent, #22-78, WCEGA Tower, S 658 065
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", gap: 2, alignItems: "start", pt: 2 }}
                  >
                    <BsTelephoneInbound
                      style={{ fontSize: 24, color: colors.blue[500] }}
                    />
                    <Typography sx={{ fontSize: 14 }}>
                      (65) 6336 4548
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    p: 4,
                    boxShadow: "#3eb2db 5px 5px 5px 0px",
                    borderRadius: "4px",
                    height: "210px",
                  }}
                >
                  <Typography variant="h6">Yangon</Typography>
                  <Box
                    sx={{ display: "flex", gap: 2, alignItems: "start", pt: 2 }}
                  >
                    <GoLocation
                      style={{ fontSize: 24, color: colors.blue[500] }}
                    />
                    <Typography sx={{ fontSize: 14 }}>
                      No.10, Nanthar Street, Ahlone Township, Yangon , Myanmar
                      (Burma).
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", gap: 2, alignItems: "start", pt: 2 }}
                  >
                    <BsTelephoneInbound
                      style={{ fontSize: 24, color: colors.blue[500] }}
                    />
                    <Typography sx={{ fontSize: 14 }}>
                      (09) 96 444 0531, 96 444 0532, 96 444 0535, 964 440 536.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    p: 4,
                    boxShadow: "#3eb2db 5px 5px 5px 0px",
                    borderRadius: "4px",
                    height: "210px",
                  }}
                >
                  <Typography variant="h6">Singapore</Typography>
                  <Box
                    sx={{ display: "flex", gap: 2, alignItems: "start", pt: 2 }}
                  >
                    <GoLocation
                      style={{ fontSize: 24, color: colors.blue[500] }}
                    />
                    <Typography sx={{ fontSize: 14 }}>
                      21, Bukit Batok Crescent, #22-78, WCEGA Tower, S 658 065
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", gap: 2, alignItems: "start", pt: 2 }}
                  >
                    <BsTelephoneInbound
                      style={{ fontSize: 24, color: colors.blue[500] }}
                    />
                    <Typography sx={{ fontSize: 14 }}>
                      (65) 6336 4548
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
      <Box sx={{ mt: isMobile ? "600px" : "130px", pb: 4 }}>
        <Container maxWidth={"lg"}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Box>
              <Typography variant="h6">Loi Heng Contact Information</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
              <Typography variant="h6">Share with: </Typography>
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
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
            </Box>
          </Stack>
          <Grid container sx={{ mt: 6 }} spacing={2}>
            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <Typography variant="h6" sx={{ color: colors.blue[500] }}>
                  Get in Touch
                </Typography>
                <Typography sx={{ color: colors.grey[600] }}>
                  If you know more about the information, contact us !
                </Typography>
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  id="outlined-basic"
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  id="outlined-basic"
                  label="Contact Number"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  id="outlined-basic"
                  label="Subject"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  id="outlined-basic"
                  label="Text Here"
                  multiline
                  rows={5}
                  variant="outlined"
                  fullWidth
                />
                <Button fullWidth variant="contained">
                  Submit
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label="Singpore" {...a11yProps(0)} />
                    <Tab label="Yangon(1)" {...a11yProps(1)} />
                    <Tab label="Mandalay" {...a11yProps(2)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <Box>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31909.854608866877!2d103.74219536715987!3d1.3371638875825897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da106e2359f501%3A0xe711c6cdf0d7a4ad!2sSingapore%20658065!5e0!3m2!1sen!2smm!4v1647421108482!5m2!1sen!2smm"
                      width="100%"
                      height="350px"
                      loading="lazy"
                    ></iframe>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h6" sx={{ color: colors.blue[500] }}>
                        Opening Hour
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          alignItems: "start",
                        }}
                      >
                        <BsClockHistory
                          style={{ fontSize: 24, color: colors.blue[500] }}
                        />
                        <Typography sx={{ fontSize: 14 }}>
                          Monday ~ Saturday: 9:00 AM - 5:30 PM
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          alignItems: "start",
                        }}
                      >
                        <BsFillCalendarXFill
                          style={{ fontSize: 24, color: colors.blue[500] }}
                        />
                        <Typography sx={{ fontSize: 14 }}>
                          Closed on Sunday & Public Holiday
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Box>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.778342319566!2d96.12613621486804!3d16.78769998844059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c1ec88a7610aeb%3A0x2d13e34361457af!2sLoi%20Heng%20International!5e0!3m2!1sen!2smm!4v1647421270384!5m2!1sen!2smm"
                      width="100%"
                      height="350px"
                      loading="lazy"
                    ></iframe>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h6" sx={{ color: colors.blue[500] }}>
                        Opening Hour
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          alignItems: "start",
                        }}
                      >
                        <BsClockHistory
                          style={{ fontSize: 24, color: colors.blue[500] }}
                        />
                        <Typography sx={{ fontSize: 14 }}>
                          Monday ~ Saturday: 9:00 AM - 5:30 PM
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          alignItems: "start",
                        }}
                      >
                        <BsFillCalendarXFill
                          style={{ fontSize: 24, color: colors.blue[500] }}
                        />
                        <Typography sx={{ fontSize: 14 }}>
                          Closed on Sunday & Public Holiday
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <Box>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d925.015430386235!2d96.0857026!3d21.9705941!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30cb6d232ca3110d%3A0x9ca0dd57bb8e02b4!2sLoi%20Heng%20International!5e0!3m2!1sen!2smm!4v1647421194477!5m2!1sen!2smm"
                      width="100%"
                      height="350px"
                      loading="lazy"
                    ></iframe>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h6" sx={{ color: colors.blue[500] }}>
                        Opening Hour
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          alignItems: "start",
                        }}
                      >
                        <BsClockHistory
                          style={{ fontSize: 24, color: colors.blue[500] }}
                        />
                        <Typography sx={{ fontSize: 14 }}>
                          Monday ~ Saturday: 9:00 AM - 5:30 PM
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          alignItems: "start",
                        }}
                      >
                        <BsFillCalendarXFill
                          style={{ fontSize: 24, color: colors.blue[500] }}
                        />
                        <Typography sx={{ fontSize: 14 }}>
                          Closed on Sunday & Public Holiday
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </TabPanel>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

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

export default ContactComponent;