import React, { useState } from "react";
import { useHistory } from "react-router";
import deleteImg from "../../../../images/delete.svg";
import editImg from "../../../../images/edit.svg";
import BricksModal from "../../../BricksModal/BricksModal";
import "./BricksCard.scss";

const BricksCard = ({ stateData, bricksData }) => {
  const [anyCardDelete, setAnyCardDelete] = stateData;
  const [modalCondition, setModalCondition] = useState(false);

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

  const handleDelete = async () => {
    setModalCondition(true);
  };

  return (
    <div className="col px-2 py-3">
      <BricksModal
        anyDelete={[anyCardDelete, setAnyCardDelete]}
        modalState={[modalCondition, setModalCondition]}
        id={id}
      />
      <div className="mx-auto bricksCardDesign shadow">
        <h6>{name}</h6>
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
              onClick={() => handleDelete()}
              className="btn cardBtn deleteBtn"
            >
              <img src={deleteImg} alt="delete" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BricksCard;
