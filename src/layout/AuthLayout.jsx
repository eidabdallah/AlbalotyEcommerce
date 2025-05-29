import { Outlet } from "react-router-dom";
import CustomNavbar from "../components/shared/Navbar/Navbar.jsx";

export default function AuthLayout() {
  return (
    <>
      <CustomNavbar />
      <Outlet />
    </>
  );
}
