import React, { useState } from "react";
import deleteImg from "../../../../images/delete.svg";
import AdminEmployeeModal from "../../../AdminEmployeeModal/AdminEmployeeModal";

const AdminEmployeeCard = ({ adminEmployeeData }) => {
  const [modalCondition, setModalCondition] = useState(false);
  const { email, id, rule } = adminEmployeeData;

  const handleDelete = async () => {
    setModalCondition(true);
  };

  return (
    <div className="col px-2 py-3">
      <AdminEmployeeModal modalState={[modalCondition, setModalCondition]} id={id} />
      <div className="mx-auto bricksCardDesign shadow">
        <p>Email: <span className="fw-bold" style={{color:"#050546"}}>{email}</span></p>
        <p>Rule: {rule}</p>
        <div className="d-flex align-items-center justify-content-start mt-3">
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

export default AdminEmployeeCard;
