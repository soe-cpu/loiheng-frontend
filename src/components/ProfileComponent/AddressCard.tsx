import StyledModalBox from "@common/StyledModalBox";
import {
  Box,
  colors,
  Typography,
  Divider,
  Stack,
  Tooltip,
  IconButton,
  Grid,
  styled,
  Button,
  useTheme,
  Chip,
} from "@mui/material";
import addressStore, { Address } from "@stores/addressStore";
import { useSession } from "next-auth/react";
import React from "react";
import toast from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
import { ImBin } from "react-icons/im";

export const AddressCard = (props: Address) => {
  const theme = useTheme();
  const removeAddress = addressStore((store) => store.removeAddress);
  const setAsDefaultAddress = addressStore(
    (store) => store.setAsDefaultAddress
  );

  const { data } = useSession();

  const add = props;
  const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);
  return (
    <Grid item xs={12}>
      <Box
        sx={{
          borderTop: `1px solid ${colors.grey[300]}`,
          p: 2,
        }}
      >
        <Grid container spacing={2} alignItems={"center"}>
          <Grid item xs={2}>
            <Typography sx={{ fontSize: 14 }}>{add.full_name}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ fontSize: 14 }}>
              <Chip
                label={add.address_type}
                color="primary"
                size="small"
                sx={{ fontSize: 11 }}
              />{" "}
              {add.street_address}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ fontSize: 14 }}>
              {add.region} - {add.city} - {add.township}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ fontSize: 14 }}>{add.phone}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Stack direction={"row"} spacing={1}>
                <Tooltip title={"Set As Default Address"} arrow placement="top">
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ fontSize: 12 }}
                    onClick={() => {
                      if (data)
                        setAsDefaultAddress(data, props.id).then(() => {
                          toast.success("Successfully changed!");
                        });
                    }}
                  >
                    Default
                  </Button>
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
                    size="small"
                    onClick={handleOpenDelete}
                  >
                    <ImBin style={{ fontSize: 16 }} />
                  </IconButton>
                </Tooltip>
                {/* Delete Addresss Modal start */}
                <StyledModalBox
                  open={openDelete}
                  handleClose={handleOpenDelete}
                >
                  <Box
                    sx={{
                      width: 350,
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Typography variant="h6">Address Remove Confrim</Typography>
                    <Divider />
                    <Typography>Are you sure you want to delete it?</Typography>
                    <Divider />
                    <Stack direction={"row"} spacing={2} justifyContent={"end"}>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={handleCloseDelete}
                        sx={{ boxShadow: "0px 0px 0px #fff" }}
                      >
                        NO
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
                        onClick={() => {
                          if (data)
                            removeAddress(data, props.id).then(() => {
                              toast.success("Successfully deleted!");
                            });
                        }}
                      >
                        YES
                      </Button>
                    </Stack>
                  </Box>
                </StyledModalBox>
                {/* Delete Addresss Modal end */}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/* <Box sx={{ border: `1px solid ${colors.grey[300]}`, minHeight: "300px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
          }}
        >
          <Typography>{add?.full_name} </Typography>
          {add.is_default == 1 ? (
            <Chip label="Default" size="small" color="primary" />
          ) : (
            ""
          )}
        </Box>

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
        
      </Box> */}
    </Grid>
  );
};

const StyledSpan = styled("span")(({ theme }) => ({
  fontSize: 14,
  color: colors.grey[500],
}));
