import { useNavigate } from "react-router-dom";
import "../../assert/styles/login/Login.scss";
import { useEffect, useState } from "react";
import PasswordSection from "./PasswordSection";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/authSlice";
import { RegisterForm } from "../../types/login.type";

interface RegisterAccountBusinessProps {
  email: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  password: yup.string().required("Password is required"),

  companyName: yup.string().required("Company name is required"),

  firstName: yup.string().required("First name is required"),

  lastName: yup.string().required("Last name is required"),

  phone: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits.")
    .required("Phone number is required"),

  companyAddress: yup.string().required("Company address is required"),

  business: yup.string().required("Business is required"),
});

const RegisterAccountBusiness: React.FC<RegisterAccountBusinessProps> = ({
  email,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [passwordStrength, setPasswordStrength] = useState<string>("");

  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: yupResolver(schema),
  });

  // Inicializar el valor de "password" con una cadena vacía
  const passwordValue = watch("password", ""); // Observa y asegura que no sea undefined

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setValue("password", newPassword, { shouldValidate: true });

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

  const registerData = handleSubmit(async (data: RegisterForm) => {
    try {
      const response = await dispatch(
        registerUser({
          email: data.email,
          password: data.password,
          companyName: data.companyName,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          companyAddress: data.companyAddress,
          business: data.business,
        })
      );
      if (response.type !== "auth/loginUser/rejected") {
        alert("Register successfully.");
        navigate("/");
      } else {
        alert("Something unexpected went wrong");
      }
    } catch (error) {
      alert("Error during registration.");
    }
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <form onSubmit={registerData}>
      <div className="form-group text-center">
        <br />
        <img
          src="https://assets.thdstatic.com/single-signin-ui/5.6.0-hotfix/build/7a01f769c027b9d019e6007c19b4f82e.svg"
          alt="Home Depot Logo"
          style={{ width: "200px" }}
        />
        <br />
        <br />
        <h4>
          <b>Create a Pro Xtra Account</b>
        </h4>
        <br />
      </div>
      <div className="row justify-content-center">
        <div className="col-6">
          <div className="form-group">
            <a
              onClick={handleBackClick}
              className="text-left"
              style={{ cursor: "pointer" }}
            >
              {"< Back "}
            </a>
            <br />
            <br />
          </div>
          <div className="form-group">
            <label className="text-start">Email address</label>
            <input
              type="email"
              className="form-control"
              defaultValue={email}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-danger">{errors.email.message}</p>
            )}
            <br />
          </div>
          <div className="form-group">
            <label className="text-start">Password</label>
            <PasswordSection
              password={passwordValue} // Valor inicializado
              passwordStrength={passwordStrength}
              onPasswordChange={handlePasswordChange} // Cambia el valor de la contraseña
              passwordValidations={passwordValidations} // Agregamos esta propiedad que faltaba
            />
            {errors.password && (
              <p className="text-danger">{errors.password.message}</p>
            )}
          </div>
          <div className="form-group">
            <label className="text-start">Company Name</label>
            <input
              type="text"
              className="form-control"
              {...register("companyName")}
            />
            {errors.companyName && (
              <p className="text-danger">{errors.companyName.message}</p>
            )}
            <br />
          </div>
          <div className="form-group">
            <label className="text-start">First Name</label>
            <input
              type="text"
              className="form-control"
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-danger">{errors.firstName.message}</p>
            )}
            <br />
          </div>
          <div className="form-group">
            <label className="text-start">Last Name</label>
            <input
              type="text"
              className="form-control"
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-danger">{errors.lastName.message}</p>
            )}
            <br />
          </div>
          <div className="form-group">
            <label className="text-start">Phone</label>
            <input
              type="text"
              className="form-control"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-danger">{errors.phone.message}</p>
            )}
            <br />
          </div>
          <div className="form-group">
            <label className="text-start">Company Address</label>
            <input
              type="text"
              className="form-control"
              {...register("companyAddress")}
            />
            {errors.companyAddress && (
              <p className="text-danger">{errors.companyAddress.message}</p>
            )}
            <br />
          </div>
          <div className="form-group">
            <a className="text-start">Add an apartment, suite, building etc.</a>
            <br />
            <br />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Business or Trade</label>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              {...register("business")}
            >
              <option value="DEFAULT">Select a Business or Trade</option>
              <option value="CARPENTRY">Carpentry</option>
              <option value="EDU">Education</option>
              <option value="ELECTRICAL">Electrical</option>
            </select>
            <br />
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="check1"
              name="option1"
              value="something"
            />
            <label className="form-check-label">
              <h6>Keep me signed in</h6>
              <span className="form-check-span" style={{ display: "block" }}>
                Uncheck if using a public or shared device
              </span>
            </label>
            <br />
            <br />
          </div>

          <div className="form-group d-grid gap-2">
            <button className="button-continue">Register for Pro Xtra</button>
            <br />
          </div>
          <div>
            <p className="text-center">
              By selecting 'Register for Pro Xtra' you are agreeing to the Pro
              Xtra Terms and Conditions, Privacy and Security Statement, Notice
              of Financial Incentive & My Account Terms and Conditions.
            </p>
          </div>
        </div>

        <div className="col-6">
          <h5>
            <b>Pro Xtra Account Benefits</b>
          </h5>
          <br />
          <p>
            Pro Xtra is The Home Depot’s free loyalty program built just for
            Pros —providing members with exclusive benefits that help them save
            time, save money and get rewarded. Pro Xtra benefits include:
          </p>

          <p>
            <img
              src="https://assets.thdstatic.com/single-signin-ui/5.6.0-hotfix/build/9fddae2d437e611cc7ccdc1c39529070.svg"
              alt="Home Depot Logo 1"
            />
            <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Perks</b>
          </p>
          <p>
            <img
              src="https://assets.thdstatic.com/single-signin-ui/5.6.0-hotfix/build/b8b43f98e35c8a19e548c9bdff2f4321.svg"
              alt="Home Depot Logo 2"
            />
            <b>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Purchase
              Tracking
            </b>
          </p>
          <p>
            <img
              src="https://assets.thdstatic.com/single-signin-ui/5.6.0-hotfix/build/84f267d598cc325d9d5338793b0d7ac1.svg"
              alt="Home Depot Logo 3"
            />
            <b>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Exclusive
              Offers
            </b>
          </p>
        </div>
      </div>
    </form>
  );
};

export default RegisterAccountBusiness;
