import { Navigate } from "react-router-dom";
import ToastMessage from "../shared/ToastMessage/ToastMessage.jsx";

export default function ProtectedRoute({ children }) {
  const userToken = localStorage.getItem("userToken");

  if (!userToken) {
    ToastMessage({ message: "Please log in to access this page.", type: "error" });
    return <Navigate to={"/"}  replace/>;
  }
  return children;
}
