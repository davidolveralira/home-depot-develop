import React from "react";
import { ChildrenProps } from "../interfaces/childrenElements";
import "../../src/assert/styles/login/LoginLayout.scss";

const RegisterLayout = ({ children }: ChildrenProps) => {

  return (
    <div className="login-layout container-fluid">
      <div className="row">
        <div className="col-sm-3" />
        <div className="col-sm-6">
          <div className="container">{children}</div>
        </div>
        <div className="col-sm-3" />
      </div>
    </div>
  );
};

export default RegisterLayout;
