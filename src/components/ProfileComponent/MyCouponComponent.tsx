import {
  Box,
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
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";

const MyCouponComponent = () => {
  return (
    <Box
      sx={{
        border: `1px solid ${colors.grey[300]}`,
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={1} sx={{ p: 2 }}>
        <PercentOutlinedIcon />
        <Typography variant="h6">My Coupon</Typography>
      </Stack>
      <Divider />
      <Box sx={{ p: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Coupon</StyledTableCell>
                <StyledTableCell>Expiry Date</StyledTableCell>
                <StyledTableCell>Total</StyledTableCell>
                <StyledTableCell>Desc</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Test
                </TableCell>
                <TableCell>Hi</TableCell>
                <TableCell>Test</TableCell>
                <TableCell>Test</TableCell>
              </StyledTableRow>
              <StyledTableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Test
                </TableCell>
                <TableCell>Hi</TableCell>
                <TableCell>Test</TableCell>
                <TableCell>Test</TableCell>
              </StyledTableRow>
              <StyledTableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Test
                </TableCell>
                <TableCell>Hi</TableCell>
                <TableCell>Test</TableCell>
                <TableCell>Test</TableCell>
              </StyledTableRow>
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

export default MyCouponComponent;
