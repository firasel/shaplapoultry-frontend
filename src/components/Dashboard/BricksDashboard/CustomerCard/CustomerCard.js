import React, { useState } from "react";
import { useHistory } from "react-router";
import deleteImg from "../../../../images/delete.svg";
import editImg from "../../../../images/edit.svg";
import CustomerModal from "../../../CustomerModal/CustomerModal";
import "./CustomerCard.scss";

const CustomerCard = ({ customerData, routeName }) => {
  const [modalCondition, setModalCondition] = useState(false);
  const { name, phoneNumber, address, id } = customerData;
  const history = useHistory();

  const handleDelete = () => {
    setModalCondition(true);
  };

  return (
    <div className="col px-2 py-3">
      <CustomerModal modalState={[modalCondition, setModalCondition]} id={id} />
      <div className="mx-auto customerCardDesign shadow">
        <h6>{name}</h6>
        <p>Phone Number: {phoneNumber}</p>
        <p>Address: {address}</p>
        <div className="d-flex align-items-center justify-content-start mt-3">
          <button
            onClick={() => history.push(`/${routeName}/customer/update/${id}`)}
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
  );
};

export default CustomerCard;
