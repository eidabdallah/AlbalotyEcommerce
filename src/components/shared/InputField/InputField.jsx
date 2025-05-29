import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function InputField({ label, type, registerProps, error, showToggle, isShown, onToggle }) {
 return (
    <FloatingLabel label={label} className="mb-3 position-relative">
      <Form.Control
        type={showToggle ? (isShown ? "text" : "password") : type}
        {...registerProps}
        isInvalid={!!error}
      />
      <Form.Control.Feedback type="invalid">{error?.message}</Form.Control.Feedback>

      {showToggle && (
        <span
          className="position-absolute top-50 end-0 translate-middle-y me-3"
          onClick={onToggle}
          style={{ cursor: "pointer", zIndex: 2 }}
        >
          {isShown ? <FaEyeSlash /> : <FaEye />}
        </span>
      )}
    </FloatingLabel>
  );
}
