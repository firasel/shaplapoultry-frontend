import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import eyeHide from "../../images/eyeHide.svg";
import eyeShow from "../../images/eyeShow.svg";
import loginVector from "../../images/loginVector.jpg";
import { setLoggedInUser } from "../../redux/loggin";
import "./Loign.scss";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const loginNotSuccess = () =>
    toast.error("Please Try Again", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const onSubmit = (data) => {
    fetch("https://shaplapoultrysapi.herokuapp.com/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          localStorage.setItem("Authorization", data.data[0]?.token);
          dispatch(
            setLoggedInUser({ ...data.data[0]?.loginData, status: data.status })
          );
          history.push("/chooseoption");
        } else {
          dispatch(setLoggedInUser({ status: data.status }));
          loginNotSuccess();
          reset();
        }
      });
  };

  return (
    <>
      <div className="container">
        <div className="row loginContainer m-0 p-0">
          <div className="col-12 col-sm-12 col-md-6 col-lg-7 m-0 p-0 d-flex align-items-center imgColumn">
            <img className="w-100" src={loginVector} alt="login vector" />
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-5 m-0 p-0 d-flex align-items-center">
            <div className="w-100">
              <h2 className="text-center brandName">ShaplaPoultry</h2>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-4 px-3 px-sm-0 loginForm"
              >
                <input
                  type="email"
                  className="form-control mx-auto loginInput"
                  placeholder="Enter Your Email"
                  {...register("email", { required: true })}
                />
                <div className="overflow-hidden position-relative d-flex align-items-center">
                  <input
                    type={`${showPass ? "text" : "password"}`}
                    className="form-control mx-auto loginInput"
                    placeholder="Enter Your Password"
                    {...register("password", { required: true })}
                  />
                  <div
                    onClick={() => setShowPass(!showPass)}
                    className="eyePass"
                  >
                    {showPass ? (
                      <img
                        className="w-100"
                        src={eyeShow}
                        alt="show pass icon"
                      />
                    ) : (
                      <img
                        className="w-100"
                        src={eyeHide}
                        alt="show pass icon"
                      />
                    )}
                  </div>
                </div>
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
    </>
  );
};

export default Login;
