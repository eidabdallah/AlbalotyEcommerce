import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer/Footer.jsx";
import CustomNavbar from "../components/shared/Navbar/Navbar.jsx";

export default function UserLayout() {
  return (
    <>
      <CustomNavbar />
      <Outlet />
      <Footer />
    </>
  );
}
