import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllAdminEmployee } from "../../../../redux/AdminEmployee";
import AdminEmployeeCard from "../AdminEmployeeCard/AdminEmployeeCard";

const ManageAdminEmployee = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { allAdminEmployee } = useSelector((state) => state.adminEmployeeData);
  const { anyDataChange } = useSelector((state) => state.anyDataChange);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    fetch("https://shaplapoultrysapi.herokuapp.com/user/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          dispatch(setAllAdminEmployee(data.data));
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [dispatch, anyDataChange]);

  return (
    <>
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
            {allAdminEmployee.map((data) => (
              <AdminEmployeeCard key={data.id} adminEmployeeData={data} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ManageAdminEmployee;
