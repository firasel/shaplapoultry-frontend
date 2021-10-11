import React from "react";
import { useForm } from "react-hook-form";
import loginVector from "../../images/loginVector.jpg";
import "./Loign.scss";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
      console.log(data);
  }

  return (
    <div className="container">
      <div className="row loginContainer">
        <div className="col-12 col-sm-12 col-md-6 col-lg-7 m-0 p-0 d-flex align-items-center imgColumn">
          <img className="w-100" src={loginVector} alt="login vector" />
        </div>
        <div className="col-12 col-sm-12 col-md-6 col-lg-5 m-0 p-0 d-flex align-items-center">
          <div className="w-100">
            <h2 className="text-center brandName">ShaplaPoultry</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 px-3 px-sm-0 loginForm">
              <input
                type="email"
                className="form-control mx-auto loginInput"
                placeholder="Enter Your Email"
                {...register("email", { required: true })}
              />
              <input
                type="password"
                className="form-control mx-auto loginInput"
                placeholder="Enter Your Password"
                {...register("password", { required: true })}
              />
              <div className="text-center">
                {(errors.email || errors.password) && (
                  <p
                    className="text-center text-danger mt-2 mb-0"
                    style={{ fontWeight: "700" }}
                  >
                    * PLease fill up the form.
                  </p>
                )}
                <button
                  type="submit"
                  className="my-2 loginSubmitBtn rounded px-4 py-2 mx-auto"
                >
                  LogIn
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
