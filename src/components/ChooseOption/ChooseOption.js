import React from "react";
import { useHistory } from "react-router";
import brickImg from "../../images/bricks.svg";
import poultryImg from "../../images/poultry.svg";
import "./ChooseOption.scss";

const ChooseOption = () => {
  const history = useHistory();
  return (
    <div className="w-100 overflow-hidden">
      <div className="container">
        <div className="chooseOption">
          <div className="row w-100 chooseContainer p-0 m-0">
            <h2 className="text-center mt-2 mb-5 chooseTitle p-0 m-0">
              Click any one card
            </h2>
            <div className="col-9 mb-5 col-sm-6 col-md-5 col-lg-4 mx-auto d-flex align-items-center p-0 m-0">
              <div
                onClick={() => history.push("/poultry")}
                className="w-100 chooseCard shadow"
              >
                <div className="w-100">
                  <img className="w-100" src={poultryImg} alt="poultry" />
                </div>
                <h4 className="text-center pb-4">Poultry & Medicine</h4>
              </div>
            </div>
            <div className="col-9 mb-5 col-sm-6 col-md-5 col-lg-4 mx-auto d-flex align-items-center p-0 m-0">
              <div
                onClick={() => history.push("/bricks")}
                className="w-100 chooseCard shadow"
              >
                <div className="w-100">
                  <img className="w-100" src={brickImg} alt="poultry" />
                </div>
                <h4 className="text-center pb-4">Bricks</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseOption;
