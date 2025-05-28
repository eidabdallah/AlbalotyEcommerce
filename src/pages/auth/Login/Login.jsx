import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import logo from "../../../assets/logo/logo.png";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Login() {
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const loginUser = (data) => {
    console.log(data);
  };
  return (
    <div className="text-center px-3">
      <img
        src={logo}
        alt="Logo"
        className="img-fluid w-50 bg-dark rounded-circle mb-3"
      />
      <h4 className="fw-bold mb-4">LOGIN</h4>

      <Form onSubmit={handleSubmit(loginUser)}>
        <FloatingLabel label="Email" className="mb-3">
          <Form.Control
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net)$/,
                message: "Must end with .com or .net",
              },
            })}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel label="Password">
          <Form.Control
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Min 8 characters",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                message: "Must include upper, lower, number & symbol",
              },
            })}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
          <span
            className="position-absolute top-50 end-0 translate-middle-y me-3"
            onClick={() => setShowPassword((prev) => !prev)}
            style={{ cursor: "pointer", zIndex: 2 }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </FloatingLabel>
        <div className="my-3 text-start">
          <Link to={"/auth/forgotPassword"} className="text-decoration-none text-black fw-semibold">Forgot Password? </Link>
        </div>
        <Button variant="warning" type="submit" className="w-100 fw-bold">
          LOGIN
        </Button>
      </Form>
    </div>
  );
}
