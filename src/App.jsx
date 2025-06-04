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
import ProductDetails from "./pages/user/ProductDetails/ProductDetails.jsx";
import Cart from "./pages/user/Cart/Cart.jsx";
import ProtectedRoute from './components/user/ProtectedRoute.jsx';
import AuthProvider from "./Context/AuthContext.jsx";
export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthProvider isGuest={true}>
        <MainLayout />
      </AuthProvider>,
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
          path: "productDetails/:productId",
          element: <ProductDetails />,
        },
        {
          path: "products",
          element: <Product apiPath={`products`} title={"ALL Product"} />,
        },
        {
          path: "cart",
          element: <ProtectedRoute>
            <Cart />,
          </ProtectedRoute>
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
      element: <AuthProvider isGuest={false}>
        <UserLayout />
      </AuthProvider>,
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
