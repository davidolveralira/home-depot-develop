import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import AccountSelection from "./AccountSelection";
import Benefits from "./Benefits";
import PasswordSection from "./PasswordSection";
import PhoneNumberSection from "./PhoneNumberSection";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { registerMyself, loginUser } from "../../redux/authSlice"; // Asegúrate de importar loginUser

// Esquema de validación de teléfono utilizando Yup
const schema = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits.")
    .required("Phone number is required"),
});

interface CreateAccountProps {
  email: string; // Correo electrónico ingresado por el usuario
}

const CreateAccount: React.FC<CreateAccountProps> = ({ email }) => {
  const [selectedAccount, setSelectedAccount] = useState<
    "personal" | "business" | null
  >(null);
  const [password, setPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [keepSignedIn, setKeepSignedIn] = useState<boolean>(true);
  const [passwordStrength, setPasswordStrength] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const passwordSectionRef = useRef<HTMLDivElement | null>(null);
  const phoneNumberSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (selectedAccount === "personal" && passwordSectionRef.current) {
      passwordSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedAccount]);

  useEffect(() => {
    if (passwordStrength === "Excellent" && phoneNumberSectionRef.current) {
      phoneNumberSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [passwordStrength]);

  // Cancelar registro
  const handleCancel = () => {
    navigate("/register");
  };
  // Crear cuenta de negocio
  const handleCreateAccountBusiness = () => {
    navigate("/create-account-business");
  };

  const handleAccountSelection = (account: "personal" | "business") => {
    setSelectedAccount(account);
    setPassword("");
    setPasswordStrength("");
    setPhoneNumber("");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const hasLength = newPassword.length >= 9;
    const hasUppercase = /[A-Z]/.test(newPassword);
    const hasLowercase = /[a-z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);
    const hasSpecialChar = /[!@#$%^&*]/.test(newPassword);

    setPasswordValidations({
      length: hasLength,
      uppercase: hasUppercase,
      lowercase: hasLowercase,
      number: hasNumber,
      specialChar: hasSpecialChar,
    });

    let strength = "";
    if (
      hasLength &&
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSpecialChar
    ) {
      strength = "Excellent";
    } else if (hasLength && (hasUppercase || hasLowercase) && hasNumber) {
      strength = "Medium";
    } else {
      strength = "Poor";
    }
    setPasswordStrength(strength);
  };

  const handleCreateAccount = async () => {
    try {
      const result = await dispatch(
        registerMyself({ email, password, phone: phoneNumber, keepSignedIn })
      );
      if (registerMyself.fulfilled.match(result)) {
        // Si el registro fue exitoso, inicia sesión automáticamente
        const loginResult = await dispatch(loginUser({ email, password }));
        if (loginUser.fulfilled.match(loginResult)) {
          alert("Registration successful! You are now logged in.");
          navigate("/"); // Redirige al dashboard o a la página principal
        } else {
          alert(
            "Registration successful, but login failed. Please login manually."
          );
          navigate("/login");
        }
      } else {
        console.error(result.payload);
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration. Please try again.");
    }
  };

  const handlePhoneNumberChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newPhoneNumber = e.target.value;
    setPhoneNumber(newPhoneNumber);

    try {
      await schema.validate({ phoneNumber: newPhoneNumber });
      setPhoneError(null); // Si pasa la validación, no hay error
    } catch (err) {
      if (err instanceof Error) {
        setPhoneError(err.message); // Muestra el mensaje de error
      }
    }
  };

  return (
    <Container className="create-account-container mt-5">
      <Row className="justify-content-center">
        <Col md={12}>
          <Card className="p-4">
            <Card.Body>
              <Row>
                <Col md={10}>
                  <div className="text-start mb-12">
                    <Button variant="link" onClick={handleCancel}>
                      &lt; Cancel
                    </Button>
                  </div>
                  {/* Logo y título */}
                  <div className="text-center mb-4">
                    <img
                      src="https://assets.thdstatic.com/single-signin-ui/5.6.0-hotfix/build/88241e3103b258328ff0ada4b538c4b6.svg"
                      alt="Logo"
                      className="create-account-logo mb-4"
                      style={{ width: "80px" }}
                    />
                    <h2 className="create-account-title">
                      Create a New Account
                    </h2>
                    <p className="create-account-email-text">using {email}</p>
                  </div>

                  {/* Selección de cuenta */}
                  <AccountSelection
                    selectedAccount={selectedAccount}
                    onSelect={handleAccountSelection}
                  />

                  {/* Beneficios */}
                  {selectedAccount && (
                    <Benefits accountType={selectedAccount} />
                  )}

                  {/* Sección de contraseña (solo para "Myself") */}
                  {selectedAccount === "personal" && (
                    <div ref={passwordSectionRef}>
                      <h5>My password will be</h5>
                      <PasswordSection
                        password={password}
                        passwordStrength={passwordStrength}
                        onPasswordChange={handlePasswordChange}
                        passwordValidations={passwordValidations}
                      />
                    </div>
                  )}

                  {/* Sección de teléfono (solo cuando la contraseña es válida para "Myself") */}
                  {selectedAccount === "personal" &&
                    passwordStrength === "Excellent" && (
                      <div ref={phoneNumberSectionRef}>
                        <PhoneNumberSection
                          phoneNumber={phoneNumber}
                          onPhoneNumberChange={handlePhoneNumberChange}
                          phoneError={phoneError}
                        />

                        {/* Checkbox para mantener la sesión iniciada */}
                        <Form.Group
                          className="create-account-checkbox-section mb-4"
                          controlId="formKeepSignedIn"
                        >
                          <Form.Check
                            type="checkbox"
                            label="Keep me signed in"
                            checked={keepSignedIn}
                            onChange={(e) => setKeepSignedIn(e.target.checked)}
                          />
                        </Form.Group>
                      </div>
                    )}

                  {/* Botón de continuar para "My Business" */}
                  {selectedAccount === "business" && (
                    <div className="text-center">
                      <Button
                        style={{
                          backgroundColor: "#FF6600",
                          borderColor: "#FF6600",
                          width: "100%",
                        }}
                        variant="primary"
                        className="create-account-button"
                        onClick={handleCreateAccountBusiness}
                      >
                        Continue
                      </Button>
                    </div>
                  )}

                  {/* Botón de crear cuenta para "Myself" */}
                  {selectedAccount === "personal" &&
                    passwordStrength === "Excellent" && (
                      <div className="text-center">
                        <Button
                          style={{
                            backgroundColor: "#FF6600",
                            borderColor: "#FF6600",
                            width: "100%",
                          }}
                          variant="primary"
                          className="create-account-button"
                          disabled={!phoneNumber || !!phoneError}
                          onClick={handleCreateAccount}
                        >
                          Create My Account
                        </Button>
                      </div>
                    )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateAccount;
