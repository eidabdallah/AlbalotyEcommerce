import { Outlet } from "react-router-dom";
import CustomNavbar from "../components/shared/Navbar/Navbar.jsx";
import Footer from "../components/shared/Footer/Footer.jsx";
export default function MainLayout() {
  return (
    <>
      <CustomNavbar />
      <Outlet />
      <Footer />
    </>
  );
}
