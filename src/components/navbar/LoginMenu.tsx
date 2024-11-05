import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate
import "../../assert/styles/navbar/LoginMenu.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const LoginMenu = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const navigate = useNavigate(); // Inicializa useNavigate para la navegación

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  // Función para manejar el clic en el botón "Sign in"
  const handleSignInClick = () => {
    navigate("/login"); // Redirige al componente de Login
    onClose(); // Cierra el menú
  };

  const handleRegisterClick = () => {
    navigate("/register"); // Redirige al componente de Login
    onClose(); // Cierra el menú
  };

  return (
    <div className={`login-menu ${isOpen ? "open" : ""}`}>
      {!isAuthenticated && (
        <div className="login-menu-header">
          <h2>Sign In or Create an Account</h2>
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>
      )}
      {isAuthenticated && (
        <div className="login-menu-header-after row">
          <p className="col-9">
            <strong>Hello</strong>
          </p>
          <button
            className="close-button-login col-1 text-right"
            onClick={onClose}
          >
            X
          </button>
        </div>
      )}
      {!isAuthenticated && (
        <div className="login-buttons">
          <button className="sign-in-button" onClick={handleSignInClick}>
            Sign in
          </button>
          <button className="register-button" onClick={handleRegisterClick}>
            Register
          </button>
        </div>
      )}
      <div className="pro-section">
        <p>
          <strong>Are You a Pro?</strong>
        </p>
        <p>
          Get online tools to manage and grow your business – plus, Pro Xtra
          Members unlock more benefits and savings.{" "}
          <a href="https://www.homedepot.com/c/pro">Learn More</a>
        </p>
      </div>
      <ul className="menu-list">
        <li>
          <i className="bi bi-box-arrow-in-right"></i> Track Order
        </li>
        <li>
          <i className="bi bi-wallet"></i> Cards & Accounts
        </li>
        <li>
          <i className="bi bi-credit-card"></i> Pay Credit Card Bill
        </li>
        <li>
          <i className="bi bi-award"></i> Military Discount Benefit
        </li>
        <li>
          <Link to="/myaccount/profile" className="link" onClick={() => onClose()}>
            <i className="bi bi-person"></i> Profile
          </Link>
        </li>
        <li>
          <i className="bi bi-heart"></i> Product Lists
        </li>
      </ul>
    </div>
  );
};

export default LoginMenu;
