import React, { useState } from "react";
import { useHistory } from "react-router";
import deleteImg from "../../../../images/delete.svg";
import editImg from "../../../../images/edit.svg";
import ErrorNotify from "../../../ToastNotify/ErrorNotify";
import SuccessNotify from "../../../ToastNotify/SuccessNotify";
import "./BricksCard.scss";

const BricksCard = ({ stateData, bricksData }) => {
  const [anyCardDelete, setAnyCardDelete] = stateData;
  const [deleteLoading, setDeleteLoading] = useState(false);

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
  } = bricksData;
  const history = useHistory();

  const handleDelete = (id) => {
    setDeleteLoading(true);
    fetch(`https://shaplapoultrysapi.herokuapp.com/bricks/delete?id=${id}`, {
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
      <div className="mx-auto bricksCardDesign shadow">
        <h4>{name}</h4>
        <p>Category: {category}</p>
        <p>Company Name: {companyName}</p>
        <p>
          Stock: <span>{stock}</span>
        </p>
        <div className="price">
          <p>
            Buying Price: <span>{buyingPrice}</span>
          </p>
          <p>
            Selling Price: <span>{sellingPrice}</span>
          </p>
        </div>
        <div className="d-flex align-items-center justify-content-between mt-3">
          <button
            onClick={() => history.push(`/bricks/show/${id}`)}
            className="btn rounded detailCardBtn"
          >
            All Details
          </button>
          <div className="d-flex align-items-center justify-content-between">
            <button
              onClick={() => history.push(`/bricks/update/${id}`)}
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
    </div>
  );
};

export default BricksCard;
