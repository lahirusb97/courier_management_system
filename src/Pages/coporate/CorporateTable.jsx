import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, IconButton } from "@mui/material";
import CopPayHistoryTable from "./CopPayHistoryTable";
import { Analytics, Edit, Report } from "@mui/icons-material";
import ReportDialog from "./ReportDialog";
import UpdateCop from "./UpdateCop";
import { useSelector } from "react-redux";
import { UserAuth } from "../../context/AuthContext";

export default function CorporateTable() {
  const [open, setOpen] = useState(false);
  const [openCopEdit, setOpenCopEdit] = useState(false);
  const [updateID, setUpdateID] = useState("");
  const [ID, setID] = useState("");

  const { copArray } = UserAuth();

  // open Report
  const openUpdate = () => {
    setOpenCopEdit(true);
  };

  const openUpdateClose = () => {
    setOpenCopEdit(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // open Report
  const columns = useMemo(
    () => [
      {
        accessorKey: "name", //access nested data with dot notation
        header: "Name",
        size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: copArray || [],
    state: {
      showSkeletons: false,
    },
    enableRowActions: true,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <IconButton
          color="error"
          onClick={() => {
            handleClickOpen();
            setID(row.original.cop_id);
          }}
        >
          <Analytics />
        </IconButton>

        <IconButton
          onClick={() => {
            setUpdateID(row.original.cop_id);
            openUpdate();
          }}
        >
          <Edit />
        </IconButton>
      </Box>
    ),
  });

  return (
    <div>
      <ReportDialog
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
        ID={ID}
      />
      <UpdateCop
        ID={updateID}
        openCopEdit={openCopEdit}
        openUpdateClose={openUpdateClose}
      />

      <MaterialReactTable table={table} />
    </div>
  );
}
