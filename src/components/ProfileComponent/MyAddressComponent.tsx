import {
  Box,
  Button,
  colors,
  Divider,
  Grid,
  IconButton,
  Stack,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { BiEdit } from "react-icons/bi";
import { ImBin } from "react-icons/im";

const MyAddressComponent = () => {
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
        >
          Add Address
        </Button>
      </Stack>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={4}>
            <Box sx={{ border: `1px solid ${colors.grey[300]}` }}>
              <Typography sx={{ p: 2 }}>Home</Typography>
              <Divider />
              <Box
                sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1 }}
              >
                <Typography variant="subtitle2">
                  Name: <StyledSpan>Mg Mg</StyledSpan>
                </Typography>
                <Typography variant="subtitle2">
                  Address Type: <StyledSpan>home</StyledSpan>
                </Typography>
                <Typography variant="subtitle2">
                  City: <StyledSpan>Yangon</StyledSpan>
                </Typography>
                <Typography variant="subtitle2">
                  Township: <StyledSpan>Yangon</StyledSpan>
                </Typography>
                <Typography variant="subtitle2">
                  Region: <StyledSpan>Yangon</StyledSpan>
                </Typography>
                <Typography variant="subtitle2">
                  Phone Number: <StyledSpan>Yangon</StyledSpan>
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
