"use client";
import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Typography } from "@mui/material";
import EmployeDialog from "./EmployeDialog";

import { collection, doc, getDocs, getFirestore } from "firebase/firestore";

export default function EmployeTable() {
  const [users, setUsers] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setloading(true);
      const querySnapshot = await getDocs(collection(getFirestore(), "user"));
      const usersList = [];
      querySnapshot.forEach((doc) =>
        usersList.push({ ...doc.data(), id: doc.id })
      );

      setUsers(usersList);
      setloading(false);
    };

    getData();
  }, []);
  const columns = useMemo(
    () => [
      {
        accessorKey: "name", //access nested data with dot notation
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 150,
      },
      {
        accessorKey: "mobile", //normal accessorKey
        header: "Mobile",
        size: 200,
      },
      {
        accessorKey: "area", //normal accessorKey
        header: "Ariea",
        size: 200,
      },
      {
        accessorKey: "job_role", //normal accessorKey
        header: "Position",
        size: 200,
        Cell: ({ renderedCellValue, row }) => (
          <Typography variant="body1">
            {renderedCellValue === "admin"
              ? "Manager"
              : renderedCellValue === "branch"
              ? "Branch"
              : "Rider"}
          </Typography>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: users,
  });
  return (
    <div>
      <EmployeDialog />
      <MaterialReactTable table={table} />
    </div>
  );
}
