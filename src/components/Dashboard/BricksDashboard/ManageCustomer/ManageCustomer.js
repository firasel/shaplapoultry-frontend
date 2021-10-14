import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { setAllCustomer } from "../../../../redux/customer";
import CustomerCard from "../CustomerCard/CustomerCard";

const ManageCustomer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [anyCardDelete, setAnyCardDelete] = useState(true);
  const { allCustomer } = useSelector((state) => state.customerData);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    fetch("https://shaplapoultrysapi.herokuapp.com/customer/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          dispatch(setAllCustomer(data.data));
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [dispatch, anyCardDelete]);

  return (
    <>
      <ToastContainer />
      <div
        className="w-100 px-3 py-2"
        style={{ background: "#f4fcff", minHeight: "100%" }}
      >
        {isLoading ? (
          <div className="text-center py-3">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 m-0 p-0">
            {allCustomer.map((data) => (
              <CustomerCard
                key={data.id}
                stateData={[anyCardDelete, setAnyCardDelete]}
                customerData={data}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ManageCustomer;
