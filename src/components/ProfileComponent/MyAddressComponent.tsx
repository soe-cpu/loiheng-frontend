import {
  Box,
  Button,
  colors,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  styled,
  Switch,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { BiEdit } from "react-icons/bi";
import { ImBin } from "react-icons/im";
import StyledModalBox from "@common/StyledModalBox";
import addressStore from "@stores/addressStore";
import { useSession } from "next-auth/react";

const MyAddressComponent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [addressType, setAddressType] = React.useState("");
  const [switchState, setswitchState] = useState<boolean>(false);

  const handleChange = (event: SelectChangeEvent) => {
    setAddressType(event.target.value as string);
  };

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const { data: session } = useSession();
  const fetch = addressStore((store) => store.fetch);
  const addressData = addressStore((store) => store.address);
  const addAddress = addressStore((store) => store.addAddress);

  const fullNameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const townshipRef = useRef<HTMLInputElement>(null);
  const regionRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const save = () => {
    const fullname = fullNameRef.current?.value;
    const street_address = addressRef.current?.value;
    const city = cityRef.current?.value;
    const township = townshipRef.current?.value;
    const region = regionRef.current?.value;
    const phone = phoneRef.current?.value;
    const address_type = addressType;
    const is_default = switchState;

    if (session) {
      addAddress(
        session,
        fullname,
        phone,
        city,
        township,
        region,
        address_type,
        street_address,
        is_default
      );
    } else {
      console.log("something wrong");
    }
    // console.log(session?.token);
  };

  React.useEffect(() => {
    if (session) {
      fetch(session);
    }
  }, [session, fetch]);

  return (
    <Box
      sx={{
        border: `1px solid ${colors.grey[300]}`,
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ p: 2 }}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <LocationOnOutlinedIcon />
          <Typography variant="h6"> My Addresses</Typography>
        </Stack>
        <Button
          variant="contained"
          sx={{
            backgroundColor: colors.blue[500],
            color: "#fff",
            boxShadow: "0px 0px 0px #fff",
            "&:hover": {
              backgroundColor: colors.blue[600],
            },
          }}
          onClick={handleOpen}
        >
          Add Address
        </Button>
        {/* Note Modal start */}
        <StyledModalBox open={open} handleClose={handleOpen}>
          <Box
            sx={{
              width: isMobile ? 340 : 550,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Stack>
              <Typography variant="h6">Address adding</Typography>
              <Typography variant="caption">
                Set as default address?{" "}
                <Switch
                  {...label}
                  value={switchState}
                  onClick={() => setswitchState(!switchState)}
                />
              </Typography>
            </Stack>
            <Divider />
            <Stack spacing={2}>
              <TextField
                type={"text"}
                id="outlined-basic"
                label="Name"
                variant="outlined"
                inputRef={fullNameRef}
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Address Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={addressType}
                  label="Address Type"
                  onChange={handleChange}
                >
                  <MenuItem value={1}>Home</MenuItem>
                  <MenuItem value={2}>Work</MenuItem>
                  <MenuItem value={3}>Address 1</MenuItem>
                  <MenuItem value={4}>Address 2</MenuItem>
                  <MenuItem value={5}>Address 3</MenuItem>
                </Select>
              </FormControl>
              <TextField
                type={"text"}
                id="outlined-basic"
                label="Address"
                variant="outlined"
                inputRef={addressRef}
              />
              <Stack direction={"row"} spacing={2}>
                <TextField
                  type={"text"}
                  id="outlined-basic"
                  label="Region"
                  variant="outlined"
                  inputRef={regionRef}
                />
                <TextField
                  type={"text"}
                  id="outlined-basic"
                  label="City"
                  variant="outlined"
                  inputRef={cityRef}
                />
                <TextField
                  type={"text"}
                  id="outlined-basic"
                  label="Township"
                  variant="outlined"
                  inputRef={townshipRef}
                />
              </Stack>
              <TextField
                type={"text"}
                id="outlined-basic"
                label="Phone"
                variant="outlined"
                inputRef={phoneRef}
              />
            </Stack>
            <Divider />
            <Stack direction={"row"} spacing={2} justifyContent={"end"}>
              <Button
                variant="contained"
                color="error"
                onClick={handleClose}
                sx={{ boxShadow: "0px 0px 0px #fff" }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{
                  color: "#fff",
                  backgroundColor: theme.palette.primary.main,
                  boxShadow: "0px 0px 0px #fff",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.main,
                  },
                }}
                onClick={save}
              >
                Save
              </Button>
            </Stack>
          </Box>
        </StyledModalBox>
        {/* Note Modal end */}
      </Stack>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {addressData?.map((add, index) => {
            return (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Box sx={{ border: `1px solid ${colors.grey[300]}` }}>
                  <Typography sx={{ p: 2 }}>Home</Typography>
                  <Divider />
                  <Box
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    <Typography variant="subtitle2">
                      Name: <StyledSpan>{add.full_name}</StyledSpan>
                    </Typography>
                    <Typography variant="subtitle2">
                      Address Type: <StyledSpan>home</StyledSpan>
                    </Typography>
                    <Typography variant="subtitle2">
                      City: <StyledSpan>{add.city}</StyledSpan>
                    </Typography>
                    <Typography variant="subtitle2">
                      Township: <StyledSpan>{add.township}</StyledSpan>
                    </Typography>
                    <Typography variant="subtitle2">
                      Region: <StyledSpan>{add.region}</StyledSpan>
                    </Typography>
                    <Typography variant="subtitle2">
                      Phone Number: <StyledSpan>{add.phone}</StyledSpan>
                    </Typography>
                  </Box>
                  <Divider />
                  <Box sx={{ p: 2, display: "flex", justifyContent: "end" }}>
                    <Stack direction={"row"} spacing={1}>
                      <Tooltip title={"Edit Address"} arrow placement="top">
                        <IconButton
                          sx={{
                            border: `1px solid ${colors.blue[600]}`,
                            color: colors.blue[600],
                            transition: "0.4s",
                            "&:hover": {
                              backgroundColor: colors.blue[600],
                              color: "#fff",
                            },
                          }}
                        >
                          <BiEdit style={{ fontSize: 16 }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={"Delete Address"} arrow placement="top">
                        <IconButton
                          sx={{
                            border: `1px solid ${colors.red[600]}`,
                            color: colors.red[600],
                            transition: "0.4s",
                            "&:hover": {
                              backgroundColor: colors.red[600],
                              color: "#fff",
                            },
                          }}
                        >
                          <ImBin style={{ fontSize: 16 }} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

const StyledSpan = styled("span")(({ theme }) => ({
  fontSize: 14,
  color: colors.grey[500],
}));

export default MyAddressComponent;
