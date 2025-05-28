import { Outlet } from "react-router-dom";
import CustomNavbar from "../components/user/Navbar/Navbar.jsx";
export default function MainLayout() {
  return (
    <>
      <CustomNavbar />
      <Outlet />
    </>
  );
}
