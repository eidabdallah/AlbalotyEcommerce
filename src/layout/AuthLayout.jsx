import CustomNavbar from "./../components/user/Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
      <CustomNavbar />
      <Outlet />
    </>
  );
}
