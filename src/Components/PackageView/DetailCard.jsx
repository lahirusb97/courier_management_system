import {
  LocationOff,
  LocationOn,
  MobileFriendly,
  Person,
} from "@mui/icons-material";
import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

export default function DetailCard({ detail, iconColor, title }) {
  return (
    <div className="md:w-input-max w-screen p-2">
      <Card>
        <CardContent>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <div className="flex gap-2">
            <Person style={{ color: iconColor }} />
            <Typography
              sx={{ fontSize: 18 }}
              color="text.secondary"
              gutterBottom
            >
              {detail.name}
            </Typography>
          </div>
          <div className="flex gap-2">
            <MobileFriendly style={{ color: iconColor }} />

            <Typography
              sx={{ fontSize: 18 }}
              color="text.secondary"
              gutterBottom
            >
              {detail.mobile}
            </Typography>
          </div>
          <div className="flex gap-2">
            <LocationOn style={{ color: iconColor }} />
            <Typography
              sx={{ fontSize: 18 }}
              color="text.secondary"
              gutterBottom
            >
              {detail.address}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
