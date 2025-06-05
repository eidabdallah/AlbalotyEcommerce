import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo from "../../../assets/logo/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../../../components/shared/Alert/Alert.jsx";
import ToastMessage from "../../../components/shared/ToastMessage/ToastMessage.jsx";
import usePost from "../../../components/hooks/usePost.jsx";
import InputField from "../../../components/shared/InputField/InputField.jsx";

export default function Register() {
  const { register, handleSubmit, watch, formState: { errors },reset } = useForm();
  const password = watch("password");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const { postData, isLoading, serverError } = usePost(`${import.meta.env.VITE_BURL}/auth/register`);
  const registerForm = async (data) => {
    const res = await postData(data);
    if (res && res.success && res.response?.status === 201) {
      reset();
      ToastMessage({ message: "You're registered! Verify your email, then log in", type: "success", });
      navigate("/");
    }
  };
  return (
    <div className="text-center px-3">
      <img src={logo} alt="Logo" className="img-fluid w-50 bg-dark rounded-circle mb-3" />
      <h4 className="fw-bold mb-4">SIGN UP</h4>
      <Form onSubmit={handleSubmit(registerForm)}>
        {serverError && <AlertMessage message={serverError} color="warning" />}
        <InputField label="User Name" type="text" registerProps={register("userName", { required: "Username is required", pattern: { value: /^[A-Za-z\s]+$/, message: "Only letters and spaces" }, minLength: { value: 3, message: "Minimum 3 characters" } })} error={errors.userName} />
        <InputField label="Email" type="email" registerProps={register("email", { required: "Email is required", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net)$/, message: "Must end with .com or .net" } })} error={errors.email} />
        <Row className="mb-3">
          <Col xs={6}>
            <InputField label="Phone Number" type="tel" registerProps={register("phoneNumber", { required: "Phone number is required", pattern: { value: /^\d{10}$/, message: "Must be 10 digits" } })} error={errors.phoneNumber} />
          </Col>
          <Col xs={6}>
            <InputField label="Address" type="text" registerProps={register("address", { required: "Address is required", minLength: { value: 2, message: "Minimum 2 characters" } })} error={errors.address} />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={6}>
            <InputField label="Password" type={showPassword ? "text" : "password"} registerProps={register("password", { required: "Password is required", minLength: { value: 8, message: "Min 8 characters" }, pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, message: "Must include upper, lower, number & symbol" } })} error={errors.password} showToggle isShown={showPassword} onToggle={() => setShowPassword(p => !p)} />
          </Col>
          <Col xs={6}>
            <InputField label="Confirm Password" type={showConfirm ? "text" : "password"} registerProps={register("confirmPassword", { required: "Confirmation required", validate: value => value === password || "Passwords do not match" })} error={errors.confirmPassword} showToggle isShown={showConfirm} onToggle={() => setShowConfirm(p => !p)} />
          </Col>
        </Row>
        <Button variant="warning" type="submit" className="w-100 fw-bold" disabled={isLoading}        >
          {isLoading ? "Loading..." : "REGISTER"}
        </Button>
      </Form>
    </div>
  );
}
