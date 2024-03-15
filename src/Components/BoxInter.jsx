import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

export default function BoxInter({ control, errors }) {
  return (
    <div className="flex flex-col gap-4">
      <Controller
        name="tracking_id"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="text"
            defaultValue=""
            label="Tracking Number"
            fullWidth
            error={errors.tracking_id ? true : false}
            helperText={errors.tracking_id && errors.tracking_id.message}
          />
        )}
      />
      <Controller
        name="zip_code"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="number"
            defaultValue=""
            label="Zip Code"
            fullWidth
            error={errors.zip_code ? true : false}
            helperText={errors.zip_code && errors.zip_code.message}
          />
        )}
      />
      <Controller
        name="country"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="text"
            defaultValue=""
            label="Country"
            fullWidth
            error={errors.country ? true : false}
            helperText={errors.country && errors.country.message}
          />
        )}
      />
      <Controller
        name="city"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="text"
            defaultValue=""
            label="City"
            fullWidth
            error={errors.city ? true : false}
            helperText={errors.city && errors.city.message}
          />
        )}
      />
    </div>
  );
}
