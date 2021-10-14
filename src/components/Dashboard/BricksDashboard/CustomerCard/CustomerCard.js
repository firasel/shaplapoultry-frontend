import React, { useState } from "react";
import { useHistory } from "react-router";
import deleteImg from "../../../../images/delete.svg";
import editImg from "../../../../images/edit.svg";
import ErrorNotify from "../../../ToastNotify/ErrorNotify";
import SuccessNotify from "../../../ToastNotify/SuccessNotify";
import "./CustomerCard.scss";

const CustomerCard = ({ stateData, customerData }) => {
  const [anyCardDelete, setAnyCardDelete] = stateData;
  const [deleteLoading, setDeleteLoading] = useState(false);

  const {
    name,
    phoneNumber,
    address,
    id
  } = customerData;
  const history = useHistory();

  const handleDelete = (id) => {
    setDeleteLoading(true);
    fetch(`https://shaplapoultrysapi.herokuapp.com/customer/delete?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === true) {
          SuccessNotify("Deleted Successful");
          setAnyCardDelete(!anyCardDelete);
        } else {
          ErrorNotify("Delete Not Success!");
        }
        setDeleteLoading(false);
      });
  };

  return (
    <div className="col px-2 py-3">
      <div className="mx-auto customerCardDesign shadow">
        <h4>{name}</h4>
        <p>Phone Number: {phoneNumber}</p>
        <p>Address: {address}</p>
          <div className="d-flex align-items-center justify-content-start mt-3">
            <button
              onClick={() => history.push(`/bricks/customer/update/${id}`)}
              className="btn cardBtn editBtn me-2"
            >
              <img src={editImg} alt="edit" />
            </button>
            <button
              onClick={() => handleDelete(id)}
              className="btn cardBtn deleteBtn"
            >
              {deleteLoading ? (
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <img src={deleteImg} alt="delete" />
              )}
            </button>
          </div>
      </div>
    </div>
  );
};

export default CustomerCard;
