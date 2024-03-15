import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddPackage from "./Pages/addpackage/AddPackage.jsx";
import Login from "./Pages/login/Login.jsx";
import ScanPackage from "./Pages/scan/ScanPackage.jsx";
import { AuthContextprovider } from "./context/AuthContext.jsx";
import { Provider } from "react-redux";
import { store } from "./Redux/store.js";
import RiderProtected from "./routeshandle/RiderProtected.jsx";
import AdminProtected from "./routeshandle/AdminProtected.jsx";
import "./App.css";
import Nav from "./Components/Nav.jsx";
import SnacBar from "./Components/SnacBar.jsx";
import BranchProtected from "./routeshandle/BranchProtected.jsx";
import Coporate from "./Pages/coporate/Coporate.jsx";
import History from "./Pages/history/History.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RiderProtected>
        <Nav />
        <ScanPackage />
      </RiderProtected>
    ),
    errorElement: <div>error</div>,
  },
  {
    path: "/add_package",
    element: (
      <AdminProtected>
        <Nav />
        <AddPackage />
      </AdminProtected>
    ),
    errorElement: <div>error</div>,
  },
  {
    path: "/coporate",
    element: (
      <BranchProtected>
        <Nav />
        <Coporate />
      </BranchProtected>
    ),
    errorElement: <div>error</div>,
  },
  {
    path: "/history",
    element: (
      <BranchProtected>
        <Nav />
        <History />
      </BranchProtected>
    ),
    errorElement: <div>error</div>,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextprovider>
      <Provider store={store}>
        <RouterProvider router={router} />
        <SnacBar />
      </Provider>
    </AuthContextprovider>
  </React.StrictMode>
);
