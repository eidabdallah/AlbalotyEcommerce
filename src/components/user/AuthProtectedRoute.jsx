import { Navigate } from "react-router-dom";
export default function AuthProtectedRoute({children}) {
  const userToken = localStorage.getItem("userToken");
  if (userToken) {
    return <Navigate to={"/user"} />;
  }
  return children;
}
