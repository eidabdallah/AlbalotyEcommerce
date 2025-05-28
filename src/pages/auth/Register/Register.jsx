import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo from "../../../assets/logo/logo.png";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const { register, handleSubmit, watch, formState: { errors },} = useForm();
  const password = watch("password");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const registerForm = (data) => {
    console.log(data);
  };

  return (
    <div className="text-center px-3">
      <img src={logo} alt="Logo" className="img-fluid w-50 bg-dark rounded-circle mb-3"/>
      <h4 className="fw-bold mb-4">SIGN UP</h4>

      <Form onSubmit={handleSubmit(registerForm)}>
        <FloatingLabel label="User Name" className="mb-3">
          <Form.Control
            type="text"
            {...register("userName", {
              required: "Username is required",
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Only letters and spaces",
              },
              minLength: {
                value: 3,
                message: "Minimum 3 characters",
              },
            })}
            isInvalid={!!errors.userName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.userName?.message}
          </Form.Control.Feedback>
        </FloatingLabel>

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

        <FloatingLabel label="Phone Number" className="mb-3">
          <Form.Control
            type="tel"
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^\d{10}$/,
                message: "Must be 10 digits",
              },
            })}
            isInvalid={!!errors.phoneNumber}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phoneNumber?.message}
          </Form.Control.Feedback>
        </FloatingLabel>

        <FloatingLabel label="Address" className="mb-3">
          <Form.Control
            type="text"
            {...register("address", {
              required: "Address is required",
              minLength: {
                value: 2,
                message: "Minimum 2 characters",
              },
            })}
            isInvalid={!!errors.address}
          />
          <Form.Control.Feedback type="invalid">
            {errors.address?.message}
          </Form.Control.Feedback>
        </FloatingLabel>

       <Row className="mb-3">
          <Col xs={6} className="position-relative">
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
          </Col>

          <Col xs={6} className="position-relative">
            <FloatingLabel label="Confirm Password">
              <Form.Control
                type={showConfirm ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Confirmation required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                isInvalid={!!errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword?.message}
              </Form.Control.Feedback>
              <span
                className="position-absolute top-50 end-0 translate-middle-y me-3"
                onClick={() => setShowConfirm((prev) => !prev)}
                style={{ cursor: "pointer", zIndex: 2 }}
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </FloatingLabel>
          </Col>
        </Row>

        <Button variant="warning" type="submit" className="w-100 fw-bold">
          REGISTER
        </Button>
      </Form>
    </div>
  );
}
