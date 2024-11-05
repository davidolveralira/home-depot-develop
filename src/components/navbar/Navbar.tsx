import React, { useState } from "react";
import {
  Container,
  Nav,
  Navbar,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import "../../assert/styles/navbar/NavBar.scss"; // Estilos personalizados para la barra de navegación
import "bootstrap/dist/css/bootstrap.min.css"; // Importa los estilos de Bootstrap
import "bootstrap-icons/font/bootstrap-icons.scss"; // Importa los íconos de Bootstrap
import LoginMenu from "./LoginMenu"; // Importa el componente del menú de inicio de sesión
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

// Define la interfaz de las props que el componente NavBar puede recibir
interface NavBarProps {
  onLoginClick?: () => void; // Propiedad opcional para manejar el evento de clic en "Log In"
}

const NavBar: React.FC<NavBarProps> = ({ onLoginClick }) => {
  // Estado para controlar si el menú de inicio de sesión está abierto o cerrado
  const [isLoginMenuOpen, setLoginMenuOpen] = useState(false);

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  // Función para manejar el clic en el botón "Log In"
  const handleLoginClick = () => {
    setLoginMenuOpen(!isLoginMenuOpen); // Cambia el estado de visibilidad del menú de inicio de sesión
  };

  return (
    <>
      {/* Overlay para el fondo gris cuando el menú está abierto */}
      <div
        className={`overlay ${isLoginMenuOpen ? "active" : ""}`}
        onClick={handleLoginClick} // Cierra el menú de inicio de sesión al hacer clic en el fondo
      ></div>

      {/* Barra superior con un enlace promocional */}
      <div className="top-bar">
        <a href="https://example.com" className="top-bar-link">
          SAVE UP TO $100 TODAY* ON QUALIFYING PURCHASES When You Open a New
          Credit Card. Ends 1/29/2025.
        </a>
      </div>

      {/* Contenedor de la barra de navegación y la línea inferior */}
      <div className="navbar-wrapper">
        <Navbar bg="white" expand="lg" id="nav-bar">
          <Container
            fluid
            className="d-flex justify-content-start align-items-center px-4"
          >
            {/* Logo */}
            <Navbar.Brand
              href="https://example.com"
              className="d-flex align-items-center"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/TheHomeDepot.svg/1280px-TheHomeDepot.svg.png"
                alt="Home Depot Logo"
                style={{ width: "80px" }}
              />
            </Navbar.Brand>

            {/* Botón para alternar la visibilidad del menú en la vista móvil */}
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
              {/* Contenedor para agrupar los enlaces y la barra de búsqueda */}
              <div className="d-flex justify-content-center align-items-center w-100">
                <Nav className="align-items-center me-3">
                  {/* Información de la tienda */}
                  <Nav.Link
                    href="https://example.com"
                    className="d-flex align-items-center text-dark"
                  >
                    <span className="icon-wrapper">
                      <i className="bi bi-house-door me-2"></i>
                    </span>
                    Mission
                  </Nav.Link>
                  <Nav.Link
                    href="https://example.com"
                    className="d-flex align-items-center text-success"
                  >
                    <span style={{ fontWeight: "bold" }}>10PM</span>
                  </Nav.Link>
                  <Nav.Link
                    href="https://example.com"
                    className="d-flex align-items-center text-dark"
                  >
                    <i className="bi bi-truck me-2"></i> 78572
                  </Nav.Link>
                </Nav>

                {/* Barra de búsqueda */}
                <Form className="d-flex align-items-center">
                  <FormControl
                    type="search"
                    placeholder="What can we help you find today?"
                    className="me-2 search-input"
                    aria-label="Search"
                  />
                  <Button variant="outline-secondary" className="search-button">
                    <i className="bi bi-search"></i>
                  </Button>
                </Form>

                {/* Enlaces de navegación con íconos en la parte superior */}
                <Nav className="align-items-center ms-3">
                  <Nav.Link
                    href="https://example.com"
                    className="text-dark d-flex flex-column align-items-center"
                  >
                    <i className="bi bi-bag mb-1"></i>
                    <span>Shop All</span>
                  </Nav.Link>
                  <Nav.Link
                    href="https://example.com"
                    className="text-dark d-flex flex-column align-items-center"
                  >
                    <i className="bi bi-tools mb-1"></i>
                    <span>Services</span>
                  </Nav.Link>
                  <Nav.Link
                    href="https://example.com"
                    className="text-dark d-flex flex-column align-items-center"
                  >
                    <i className="bi bi-hammer mb-1"></i>
                    <span>DIY</span>
                  </Nav.Link>
                  <Nav.Link
                    href="#"
                    className="text-dark d-flex flex-column align-items-center"
                    onClick={handleLoginClick} // Abre o cierra el menú de inicio de sesión
                  >
                    <i className="bi bi-person mb-1"></i>
                    <span>{ isAuthenticated?"Me": "Log In" }</span>
                  </Nav.Link>
                  <Nav.Link
                    href="https://example.com"
                    className="text-dark d-flex flex-column align-items-center"
                  >
                    <i className="bi bi-cart mb-1"></i>
                    <span>Cart</span>
                  </Nav.Link>
                </Nav>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {/* Línea gris debajo de la barra de navegación */}
        <div className="navbar-bottom-line"></div>
      </div>

      {/* Menú de inicio de sesión */}
      <LoginMenu isOpen={isLoginMenuOpen} onClose={handleLoginClick} />
    </>
  );
};

export default NavBar;