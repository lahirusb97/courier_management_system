import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch } from "react-redux";
import { Divider, IconButton, Typography } from "@mui/material";
import { openScackbar } from "../Redux/Slice/snackBarSlice";
import { MdClose, MdLogout, MdOutlineQrCodeScanner } from "react-icons/md";
import { LuPackagePlus } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  AdminPanelSettings,
  AppRegistrationTwoTone,
  History,
} from "@mui/icons-material";
import { auth } from "../firebase";
import { UserAuth } from "../context/AuthContext";
export default function Nav() {
  const dispatch = useDispatch();
  let location = useLocation();
  const navigate = useNavigate();

  const [OPEN, setOpen] = React.useState(false);
  const { userData } = UserAuth();

  const toggleDrawer = () => {
    setOpen(!OPEN);
  };

  const navLinkNormal = [
    {
      name: "Scan Package",
      navIcon: <MdOutlineQrCodeScanner />,
      navPath: "/",
      access: ["admin", "branch", "rider"],
    },
    {
      name: "Add Package",
      navIcon: <LuPackagePlus />,
      navPath: "/add_package",
      access: ["admin", "branch"],
    },
    {
      name: "History",
      navIcon: <History />,
      navPath: "/history",
      access: ["admin", "branch"],
    },
  ];
  const navLinkcoporate = [
    {
      name: "Manage Coporate",
      navIcon: <AppRegistrationTwoTone />,
      navPath: "/coporate",
      access: ["admin", "branch"],
    },
  ];
  const navmanage = [
    {
      name: "Manage Employee",
      navIcon: <AdminPanelSettings />,
      navPath: "/arm/employee_manage",
      access: ["admin"],
    },
  ];

  return (
    <div>
      <IconButton color="primary" onClick={toggleDrawer}>
        <GiHamburgerMenu size={24} />
      </IconButton>
      <React.Fragment>
        <Drawer anchor={"left"} open={OPEN} onClose={toggleDrawer}>
          <Box
            role="presentation"
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
            width={250}
          >
            <div className="flex justify-end">
              <IconButton color="primary" onClick={() => closeNav()}>
                <MdClose />
              </IconButton>
            </div>
            <List>
              <Typography sx={{ mx: 1 }} variant="subtitle1">
                Package
              </Typography>
              {navLinkNormal.map(
                (e, index) =>
                  e.access.includes(userData?.job_role) && (
                    <ListItem color="primary" key={e.name} disablePadding>
                      <Link to={e.navPath}>
                        <ListItemButton
                          sx={{
                            width: 250,
                            backgroundColor:
                              location.pathname === e.navPath && "black",
                            color: location.pathname === e.navPath && "white",
                            "&:hover": {
                              backgroundColor:
                                location.pathname === e.navPath && "black", // Set to 'none' or any other value to prevent hover effect
                            },
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              color: location.pathname === e.navPath && "white",
                            }}
                          >
                            {e["navIcon"]}
                          </ListItemIcon>
                          <ListItemText primary={e["name"]} />
                        </ListItemButton>
                      </Link>
                    </ListItem>
                  )
              )}
              <Divider />

              {userData?.job_role !== "rider" ? (
                <Typography sx={{ mx: 1 }} variant="subtitle1">
                  Corporate
                </Typography>
              ) : (
                <></>
              )}
              {navLinkcoporate.map(
                (e, index) =>
                  e.access.includes(userData?.job_role) && (
                    <ListItem color="primary" key={e.name} disablePadding>
                      <Link to={e.navPath}>
                        <ListItemButton
                          sx={{
                            width: 250,
                            backgroundColor:
                              location.pathname === e.navPath && "black",
                            color: location.pathname === e.navPath && "white",
                            "&:hover": {
                              backgroundColor:
                                location.pathname === e.navPath && "black", // Set to 'none' or any other value to prevent hover effect
                            },
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              color: location.pathname === e.navPath && "white",
                            }}
                          >
                            {e["navIcon"]}
                          </ListItemIcon>
                          <ListItemText primary={e["name"]} />
                        </ListItemButton>
                      </Link>
                    </ListItem>
                  )
              )}
              <Divider />

              {/* {value?.job_role === "admin" ? (
                <Typography sx={{ mx: 1 }} variant="subtitle1">
                  Manage ARM Air
                </Typography>
              ) : (
                <></>
              )}

              {navmanage.map(
                (e, index) =>
                  e.access.includes(value?.job_role) && (
                    <ListItem color="primary" key={e.name} disablePadding>
                      <Link to={e.navPath}>
                        <ListItemButton
                          sx={{
                            width: 250,
                            backgroundColor: pathname === e.navPath && "black",
                            color: pathname === e.navPath && "white",
                            "&:hover": {
                              backgroundColor:
                                pathname === e.navPath && "black", // Set to 'none' or any other value to prevent hover effect
                            },
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              color: pathname === e.navPath && "white",
                            }}
                          >
                            {e["navIcon"]}
                          </ListItemIcon>
                          <ListItemText primary={e["name"]} />
                        </ListItemButton>
                      </Link>
                    </ListItem>
                  )
              )}*/}
            </List>
            <List>
              <ListItem
                onClick={async () => {
                  auth
                    .signOut(auth)
                    .then(() => {
                      navigate("/login", { replace: true });

                      dispatch(
                        openScackbar({
                          open: true,
                          type: "success",
                          msg: "Logout success",
                        })
                      );
                    })
                    .catch((error) => {
                      // An error happened.
                      console.log(error);
                    });
                }}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon>
                    <MdLogout />
                  </ListItemIcon>
                  <ListItemText primary={"Sing out"} />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
