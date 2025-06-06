import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import AlertMessage from "../../../components/shared/Alert/Alert.jsx";
import ToastMessage from "../../../components/shared/ToastMessage/ToastMessage.jsx";
import axios from "axios";
import InputField from './../../../components/shared/InputField/InputField.jsx';
export default function ForgetPassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [step, setStep] = useState(1);
  const [serverError, setServerError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const email = watch("email");

  const sendCode = async (data) => {
    setIsLoading(true);
    try {
      const res = await axios.patch(`${import.meta.env.VITE_BURL}/auth/sendCode`, {
        email: data.email,
      });
      if (res.status === 200) {
        setStep(2);
        ToastMessage({ message: "Code sent to your email", type: "success" });
      }
      setServerError(null);
    } catch (err) {
      setServerError(err?.response?.data?.message || "Failed to send code");
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (data) => {
    setIsLoading(true);
    try {
      const res = await axios.patch(`${import.meta.env.VITE_BURL}/auth/forgetPassword`, {
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        code: data.code,
      });
      if (res.status === 200) {
        ToastMessage({ message: "Password changed successfully", type: "success" });
      }
    } catch (err) {
      setServerError(err?.response?.data?.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="border p-4 rounded shadow w-100" style={{ maxWidth: "500px" }}>
        <h4 className="text-center fw-bold mb-3">Forgot Password</h4>
        {serverError && <AlertMessage message={serverError} color="danger" />}
        {step === 1 && (
          <Form onSubmit={handleSubmit(sendCode)}>
             <InputField label="Email" type="email" registerProps={register("email", {
                required: "Email is required", pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net)$/,
                  message: "Must end with .com or .net",
                },
              })}
              error={errors.email}
            />
            <Button type="submit" className="w-100 fw-bold" variant="warning" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Code"}
            </Button>
          </Form>
        )}

        {step === 2 && (
          <Form onSubmit={handleSubmit(resetPassword)}>
            <Form.Group className="mb-3">
              <Form.Label>Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter code"
                {...register("code", { required: "Code is required" })}
                isInvalid={!!errors.code}
              />
              <Form.Control.Feedback type="invalid">
                {errors.code?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Min 8 characters" },
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
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                {...register("confirmPassword", {
                  required: "Confirmation required",
                  validate: (val) => val === watch("password") || "Passwords do not match",
                })}
                isInvalid={!!errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <input type="hidden" value={email} {...register("email")} />
            <Button type="submit" className="w-100 fw-bold" variant="warning" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Reset Password"}
            </Button>
          </Form>
        )}
      </div>
    </div>
  );
}
