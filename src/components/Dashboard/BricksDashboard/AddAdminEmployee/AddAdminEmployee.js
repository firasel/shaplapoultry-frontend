import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import ErrorNotify from "../../../ToastNotify/ErrorNotify";
import SuccessNotify from "../../../ToastNotify/SuccessNotify";

const AddAdminEmployee = () => {
  const [isLodaing, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    setIsLoading(true);
    fetch("https://shaplapoultrysapi.herokuapp.com/user/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          SuccessNotify("Account Data Added Successful");
        } else {
          ErrorNotify("Data Not Added,Please Try Again");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        ErrorNotify("Data Not Added,Please Try Again");
        setIsLoading(false);
      });

    reset();
  };

  return (
    <>
      <ToastContainer />
      <div className="w-100 px-3 py-2 parentDesign">
        <div className="row p-0 m-0">
          <div className="col-12 col-sm-8 col-md-7 col-lg-6 p-0 mb-4 mx-auto">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-4 pb-3 px-1 px-sm-3 w-100 formDesign"
            >
              <div className="formInput">
                <label>
                  Email <span className="text-danger">&#x2605;</span>
                </label>
                <input
                  type="text"
                  className="form-control w-100"
                  placeholder="Enter Email"
                  {...register("email", { required: true })}
                />
              </div>
              <div className="formInput">
                <label>
                  Password <span className="text-danger">&#x2605;</span>
                </label>
                <input
                  type="text"
                  className="form-control w-100"
                  placeholder="Enter Password"
                  {...register("password", { required: true })}
                />
              </div>
              <div className="formInput">
                <label>
                  Seelect Rule <span className="text-danger">&#x2605;</span>
                </label>
                <select {...register("rule", { required: true })}>
                  <option value="">Select Rule</option>
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                </select>
              </div>

              <div className="text-center">
                {(errors.email || errors.password || errors.rule) && (
                  <p
                    className="text-center text-danger mt-2 mb-0"
                    style={{ fontWeight: "700" }}
                  >
                    * PLease fill up the form.
                  </p>
                )}
                <button
                  type="submit"
                  className="my-2 formSubmitBtn rounded px-4 py-2 mx-auto"
                >
                  {isLodaing ? (
                    <div className="spinner-border text-light" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    "Add Admin/Employee"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAdminEmployee;
