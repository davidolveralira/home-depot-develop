import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/authSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface LoginWithPasswordProps {
  setEmail: string;
}

const schema = yup.object().shape({
  password: yup.string().required("Password is required"),
});

const LoginWithPassword: React.FC<LoginWithPasswordProps> = ({setEmail}) => {

  setEmail = "test@gmail.com"; // user hardcode
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ password: string }>({
    resolver: yupResolver(schema),
  });

  const loginData = handleSubmit(async (data: { password: string }) => {

    try {
      const response = await dispatch(
        loginUser({
          email: setEmail,
          password: data.password,
        })
      );
      if (response.type !== "auth/loginUser/rejected") {
        alert("User login successfully.");
        navigate("/");
      } else {
        alert("Some unexpected goes wrong");
      }
    } catch (error) {
      alert("Error from Login.");
    }
  });

  const handleBackClick = () => {
    navigate("/login");
  };

  useEffect(() => {
    if (isAuthenticated) {
      console.log("Already Login!!");
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <form onSubmit={loginData}>
        <>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/TheHomeDepot.svg/1280px-TheHomeDepot.svg.png"
            alt="Home Depot Logo"
            style={{ width: "80px" }}
            className="rounded mx-auto d-block"
          />
          <br></br>
          <p className="text-center">
            <b>Enter Your Email Address</b>
          </p>
          <br></br>
          <p className="text-center">Email:</p>
          <p className="text-center"><b>{setEmail}</b></p>

        </>

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
          <p className="text-start">Enter Your Password</p>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>

        <div className="text-end form-group">
          <p style={{color:"#4790fd"}}>
            Forgot your password?
          </p>
        </div>

        <div className="text-start form-check">
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

        <div className="d-grid gap-2">
          <button className="button-continue">
            Sign In
          </button>
          <br></br>
        </div>

        <div className="d-grid gap-2">
          <button className="button-cancele" onClick={handleBackClick}>
            <b>Cancele</b>
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginWithPassword;
