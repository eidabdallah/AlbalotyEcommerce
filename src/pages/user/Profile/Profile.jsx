import React, { useState, useEffect } from "react";
import useFetch from "../../../components/hooks/useFetch.jsx";
import Loading from "../../../components/shared/Loading/Loading.jsx";
import { Alert, Container, Form, Button, Image, Spinner } from "react-bootstrap";
import axios from "axios";
import ProfileForm from "./ProfileForm.jsx";

const defaultUserImage = "https://cdn-icons-png.flaticon.com/512/1077/1077114.png";

export default function Profile() {
  const token = localStorage.getItem("userToken");
  const { data, isLoading, error } = useFetch(`${import.meta.env.VITE_BURL}/user/userData`, false, { headers: { Authorization: `${import.meta.env.VITE_BRAND_NAME}${token}` } });

  const [formData, setFormData] = useState({ userName: "", phoneNumber: "", address: "", image: null, });

  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  useEffect(() => {
    if (data?.user) {
      setFormData({ userName: data.user.userName || "", phoneNumber: data.user.phoneNumber || "", address: data.user.address || "", image: null, });
      setPreviewImage(data.user.image?.secure_url || defaultUserImage);
    }
  }, [data]);
  if (isLoading) return <Loading />;
  if (error)
    return (
      <Alert variant="danger" className="text-center fw-bold shadow-sm w-25 m-auto my-3">
        ⚠️ Error: {error}{" "}
      </Alert>
    );
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      if (file) {
        setPreviewImage(URL.createObjectURL(file));
      } else {
        setPreviewImage(data.user.image?.secure_url || defaultUserImage);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);
    setIsSubmitting(true);
    try {
      const form = new FormData();
      form.append("userName", formData.userName);
      form.append("phoneNumber", formData.phoneNumber);
      form.append("address", formData.address);
      if (formData.image) {
        form.append("image", formData.image);
      }
      await axios.patch(`${import.meta.env.VITE_BURL}/user`, form, { headers: { Authorization: `${import.meta.env.VITE_BRAND_NAME}${token}`, "Content-Type": "multipart/form-data", }, });
      setSubmitSuccess("Profile updated successfully!");
      setIsSubmitting(false);
    } catch (err) {
      setSubmitError(err?.response?.data?.message || "Failed to update profile.");
      setIsSubmitting(false);
    }
  };

  return (
    <Container style={{ maxWidth: 600 }} className="my-5 p-4 shadow rounded bg-white">
      <h2 className="mb-4 text-center">User Profile</h2>
      <ProfileForm formData={formData} previewImage={previewImage} submitError={submitError} submitSuccess={submitSuccess} isSubmitting={isSubmitting} handleChange={handleChange} handleSubmit={handleSubmit} />
    </Container>
  );
}
