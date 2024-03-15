import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Check, PaidRounded } from "@mui/icons-material";

function createData(name, price) {
  return { name, price };
}

const rows = [
  createData("Delivery Fees", 159),
  createData("Package Price", 237),
  createData("Total Blance", 262),
];

export default function PriceDetail({ packageDetail }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "black" }}>
            <TableCell sx={{ color: "white" }}>Description</TableCell>
            <TableCell sx={{ color: "white" }} align="right">
              Price
            </TableCell>
            <TableCell sx={{ color: "white" }} width={"10%"} align="left">
              Progress
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              Delivery Fees
            </TableCell>
            <TableCell align="right">Rs.{packageDetail.rate}</TableCell>
            <TableCell align="right">
              {packageDetail.rate_cod === true ? (
                <PaidRounded color="error" />
              ) : packageDetail.rate_cod === false ? (
                <Check color="success" />
              ) : (
                "error"
              )}
            </TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              Package Price COD
            </TableCell>
            <TableCell align="right">
              Rs.{packageDetail.package_price}
            </TableCell>
            <TableCell align="right">
              {packageDetail.package_price > 0 ? (
                <PaidRounded color="error" />
              ) : packageDetail.package_price === 0 ? (
                <Check color="success" />
              ) : (
                "error"
              )}
            </TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              Grand Total
            </TableCell>
            <TableCell align="right">
              Rs.{packageDetail.package_price + packageDetail.rate}
            </TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              Blance
            </TableCell>
            <TableCell align="right">
              Rs.
              {packageDetail.package_price +
                (packageDetail.rate_cod ? packageDetail.rate : 0)}
            </TableCell>
          </TableRow>
          {/* {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.price}</TableCell>
              {/* <TableCell align="left">
                <Check />
              </TableCell> 
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
