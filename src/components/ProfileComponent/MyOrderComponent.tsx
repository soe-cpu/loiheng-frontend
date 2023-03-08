import {
  Box,
  Button,
  Chip,
  colors,
  Divider,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import orderStore from "@stores/order.store";
import moment from "moment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Link from "next/link";

const MyOrderComponent = () => {
  const orders = orderStore((store) => store.orders);
  return (
    <Box>
      <Stack direction={"row"} alignItems={"center"} spacing={1} sx={{ p: 3 }}>
        <ShoppingCartOutlinedIcon />
        <Typography variant="h6">My Orders</Typography>
      </Stack>
      <Divider />
      <Box sx={{ p: 3 }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Order</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Total</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((order, index) => {
                return (
                  <StyledTableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index++}
                    </TableCell>
                    <TableCell>
                      {moment(order.created_at)
                        .startOf("millisecond")
                        .fromNow()}
                    </TableCell>
                    <TableCell>
                      {order.status == "pending" ? (
                        <Chip
                          label={order.status}
                          size="small"
                          color="warning"
                        />
                      ) : order.status == "confirm" ? (
                        <Chip
                          label={order.status}
                          size="small"
                          color="secondary"
                        />
                      ) : order.status == "ontheway" ? (
                        <Chip label={order.status} size="small" color="info" />
                      ) : order.status == "complete" ? (
                        <Chip
                          label={order.status}
                          size="small"
                          color="success"
                        />
                      ) : (
                        ""
                      )}
                    </TableCell>
                    <TableCell>
                      {new Intl.NumberFormat("mm-MM", {
                        style: "currency",
                        currency: "MMK",
                        currencyDisplay: "code",
                      }).format(Number(order.total_price))}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/profile/my-orders/${order.id}`}
                        legacyBehavior
                      >
                        <a style={{ textDecoration: "none" }}>
                          <Button
                            variant="contained"
                            size="small"
                            sx={{
                              boxShadow: 0,
                              "&:hover": {
                                boxShadow: 0,
                              },
                            }}
                            startIcon={<VisibilityIcon />}
                          >
                            View All
                          </Button>
                        </a>
                      </Link>
                    </TableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: colors.blue[500],
    color: theme.palette.common.white,
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
export default MyOrderComponent;
