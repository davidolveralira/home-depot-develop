import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { FaMobileAlt, FaFingerprint, FaKey } from "react-icons/fa";
import "../../assert/styles/navbar/LoginMenu.scss";

const LogInStepTwo = ({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/textLoginTwo");
    onClose();
  };

  const LoginWithPassword = () => {
    navigate("/login-with-password");
  };

  return (
    <div className={`login-menu ${isOpen ? "open" : ""}`}>
      <div className="login-menu-header">
        <h2>Signing in just got easier</h2>
        <button className="button-continue" onClick={LoginWithPassword}>
          X
        </button>
      </div>
      <div className="d-flex justify-content-center my-2">
        <FaMobileAlt size={50} className="mx-2" style={{ color: "#FF6600" }} />
        <FaFingerprint
          size={50}
          className="mx-2"
          style={{ color: "#FF6600" }}
        />
        <FaKey size={50} className="mx-2" style={{ color: "#FF6600" }} />
      </div>
      <div className="login-buttons">
        <button
          className="sign-in-button"
          onClick={handleSignInClick}
          style={{ backgroundColor: "#FF6600", color: "#fff" }}
        >
          Text me a code to sign in <FaMobileAlt />
        </button>
      </div>
      <div className="email-section">
        <Form>
          <Form.Group controlId="formEmailCode">
            <Form.Control
              type="text"
              placeholder="Email me a code to sign in"
            />
          </Form.Group>
        </Form>
        <div className="d-flex justify-content-center">
          <Button variant="link" className="text-decoration-none mt-3">
            What is this?
          </Button>
        </div>
        <br />
        <div className="d-flex justify-content-center">
          <Button
            variant="link"
            className="text-decoration-none mt-3 text-black"
          >
            No Thanks
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogInStepTwo;
