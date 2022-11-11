import {
  Box,
  colors,
  Container,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const AddToCartComponent = () => {
  return (
    <Box sx={{ py: 2 }}>
      <Container>
        <Box sx={{ border: `1px solid ${colors.grey[300]}` }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
            <Typography sx={{ fontWeight: 500 }}>Shopping Cart</Typography>
            <Typography>3 items</Typography>
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    display: "flex",
                    gap: { sm: 1, md: 4 },
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <img
                      src="/bg2.png"
                      alt={"Product"}
                      width={"120px"}
                      height={"120px"}
                      style={{ objectFit: "cover" }}
                    />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 12, color: colors.grey[700] }}>
                      Ubiquiti UniFi Cloud Key Gen2 Plus (UCK-G2-PLUS)
                    </Typography>
                    <Typography sx={{ fontSize: 10, color: colors.grey[600] }}>
                      Sold By Ubiquiti
                    </Typography>
                    <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                      Ks 805,980
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Typography
                    sx={{ color: colors.green[800], fontWeight: 600 }}
                  >
                    In Stock
                  </Typography>
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
                        width: "50px",
                        height: "50px",
                        borderRadius: "4px",
                        px: 1,
                      }}
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
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Typography>Ks 805,980</Typography>
                  <Tooltip title={"Remove Item"} arrow placement="top">
                    <IconButton
                      color="error"
                      sx={{
                        border: `1px solid ${colors.red[500]}`,
                        "&:hover": {
                          backgroundColor: colors.red[100],
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AddToCartComponent;
