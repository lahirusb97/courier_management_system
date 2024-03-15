import { Paper, Typography } from "@mui/material";
import React from "react";

export default function InternationalCard({ packageDetail }) {
  return (
    <div>
      <Paper className="flex justify-between items-end p-2 my-2">
        <div className="w-full">
          <div className="flex justify-between">
            <Typography variant="body1" color={"GrayText"} fontWeight={600}>
              Tracking ID
            </Typography>
            <Typography variant="body1">{packageDetail.tracking_id}</Typography>
          </div>
          <div className="flex justify-between">
            <Typography variant="body1" color={"GrayText"} fontWeight={600}>
              Zip Code
            </Typography>
            <Typography variant="body1">
              {packageDetail.reciver.zip_code}
            </Typography>
          </div>

          <div className="flex justify-between">
            <Typography variant="body1" color={"GrayText"} fontWeight={600}>
              Country
            </Typography>
            <Typography variant="body1">
              {packageDetail.reciver.country}
            </Typography>
          </div>

          <div className="flex justify-between">
            <Typography variant="body1" color={"GrayText"} fontWeight={600}>
              City
            </Typography>
            <Typography variant="body1">
              {packageDetail.reciver.city}
            </Typography>
          </div>
        </div>
      </Paper>
    </div>
  );
}
