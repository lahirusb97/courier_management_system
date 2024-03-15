import {
  CalendarViewDayRounded,
  CalendarViewWeekRounded,
  DatasetSharp,
  DatasetTwoTone,
  LocationOff,
  LocationOn,
  MobileFriendly,
  Person,
} from "@mui/icons-material";
import { Button, Card, CardContent, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import DetailCard from "../../Components/PackageView/DetailCard";
import PriceDetail from "../../Components/PackageView/PriceDetail";
import RiderTrack from "../../Components/PackageView/RiderTrack";
import { TbTruckDelivery } from "react-icons/tb";
import { GiSriLanka } from "react-icons/gi";
import { TiWorld } from "react-icons/ti";
import InternationalCard from "../../Components/PackageView/InternationalCard";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  doc,
  getFirestore,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { openScackbar } from "../../Redux/Slice/snackBarSlice";
import { UserAuth } from "../../context/AuthContext";

export default function Package({ packageDetail }) {
  const [pickupMark, setPickupMark] = useState(false);
  const [deliverMark, setDeliverMark] = useState(false);
  const { userData, loading, copArray } = UserAuth();

  const dispatch = useDispatch();

  const handleDeliveryComplete = async () => {
    try {
      const washingtonRef = doc(
        getFirestore(),
        "package",
        packageDetail.package_id
      );
      await updateDoc(washingtonRef, {
        state: "delivered",
      });
      setDeliverMark(true);
      dispatch(
        openScackbar({
          open: true,
          type: "success",
          msg: "Delivery Completed",
        })
      );
    } catch (err) {
      dispatch(openScackbar({ open: true, type: "error", msg: err.message }));
    }
  };
  return (
    <div className="flex md:flex-row flex-col flex-wrap">
      <div className="flex flex-col md:flex-row lg:flex-col">
        <DetailCard
          detail={packageDetail.sender}
          iconColor={"gray"}
          title={"Sender Details"}
        />
        <DetailCard
          detail={packageDetail.reciver}
          iconColor={"green"}
          title={"Revicer Details"}
        />
      </div>
      <div>
        <div>
          <Paper className="flex justify-between items-end p-2 my-2">
            <div>
              <Typography variant="body1" fontWeight={600} pl={1}>
                {dayjs(packageDetail.date.toDate()).format(
                  "YYYY-MM-DD / hh:mm A"
                )}
              </Typography>
              <Typography
                textTransform={"capitalize"}
                variant="body1"
                fontWeight={600}
                pl={1}
              >
                {packageDetail.cop_id
                  ? copArray
                      .filter((e) => e.cop_id === packageDetail.cop_id)
                      .map((item) => item.name)[0]
                  : "Individual"}
              </Typography>
              <div className="flex">
                {packageDetail.delivery_type === "dom" ? (
                  <GiSriLanka color="gray" size={30} />
                ) : packageDetail.delivery_type === "int" ? (
                  <TiWorld color="gray" size={30} />
                ) : (
                  "system Error contact branch"
                )}
                <Typography fontWeight={600} color={"gray"} variant="h5">
                  {packageDetail.delivery_type === "dom"
                    ? "Domestic"
                    : packageDetail.delivery_type === "int"
                    ? "International"
                    : "system Error contact branch"}
                </Typography>
              </div>
              <div className="flex justify-center items-center">
                <Typography variant="body1" color={"GrayText"} fontWeight={600}>
                  Delivery
                </Typography>
                <Typography
                  sx={{ mx: 1 }}
                  fontWeight={600}
                  color={"red"}
                  variant="h6"
                >
                  {" "}
                  {packageDetail.cod === true
                    ? "COD"
                    : packageDetail.cod === false
                    ? "Cash"
                    : "system Error contact branch"}
                </Typography>
              </div>
            </div>

            <Typography
              fontWeight={600}
              color={
                packageDetail.state === "pending"
                  ? "orange"
                  : packageDetail.state === "delivered"
                  ? "green"
                  : "red"
              }
              variant="h5"
            >
              <TbTruckDelivery scale={100} />{" "}
              {packageDetail.state === "pending"
                ? "Pending"
                : packageDetail.state === "delivered"
                ? "Delivered"
                : "system Error contact branch"}
            </Typography>
          </Paper>

          {packageDetail.delivery_type === "int" && (
            <InternationalCard packageDetail={packageDetail} />
          )}
        </div>
        <PriceDetail packageDetail={packageDetail} />
        <div className="flex justify-between my-2">
          {deliverMark || packageDetail.state === "delivered" ? (
            <></>
          ) : (
            <Button
              onClick={handleDeliveryComplete}
              variant="contained"
              color="success"
            >
              Delivery Complete
            </Button>
          )}
        </div>
      </div>
      <div>
        {Object.keys(packageDetail.tracking ? packageDetail.tracking : {})
          .map((key) => packageDetail.tracking[key])
          .map((e, index) => (
            <div key={`${e.name}${e.ariea}`}>
              <RiderTrack
                index={index}
                detail={{
                  name: e.name,
                  area: e.area,
                  pickup: dayjs(e.date.toDate()).format("YYYY-MM-DD / hh:mm A"),
                }}
                iconColor={"green"}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
