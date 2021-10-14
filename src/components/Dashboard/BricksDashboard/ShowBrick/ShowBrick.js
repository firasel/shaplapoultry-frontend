import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import backImg from "../../../../images/back.svg";

const ShowBrick = () => {
  const { Id } = useParams();
  const history = useHistory();
  const { allBricks } = useSelector((state) => state.bricksData);
  const {
    buyingPrice,
    category,
    companyName,
    details,
    distributorName,
    name,
    sellingPrice,
    shortDescription,
    stock,
  } = allBricks.filter((data) => data.id === Id)[0];

  return (
    <>
      <div className="w-100 px-3 py-2">
        <div className="row p-0 m-0">
          <div className="col-12 col-sm-10 col-md-9 col-lg-8 p-0 mb-4 mx-auto shadow-lg rounded">
            <div
              className="px-3 pt-4 pb-2 rounded"
              style={{ background: "#fff" }}
            >
              <h4 className="text-center">{name}</h4>
              <br />
              <span>
                Category: <span className="fw-bold">{category}</span>
              </span>
              <br />
              <span>
                Company Name: <span className="fw-bold">{companyName}</span>
              </span>
              <br />
              <span>
                Distributor Name:{" "}
                <span className="fw-bold">{distributorName}</span>
              </span>
              <br />
              <span>
                Stock: <span className="fw-bold">{stock}</span>
              </span>
              <br />
              <span>
                Buying Price: <span className="fw-bold">{buyingPrice}</span>
              </span>
              <br />
              <span>
                Selling Price: <span className="fw-bold">{sellingPrice}</span>
              </span>
              <br />
              <span className="fw-bold">Short Description: </span>
              <p>{shortDescription}</p>
              <span className="fw-bold">Full Description: </span>
              <p>{details}</p>
              <br />
              <button
                onClick={() => history.push("/bricks/manage")}
                style={{ background: "#050545", letterSpacing: "1px" }}
                className="my-2 rounded px-4 py-2 mx-auto btn text-white fw-bold"
              >
                <img width="25px" src={backImg} alt="back icon" /> Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowBrick;
