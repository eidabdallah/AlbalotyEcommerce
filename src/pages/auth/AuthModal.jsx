import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";

export default function AuthModal({ show, onHide }) {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <div className="d-flex w-100 justify-content-evenly">
          <Button variant={activeTab === "login" ? "warning" : "outline-warning"} onClick={() => setActiveTab("login")}>Login</Button>
          <Button variant={activeTab === "register" ? "warning" : "outline-warning"} onClick={() => setActiveTab("register")}>Register</Button>
        </div>
      </Modal.Header>
      <Modal.Body>
        {activeTab === "login" ? <Login /> : <Register />}
      </Modal.Body>
    </Modal>
  );
}
