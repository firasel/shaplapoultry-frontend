import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { ToastContainer } from "react-toastify";
import backImg from '../../../../images/back.svg';
import ErrorNotify from "../../../ToastNotify/ErrorNotify";
import SuccessNotify from "../../../ToastNotify/SuccessNotify";

const UpdateCustomer = () => {
  const [isLodaing, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const {Id} = useParams();
  const { allCustomer } = useSelector((state) => state.customerData);
  const {name,id,address,phoneNumber} = allCustomer.filter((data) => data.id === Id)[0];
  const history = useHistory();

  const onSubmit = (data) => {
    const { name, phoneNumber, address } = data;

    // Formating and covert data type
    const formateData = {
      id,
      name,
      address,
      phoneNumber: parseFloat(phoneNumber),
    };

    setIsLoading(true);
    fetch("https://shaplapoultrysapi.herokuapp.com/customer/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
      },
      body: JSON.stringify(formateData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          SuccessNotify("Data Update Successful");
        } else {
          ErrorNotify("Data Update Not Success");
        }
        setIsLoading(false);
        history.push("/bricks/customer/manage");
      })
      .catch((error) => {
        ErrorNotify("Data Update Not Success");
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
                  Customer Name <span className="text-danger">&#x2605;</span>
                </label>
                <input
                  type="text"
                  className="form-control w-100"
                  placeholder="Customer Name"
                  defaultValue={name}
                  {...register("name", { required: true })}
                />
              </div>

              <div className="formInput">
                <label>
                  Phone Number Add(+880){" "}
                  <span className="text-danger">&#x2605;</span>
                </label>
                <input
                  type="text"
                  className="form-control w-100"
                  placeholder="Phone Number with 880"
                  defaultValue={phoneNumber}
                  {...register("phoneNumber", { required: true })}
                />
              </div>

              <div className="formInput">
                <label>
                  Address <span className="text-danger">&#x2605;</span>
                </label>
                <input
                  type="text"
                  className="form-control w-100"
                  placeholder="Customer address"
                  defaultValue={address}
                  {...register("address", { required: true })}
                />
              </div>

              <div className="text-center">
                {(errors.name || errors.phoneNumber || errors.address) && (
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
                    "Update Data"
                  )}
                </button>
                <button
                  onClick={() => history.push("/bricks/customer/manage")}
                  style={{ background: "#050545" }}
                  className="my-2 formSubmitBtn rounded px-4 py-2 mx-auto"
                >
                  <img width="25px" src={backImg} alt="back icon" /> Back
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateCustomer;
