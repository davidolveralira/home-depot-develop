import React from "react";
import { ChildrenProps } from "../interfaces/childrenElements";
import "../../src/assert/styles/login/LoginLayout.scss";

const LoginLayout = ({ children }: ChildrenProps) => {

  return (
    <div className="login-layout container-fluid text-center">
      {" "}
      <div className="row">
        <div className="col-sm-3" />

        <div className="col-sm-6">
          <br />
          <br />
          <div className="container">{children}</div>
          <br />
          <div className="fs-6">
            By selecting 'Sign In' you are agreeing to the Pro Xtra Terms and
            Conditions, Privacy and Security Statement, Notice of Financial
            Incentive & My Account Terms and Conditions. For Two-Factor
            Authentication, message and data rates may apply.
          </div>
          <br />
        </div>
        <div className="col-sm-3" />
      </div>
    </div>
  );
};

export default LoginLayout;
