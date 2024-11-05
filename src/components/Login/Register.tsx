import React from "react";
import { useNavigate } from "react-router-dom";
import "../../assert/styles/login/Login.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Interfaz para recibir la función setEmail desde el componente superior
interface RegisterProps {
  setEmail: (email: string) => void;
}

// Esquema de validación con yup
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

const Register: React.FC<RegisterProps> = ({ setEmail }) => {
  const navigate = useNavigate();

  // useForm para manejar el formulario con validación de yup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: yupResolver(schema),
  });

  // Función para manejar el envío del formulario
  const handlerSummit = (data: { email: string }) => {
    // Llamar a setEmail para pasar el email al componente superior
    setEmail(data.email);
    // Navegar a CreateAccount
    navigate("/create-account");
  };

  // Función para manejar el clic de retroceso
  const handleBackClick = () => {
    navigate("/"); // Navega a la página principal
  };

  return (
    <form onSubmit={handleSubmit(handlerSummit)}>
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

      <a
        onClick={handleBackClick}
        className="text-left"
        style={{ cursor: "pointer" }}
      >
        {"< Back "}
      </a>
      <br />
      <br />
      <p className="text-start">Email Address</p>
      <input
        type="email"
        className="form-control"
        {...register("email")} // Registro del input de email con react-hook-form
      />
      {/* Mostrar errores de validación */}
      {errors.email && <p className="text-danger">{errors.email.message}</p>}
      <br />
      <div className="d-grid gap-2">
        <button className="button-continue">Continue</button>
      </div>
    </form>
  );
};

export default Register;
