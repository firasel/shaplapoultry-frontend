import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import backImg from "../../../../images/back.svg";
import ErrorNotify from "../../../ToastNotify/ErrorNotify";
import SuccessNotify from "../../../ToastNotify/SuccessNotify";

const UpdateBricks = () => {
  const [isLodaing, setIsLoading] = useState(false);
  const { Id } = useParams();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { allBricks } = useSelector((state) => state.bricksData);
  const {
    buyingPrice,
    category,
    companyName,
    details,
    distributorName,
    id,
    name,
    sellingPrice,
    shortDescription,
    stock,
  } = allBricks.filter((data) => data.id === Id)[0];

  const onSubmit = (data) => {
    const {
      name,
      details,
      shortDescription,
      stock,
      sellingPrice,
      buyingPrice,
      category,
      distributorName,
      companyName,
    } = data;

    // Formating and covert data type
    const formateData = {
      id: id,
      name,
      details,
      shortDescription,
      stock: parseFloat(stock),
      sellingPrice: parseFloat(sellingPrice),
      buyingPrice: parseFloat(buyingPrice),
      category,
      distributorName,
      companyName,
    };

    setIsLoading(true);
    fetch("https://shaplapoultrysapi.herokuapp.com/bricks/update", {
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
          SuccessNotify("Bricks Data Updated Successful");
          history.push("/bricks/manage");
        } else {
          ErrorNotify("Bricks Data Update Not Success!");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        ErrorNotify("Bricks Data Update Not Success!");
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
                  Product Name <span className="text-danger">&#x2605;</span>
                </label>
                <input
                  type="text"
                  className="form-control w-100"
                  placeholder="Enter Product Name"
                  defaultValue={name}
                  {...register("name", { required: true })}
                />
              </div>
              <div className="formInput">
                <label>
                  Product Details <span className="text-danger">&#x2605;</span>
                </label>
                <textarea
                  rows={4}
                  className="form-control w-100"
                  placeholder="Enter Product Details"
                  defaultValue={details}
                  {...register("details", { required: true })}
                />
              </div>
              <div className="formInput">
                <label>
                  Product Short Description{" "}
                  <span className="text-danger">&#x2605;</span>
                </label>
                <textarea
                  rows={3}
                  type="text"
                  className="form-control w-100"
                  placeholder="Product Short Description"
                  defaultValue={shortDescription}
                  {...register("shortDescription", { required: true })}
                />
              </div>
              <div className="row">
                <div className="formInput col-12 col-md-4">
                  <label>
                    Product Stock <span className="text-danger">&#x2605;</span>
                  </label>
                  <input
                    type="text"
                    className="form-control w-100"
                    placeholder="Product Stock"
                    defaultValue={stock}
                    {...register("stock", { required: true })}
                  />
                </div>
                <div className="formInput col-6 col-md-4">
                  <label>
                    Product Selling Price{" "}
                    <span className="text-danger">&#x2605;</span>
                  </label>
                  <input
                    type="text"
                    className="form-control w-100"
                    placeholder="Product Selling Price"
                    defaultValue={sellingPrice}
                    {...register("sellingPrice", { required: true })}
                  />
                </div>
                <div className="formInput col-6 col-md-4">
                  <label>
                    Product Buying Price{" "}
                    <span className="text-danger">&#x2605;</span>
                  </label>
                  <input
                    type="text"
                    className="form-control w-100"
                    placeholder="Product Buying Price"
                    defaultValue={buyingPrice}
                    {...register("buyingPrice", { required: true })}
                  />
                </div>
              </div>
              <div className="formInput">
                <label>
                  Product Category <span className="text-danger">&#x2605;</span>
                </label>
                <input
                  type="text"
                  className="form-control w-100"
                  placeholder="Product Category"
                  defaultValue={category}
                  {...register("category", { required: true })}
                />
              </div>
              <div className="formInput">
                <label>
                  Distributor Name <span className="text-danger">&#x2605;</span>
                </label>
                <input
                  type="text"
                  className="form-control w-100"
                  placeholder="Distributor Name"
                  defaultValue={distributorName}
                  {...register("distributorName", { required: true })}
                />
              </div>
              <div className="formInput">
                <label>
                  Company Name <span className="text-danger">&#x2605;</span>
                </label>
                <input
                  type="text"
                  className="form-control w-100"
                  placeholder="Company Name"
                  defaultValue={companyName}
                  {...register("companyName", { required: true })}
                />
              </div>

              <div className="text-center">
                {(errors.name ||
                  errors.details ||
                  errors.stock ||
                  errors.sellingPrice ||
                  errors.buyingPrice ||
                  errors.category) && (
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
                    "Update Product"
                  )}
                </button>
                <button
                  onClick={() => history.push("/bricks/manage")}
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

export default UpdateBricks;
