import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { FaMobileAlt, FaFingerprint, FaKey } from "react-icons/fa";
import "../../assert/styles/navbar/LoginMenu.scss";

const LogInStepThree = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/textLoginThree");
    onClose();
  };

  const iconColor = "#FF6600"; // Define el color del botón (naranja)
  return (
    <div>
      {
        <div className="login-menu-header">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/TheHomeDepot.svg/1280px-TheHomeDepot.svg.png"
            alt="Home Depot Logo"
            style={{ width: "80px" }}
          />
          <h2>Enter Your Password</h2>
        </div>
      }
    </div>
  );
};
export default LogInStepThree;
