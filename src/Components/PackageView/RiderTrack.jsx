import React from "react";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import { FaMapLocation } from "react-icons/fa6";
import { GoPackageDependents } from "react-icons/go";
import { Person } from "@mui/icons-material";
export default function RiderTrack({ detail, iconColor, title, index }) {
  return (
    <div className="p-2">
      <Card className="flex" variant="elevation" elevation={0}>
        <div className="flex flex-col justify-center items-center">
          <div className="bg-green-600 p-2 rounded-full w-8 h-8 flex items-center justify-center text-white">
            <Typography>{index + 1}</Typography>
          </div>

          <div className="border-l-4 border-green-600  h-32"></div>
        </div>
        <CardContent>
          <div className="flex gap-2">
            <Typography variant="h6" component="div">
              {detail.name}
            </Typography>
          </div>
          <div className="flex gap-2 items-center justify-between">
            <Typography sx={{ fontSize: 18 }} gutterBottom>
              Ariea
            </Typography>

            <Typography
              sx={{ fontSize: 18 }}
              color="text.secondary"
              gutterBottom
            >
              {detail.ariea}
            </Typography>
          </div>
          <div className="flex gap-2 items-center justify-between">
            <Typography sx={{ fontSize: 18 }} gutterBottom>
              Pickup
            </Typography>
            <div className="flex items-center gap-2">
              <Typography
                sx={{ fontSize: 18 }}
                color="text.secondary"
                gutterBottom
              >
                {detail.pickup}
              </Typography>
              <GoPackageDependents style={{ color: iconColor }} />
            </div>
          </div>
        </CardContent>
      </Card>
      <Divider />
    </div>
  );
}
