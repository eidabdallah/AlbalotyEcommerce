import { Form, Button, Alert, Spinner, Image } from "react-bootstrap";

export default function ProfileForm({
  formData,
  previewImage,
  submitError,
  submitSuccess,
  isSubmitting,
  handleChange,
  handleSubmit,
}) {
  return (
    <Form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="d-flex justify-content-center mb-4">
        <Image
          src={previewImage}
          roundedCircle
          width={130}
          height={130}
          alt="Profile"
          style={{ objectFit: "cover", border: "2px solid #ffc107" }}
        />
      </div>

      <Form.Group className="mb-3" controlId="userName">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          placeholder="Enter your username"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="phoneNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Enter your phone number"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="address">
        <Form.Label>Address</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter your address"
        />
      </Form.Group>

      <Form.Group controlId="image" className="mb-4">
        <Form.Label>Change Image</Form.Label>
        <Form.Control
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
      </Form.Group>

      {submitError && <Alert variant="danger">{submitError}</Alert>}
      {submitSuccess && <Alert variant="success">{submitSuccess}</Alert>}

      <div className="d-grid">
        <Button variant="warning" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </Form>
  );
}
