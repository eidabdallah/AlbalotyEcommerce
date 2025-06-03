import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout.jsx";
import DashboardLayout from "./layout/DashboardLayout.jsx";
import UserLayout from "./layout/UserLayout.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import Home from "./pages/user/Home/Home.jsx";
import ForgetPassword from "./pages/auth/ForgetPassword/ForgetPassword.jsx";
import { ToastContainer } from "react-toastify";
import SubCategoryWithProducts from "./pages/user/SubCategoryWithProducts/SubCategoryWithProducts.jsx";
import Product from "./components/user/Products/Product/Product.jsx";
import SubCategoryDetails from "./components/user/CategorySection/SubCategoryDetails/SubCategoryDetails.jsx";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "category/:categoryId",
          element: <SubCategoryWithProducts />,
        },
         {
          path: "subCategoryProducts/:subCategoryId",
          element: <SubCategoryDetails />,
        },
         {
          path: "products",
          element: <Product apiPath={`products`} title={"ALL Product"} />,
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "forgotPassword",
          element: <ForgetPassword />,
        },
      ],
    },
    {
      path: "/user",
      element: <UserLayout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
    },
  ]);
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}
