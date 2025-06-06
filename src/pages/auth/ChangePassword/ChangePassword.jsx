import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import logo from "../../../assets/logo/logo.png";
import { useState } from "react";
import InputField from "../../../components/shared/InputField/InputField.jsx";
import AlertMessage from "../../../components/shared/Alert/Alert.jsx";
import ToastMessage from "../../../components/shared/ToastMessage/ToastMessage.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
    const token = localStorage.getItem("userToken");
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const newPassword = watch("newPassword");
    const navigate = useNavigate();
    const changePasswordForm = async (data) => {
        setIsLoading(true);
        try {
            const result = await axios.patch(
                `${import.meta.env.VITE_BURL}/auth/changePassword`,
                data,
                {
                    headers: {
                        Authorization: `${import.meta.env.VITE_BRAND_NAME}${token}`,
                    },
                }
            );
            setError(null);
            if (result.status === 200) {
                ToastMessage({ message: "Change Password Successfully", type: "success" });
                navigate('/user')
            }
        } catch (err) {
            setError(err?.response?.data?.message || err?.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="text-center px-3">
            <img src={logo} alt="Logo" className="img-fluid w-50 bg-dark rounded-circle mb-3" />
            <h4 className="fw-bold mb-4">CHANGE PASSWORD</h4>
            <Form onSubmit={handleSubmit(changePasswordForm)}>
                {error && <AlertMessage message={error} color="warning" />}

                <InputField
                    label="Email"
                    type="email"
                    registerProps={register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net)$/,
                            message: "Must end with .com or .net",
                        },
                    })}
                    error={errors.email}
                />

                <InputField
                    label="Old Password"
                    type={showPassword ? "text" : "password"}
                    registerProps={register("oldPassword", {
                        required: "Old password is required",
                        minLength: { value: 8, message: "Min 8 characters" },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                            message: "Must include upper, lower, number & symbol",
                        },
                    })}
                    error={errors.oldPassword}
                    showToggle
                    isShown={showPassword}
                    onToggle={() => setShowPassword(p => !p)}
                />

                <InputField
                    label="New Password"
                    type={showPassword ? "text" : "password"}
                    registerProps={register("newPassword", {
                        required: "New password is required",
                        minLength: { value: 8, message: "Min 8 characters" },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                            message: "Must include upper, lower, number & symbol",
                        },
                    })}
                    error={errors.newPassword}
                    showToggle
                    isShown={showPassword}
                    onToggle={() => setShowPassword(p => !p)}
                />

                <InputField
                    label="Confirm Password"
                    type={showPassword ? "text" : "password"}
                    registerProps={register("confirmPassword", {
                        required: "Confirmation required",
                        validate: value => value === newPassword || "Passwords do not match",
                    })}
                    error={errors.confirmPassword}
                    showToggle
                    isShown={showPassword}
                    onToggle={() => setShowPassword(p => !p)}
                />

                <Button
                    variant="warning"
                    type="submit"
                    className="w-100 fw-bold"
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : "Change Password"}
                </Button>
            </Form>
        </div>
    );
}
