import { useNavigate } from "react-router-dom";
import "../../assert/styles/login/Login.scss";
import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import LogInStepTwo from "../navbar/LoginStepTwo"; // Asegúrate de que la ruta sea correcta

// Esquema de validación de email utilizando Yup
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

const Login = () => {
  const [isLoginMenuOpen, setIsLoginMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Maneja el clic en el botón "Back"
  const handleBackClick = () => {
    navigate("/"); // Navegar a la pantalla principal
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // Si la validación es exitosa, abrimos el menú
      setIsLoginMenuOpen(true);
    },
  });

  return (
    <>
      {/* Mostrar el overlay cuando el menú está abierto */}
      <div className={`overlay ${isLoginMenuOpen ? "show" : ""}`} />

      <form
        onSubmit={formik.handleSubmit}
        className={`login-form ${isLoginMenuOpen ? "blur-background" : ""}`}
      >
        <>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/TheHomeDepot.svg/1280px-TheHomeDepot.svg.png"
            alt="Home Depot Logo"
            style={{ width: "80px" }}
            className="rounded mx-auto d-block"
          />
          <br />
          <p className="text-center">
            <b>Enter Your Email Address</b>
          </p>
        </>

        {/* Envolver el "Back" en un div para justificarlo a la izquierda */}
        <div style={{ textAlign: "left", marginBottom: "10px" }}>
          <span
            onClick={handleBackClick}
            className="text-left"
            style={{ cursor: "pointer", color: "#0000FF" }} // Cambiado a azul
          >
            {"< Back "}
          </span>
        </div>

        <p className="text-start">Email Address</p>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email && (
          <p className="text-danger">{formik.errors.email}</p>
        )}
        <br />
        <div className="d-grid gap-2">
          <button className="button-continue" type="submit">
            Continue
          </button>
        </div>
      </form>

      {/* Componente LogInStepTwo con la lógica de cerrar */}
      {isLoginMenuOpen && (
        <LogInStepTwo
          isOpen={isLoginMenuOpen}
          onClose={() => setIsLoginMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Login;
