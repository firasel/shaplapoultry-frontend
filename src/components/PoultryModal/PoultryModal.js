import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { default as ReactModal } from "react-modal";
import eyeHide from "../../images/eyeHide.svg";
import eyeShow from "../../images/eyeShow.svg";
import ErrorNotify from "../ToastNotify/ErrorNotify";
import SuccessNotify from "../ToastNotify/SuccessNotify";
import "./PoultryModal.scss";

const PoultryModal = ({ modalState, anyDelete, id }) => {
  const [modalCondition, setModalCondition] = modalState;
  const [anyCardDelete, setAnyCardDelete] = anyDelete;
  const [showPass, setShowPass] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    setDeleteLoading(true);

    await fetch(`https://shaplapoultrysapi.herokuapp.com/poultry/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
      },
      body: JSON.stringify({ id:id, ...data }),
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
      reset();
      setModalCondition(false);
  };

  return (
    <ReactModal
      isOpen={modalCondition}
      onRequestClose={() => setModalCondition(false)}
      ariaHideApp={false}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(255, 255, 255, 0.75)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        content: {
          position: "unset",
          width: "440px",
          background: "#fff",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          outline: "none",
          padding: "40px 30px",
          borderRadius: "16px",
          textAlign: "center",
          paddingTop: "35px",
          boxShadow: "0px 0px 25px #cdcdcd",
          border: "0",
        },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="overflow-hidden position-relative d-flex align-items-center">
          <input
            type={`${showPass ? "text" : "password"}`}
            className="form-control mx-auto modalInput"
            placeholder="Enter Your Password"
            {...register("password", { required: true })}
          />
          <div onClick={() => setShowPass(!showPass)} className="eyePass2">
            {showPass ? (
              <img className="w-100" src={eyeShow} alt="show pass icon" />
            ) : (
              <img className="w-100" src={eyeHide} alt="show pass icon" />
            )}
          </div>
        </div>
        {errors.password && (
          <p
            className="text-center text-danger mt-2 mb-0"
            style={{ fontWeight: "700" }}
          >
            * PLease fill up the form.
          </p>
        )}
        <button
          type="submit"
          className="my-2 modalSubmitBtn rounded px-4 py-2 mx-auto"
        >
          {deleteLoading ? (
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            "Confirm"
          )}
        </button>
      </form>
    </ReactModal>
  );
};

export default PoultryModal;
