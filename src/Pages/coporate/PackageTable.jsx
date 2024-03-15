"use client";
import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Typography } from "@mui/material";

import dayjs from "dayjs";
import DetailCard from "../../Components/PackageView/DetailCard";

export default function PackageTable({ packageData }) {
  const columns = useMemo(
    () => [
      {
        accessorKey: "package_id", //access nested data with dot notation
        header: "#Package ID",
        size: 50,
      },
      {
        accessorKey: "date", //access nested data with dot notation
        header: "Date",

        Cell: ({ renderedCellValue, row }) => (
          <Typography variant="subtitle1">
            {dayjs(renderedCellValue.toDate()).format("YYYY-MM-DD / hh:mm A")}
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
        accessorKey: "rate", //normal accessorKey
        header: "Rate",
        Cell: ({ renderedCellValue, row }) => (
          <Typography>Rs.{renderedCellValue}</Typography>
        ),
      },
      {
        accessorKey: "weight", //normal accessorKey
        header: "Weight",
        Cell: ({ renderedCellValue, row }) => (
          <Typography>{renderedCellValue}Kg</Typography>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: packageData, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableExpandAll: false,

    renderDetailPanel: ({ row }) => (
      <div>
        <Typography variant="h6">
          Package ID: {row.getValue("package_id")}
        </Typography>
      </div>
    ),
    muiExpandButtonProps: ({ row, table }) => ({
      onClick: () => {
        table.setExpanded({ [row.id]: !row.getIsExpanded() });
      }, //only 1 detail panel open at a time
    }),
  });

  return (
    <div>
      <MaterialReactTable table={table} />
    </div>
  );
}
