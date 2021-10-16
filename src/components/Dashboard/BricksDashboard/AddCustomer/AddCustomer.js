import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ErrorNotify from "../../../ToastNotify/ErrorNotify";
import SuccessNotify from "../../../ToastNotify/SuccessNotify";

const AddCustomer = () => {
  const [isLodaing, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const { name, phoneNumber, address } = data;

    // Formating and covert data type
    const formateData = {
      name,
      address,
      phoneNumber: parseFloat(phoneNumber),
    };

    setIsLoading(true);
    fetch("https://shaplapoultrysapi.herokuapp.com/customer/add", {
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
          SuccessNotify("Customer Add Successful");
        } else {
          ErrorNotify("Customer Not Added,Please Try Again");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        ErrorNotify("Customer Not Added,Please Try Again");
        setIsLoading(false);
      });

    reset();
  };

  return (
    <>
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
                  defaultValue="+880"
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
                    "Add Customer"
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

export default AddCustomer;
