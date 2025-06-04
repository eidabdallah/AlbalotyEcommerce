import { Navigate } from "react-router-dom";
export default function AuthProtectedRoute() {
  const userToken = localStorage.getItem("userToken");
  if (userToken) {
    return <Navigate to={"/user"} />;
  }
  return children;
}
