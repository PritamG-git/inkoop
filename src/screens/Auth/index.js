import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../state/mainContext";
import { userCreate } from "../../utils/api/account";
import "./style.css";
import Loader from "react-loader-spinner";

const AuthPage = ({ history }) => {
  const { state, logIn, setLoading } = useContext(Context);
  const [slider, setSlider] = useState("SignIn");
  const { register, handleSubmit } = useForm();
  const [field, setfield] = useState({ email: "", password: "" });

  const onSubmit = async (data) => {
    setLoading(true);
    const res = await logIn(data);
    setLoading(false);

    if (res.data.token) {
      history.push("/events");
    } else {
      alert("An error occurred. Please try again.");
    }
  };

  const onRegister = async () => {
    console.log("aksjd");
    setLoading(true);
    const res = await userCreate(field);
    setLoading(false);

    if (res.data.message) {
      alert(res.data.message);
    } else if (res.data.errors) {
      alert(res.data.errors);
    } else {
      alert("An error occurred. Please try again.");
    }
  };

  if (state.loading) {
    return <Loader type="Puff" color="#00BFFF" height={100} width={100} />;
  }

  return (
    <div
      className={
        slider === "SignIn" ? "container" : "container right-panel-active"
      }
    >
      <div className="form-container sign-up-container">
        <form>
          <h1>Create Account</h1>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={field.email}
            onChange={(e) => setfield({ ...field, email: e.target.value })}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={field.password}
            onChange={(e) => setfield({ ...field, password: e.target.value })}
          />
          <button className="button" onClick={onRegister}>
            Sign Up
          </button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Sign In</h1>

          <input
            type="email"
            name="email"
            placeholder="Email"
            {...register("email", {
              required: true
            })}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />

          <button className="button" type="submit">
            Sign In
          </button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button
              className="button ghost"
              onClick={() => setSlider("SignIn")}
            >
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hi we Welcome you!</h1>
            <p>Enter your details and start planning with us</p>
            <button
              className="button ghost"
              onClick={() => setSlider("SignUp")}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
