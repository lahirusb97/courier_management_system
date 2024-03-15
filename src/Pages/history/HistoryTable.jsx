"use client";
import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, IconButton, Typography } from "@mui/material";

import dayjs from "dayjs";
import { Delete, ViewColumn } from "@mui/icons-material";
import DetailCard from "../../Components/PackageView/DetailCard";
import PackageView from "../scan/PackageView";
import Package from "./Package";

export default function HistoryTable({ packageData }) {
  const columns = useMemo(
    () => [
      {
        accessorKey: "package_id", //access nested data with dot notation
        header: "#Package ID",
        size: 50,
      },
      {
        accessorKey: "state", //normal accessorKey
        header: "Process",
        Cell: ({ renderedCellValue, row }) => (
          <Typography
            color={renderedCellValue === "pending" ? "orange" : "green"}
            fontWeight={600}
            className="capitalize"
          >
            {renderedCellValue}
          </Typography>
        ),
      },
      {
        accessorKey: "date", //access nested data with dot notation
        header: "Time",

        Cell: ({ renderedCellValue, row }) => (
          <Typography variant="subtitle1">
            {dayjs(renderedCellValue.toDate()).format("hh:mm A")}
          </Typography>
        ),
      },
      {
        accessorKey: "cod",
        header: "Delivery Type",

        Cell: ({ renderedCellValue, row }) => (
          <Typography
            variant="subtitle1"
            fontWeight={600}
            color={renderedCellValue ? "red" : "green"}
          >
            {renderedCellValue ? "COD" : "Cash"}
          </Typography>
        ),
      },
      {
        accessorKey: "weight", //normal accessorKey
        header: "Weight",
        Cell: ({ renderedCellValue, row }) => (
          <Typography>{renderedCellValue}Kg</Typography>
        ),
      },
      {
        accessorKey: "rate", //normal accessorKey
        header: "Delivery Rate",
        Cell: ({ renderedCellValue, row }) => (
          <Typography>Rs.{renderedCellValue}</Typography>
        ),
      },

      {
        accessorKey: "package_price", //normal accessorKey
        header: "Package Price",
        Cell: ({ renderedCellValue, row }) => (
          <Typography>Rs.{renderedCellValue}</Typography>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    state: {
      showSkeletons: false,
    },
    enableRowActions: true,
    data: packageData || [],
    muiExpandButtonProps: ({ row, table }) => ({
      onClick: () => {
        table.setExpanded({ [row.id]: !row.getIsExpanded() });
      }, //only 1 detail panel open at a time
    }),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <IconButton color="error" onClick={() => {}}>
          <Delete />
        </IconButton>
      </Box>
    ),
    renderDetailPanel: ({ row }) => (
      <div>
        <Typography variant="h6">
          Package ID: {row.getValue("package_id")}
        </Typography>

        <div className="flex flex-wrap">
          <Package packageDetail={row.original} />
        </div>
      </div>
    ),
  });

  return (
    <div>
      <MaterialReactTable table={table} />
    </div>
  );
}
