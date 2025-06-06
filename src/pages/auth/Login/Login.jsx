import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import logo from "../../../assets/logo/logo.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../../components/shared/InputField/InputField.jsx";
import AlertMessage from "../../../components/shared/Alert/Alert.jsx";
import ToastMessage from "../../../components/shared/ToastMessage/ToastMessage.jsx";
import usePost from "../../../components/hooks/usePost.jsx";

export default function Login() {
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { postData, isLoading, serverError } = usePost(`${import.meta.env.VITE_BURL}/auth/login`);
  const loginUser = async (data) => {
    const res = await postData(data);
    if (res && res.success && res.response?.status === 200) {
      ToastMessage({ message: "Log in Successfully", type: "success" });
      localStorage.setItem("userToken", res.data.token);
      navigate("/user");
    }
  };
  return (
    <div className="text-center px-3">
      <img src={logo} alt="Logo" className="img-fluid w-50 bg-dark rounded-circle mb-3" />
      <h4 className="fw-bold mb-4">SIGN UP</h4>
      <Form onSubmit={handleSubmit(loginUser)}>
        {serverError && <AlertMessage message={serverError} color="warning" />}
        <InputField label="Email" type="email" registerProps={register("email", { required: "Email is required", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net)$/, message: "Must end with .com or .net" } })} error={errors.email} />
        <InputField label="Password" type={showPassword ? "text" : "password"} registerProps={register("password", { required: "Password is required", minLength: { value: 8, message: "Min 8 characters" }, pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, message: "Must include upper, lower, number & symbol" } })} error={errors.password} showToggle isShown={showPassword} onToggle={() => setShowPassword(p => !p)} />
        <div className="text-end mb-3">
          <Link to="/auth/resetPassword" className="text-decoration-none text-black fw-semibold">
            Forgot password?
          </Link>
        </div>
        <Button variant="warning" type="submit" className="w-100 fw-bold" disabled={isLoading}>
          {isLoading ? "Loading..." : "LOGIN"}
        </Button>
      </Form>
    </div>
  );
}
