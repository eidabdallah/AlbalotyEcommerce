import { toast, Zoom } from "react-toastify";
export default function ToastMessage({ message, type }) {
  toast[type](`${message}`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Zoom,
  });
}
