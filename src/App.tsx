import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Home from "./components/home/Home";
import PublicLayout from "./layout/PublicLayout";
import LoginLayout from "./layout/LoginLayout";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import CreateAccount from "./components/Login/CreateAccount";
import LogInStepTwo from "./components/navbar/LoginStepTwo";
import LogInStepThree from "./components/navbar/LogInStepThree";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setEmail } from "./redux/authSlice";
import { AuthState } from "./types/types"; // Importa el tipo AuthState
import RegisterLayout from "./layout/RegisterLayout";
import RegisterAccountBusiness from "./components/Login/RegisterAccountBusiness";
import LoginWithPassword from "./components/Login/LoginWithPassword";
import MyAccount from "./components/profile/MyAccount";
import Profile from "./components/profile/Profile";
import { ProtectedRoute } from "./components/protectedRoute/ProtectedRoute";

function App() {
  const email = useSelector((state: { auth: AuthState }) => state.auth.email); // Tipado del estado
  const dispatch = useDispatch();

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />
        <Route
          path="/login"
          element={
            <LoginLayout>
              <Login />
            </LoginLayout>
          }
        />
        <Route
          path="/register"
          element={
            <LoginLayout>
              <Register
                setEmail={(email: string) => dispatch(setEmail(email))}
              />
            </LoginLayout>
          }
        />
        <Route
          path="/create-account"
          element={
            <LoginLayout>
              <CreateAccount email={email} />
            </LoginLayout>
          }
        />
        <Route
          path="/create-account-business"
          element={
            <RegisterLayout>
              <RegisterAccountBusiness email={email} />
            </RegisterLayout>
          }
        />
       <Route
          path="/textLogin"
          element={
            <LoginLayout>
              <LogInStepTwo isOpen={true} onClose={() => {}} />
            </LoginLayout>
          }
        />
        <Route
          path="/textLoginThree"
          element={
            <LoginLayout>
              <LogInStepThree isOpen={true} onClose={() => {}} />
            </LoginLayout>
          }
        />
        <Route
          path="/login-with-password"
          element={
            <LoginLayout>
              <LoginWithPassword setEmail={email}/>
            </LoginLayout>
          }
        />
        { /* Rutas anidadas de MyAccount */ }
        <Route path="/myaccount" element={
          <ProtectedRoute>
            <PublicLayout>
                <MyAccount />
            </PublicLayout>
          </ProtectedRoute>
        }>
          <Route path="profile" element={<Profile />} />
          <Route path="payments" element={<h1>Payments xD</h1>} />
        </Route>

        {/* Ruta 404 */}
        <Route path="*" element={<h1>404 Not Found</h1>}/>
      </Routes>
    </div>
  );
}

export default App;
