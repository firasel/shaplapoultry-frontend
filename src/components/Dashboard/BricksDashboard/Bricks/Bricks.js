import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useHistory
} from "react-router-dom";
import cancelBtn from "../../../../images/cancelMenu.svg";
import homeImg from "../../../../images/home.svg";
import leftArrow from "../../../../images/leftArrow.svg";
import menuBtn from "../../../../images/menu.svg";
import { setLoggedInUser } from "../../../../redux/loggin";
import AddAdminEmployee from "../AddAdminEmployee/AddAdminEmployee";
import AddBricks from "../AddBricks/AddBricks";
import AddCustomer from "../AddCustomer/AddCustomer";
import ManageAdminEmployee from "../ManageAdminEmployee/ManageAdminEmployee";
import { default as ManageBricks } from "../ManageBricks/ManageBricks";
import ManageCustomer from "../ManageCustomer/ManageCustomer";
import ShowBrick from "../ShowBrick/ShowBrick";
import UpdateBricks from "../UpdateBricks/UpdateBricks";
import UpdateCustomer from "../UpdateCustomer/UpdateCustomer";
import "./Bricks.scss";

const Bricks = () => {
  const [expandSidebar, setExpandSidebar] = useState(false);
  const [logoutShow, setLogoutShow] = useState(false);
  const [active, setActive] = useState();
  const { loggedInUser } = useSelector((state) => state.loggedIn);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (window.matchMedia("screen and (max-width: 840px)").matches) {
      setExpandSidebar(true);
    }
  }, [active]);

  return (
    <Router>
      <div className="d-flex overflow-hidden">
        {/* Dashboard sidBar Start */}
        <div
          className={`bricksSideBar minBricksSideBar min-vh-100 ${
            expandSidebar && "bricksSideBarHide"
          }`}
        >
          <div className="mb-2 ms-2 sidebarCancelBtn">
            <button
              onClick={() => setExpandSidebar(true)}
              className="btn menuBtn"
            >
              <img src={leftArrow} alt="menu button" />
            </button>
          </div>
          <h2
            onClick={() => history.push("/chooseoption")}
            className="text-center sidebarBrandName"
          >
            ShaplaPoultry
          </h2>
          {loggedInUser.rule === "admin" && (
            <>
              <div
                onClick={() => setActive(0)}
                className={`${active === 0 && "activeBtn"}  sidebarMenu`}
              >
                <Link to="/bricks/addaccount">Add Admin/Employee</Link>
              </div>
              <div
                onClick={() => setActive(1)}
                className={`${active === 1 && "activeBtn"}  sidebarMenu`}
              >
                <Link to="/bricks/manageaccount">Manage Admin/Employee</Link>
              </div>
            </>
          )}
          <div
            onClick={() => setActive(2)}
            className={`${active === 2 && "activeBtn"}  sidebarMenu`}
          >
            <Link to="/bricks/add">Add Product</Link>
          </div>
          <div
            onClick={() => setActive(3)}
            className={`${active === 3 && "activeBtn"}  sidebarMenu`}
          >
            <Link to="/bricks/manage">Manage Product</Link>
          </div>
          <div
            onClick={() => setActive(4)}
            className={`${active === 4 && "activeBtn"}  sidebarMenu`}
          >
            <Link to="/bricks/customer/add">Add Customer</Link>
          </div>
          <div
            onClick={() => setActive(5)}
            className={`${active === 5 && "activeBtn"}  sidebarMenu`}
          >
            <Link to="/bricks/customer/manage">Manage Customer</Link>
          </div>
        </div>
        {/* Dashboard sidBar End */}
        {/* Dashboard Child start */}
        <div className="w-100">
          {/* Dashboard TopBar Start */}
          <div>
            <div className="dashboardTopbar">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <div
                    onClick={() =>
                      expandSidebar
                        ? setExpandSidebar(false)
                        : setExpandSidebar(true)
                    }
                    className="menuBtn bigMenuBtn"
                  >
                    {expandSidebar ? (
                      <img src={cancelBtn} alt="menu button" />
                    ) : (
                      <img src={menuBtn} alt="menu button" />
                    )}
                  </div>
                  <div
                    onClick={() => setExpandSidebar(false)}
                    className="menuBtn smallMenuBtn"
                  >
                    <img src={menuBtn} alt="menu button" />
                  </div>
                  <div
                    onClick={() => history.push("/chooseoption")}
                    className="homeIcon d-flex align-items-center justify-content-center rounded p-1"
                  >
                    <img src={homeImg} alt="home" />
                  </div>
                </div>
                <div className="dashboardTopbarMenu d-flex align-items-center">
                  <div className="profileLogo d-flex align-items-center justify-content-center rounded-circle">
                    <span>{loggedInUser.email[0]}</span>
                  </div>
                  <div className="dropdown">
                    <button
                      onClick={() => {
                        setLogoutShow(!logoutShow);
                      }}
                      className="btn dropdown-toggle dopdownBtn"
                    >
                      {loggedInUser.email}
                    </button>

                    <ul
                      className={`dopdownData ${
                        logoutShow && "dopdownDataShow"
                      }`}
                    >
                      <li>
                        <button
                          onClick={() => {
                            localStorage.removeItem("Authorization");
                            dispatch(
                              setLoggedInUser({ status: false, email: "" })
                            );
                          }}
                          className="btn"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <hr className="m-0" />
          </div>
          {/* Dashboard TopBar End */}

          <Switch>
            <Route path="/bricks/addaccount">
              <AddAdminEmployee />
            </Route>
            <Route path="/bricks/manageaccount">
              <ManageAdminEmployee />
            </Route>
            <Route path="/bricks/add">
              <AddBricks />
            </Route>
            <Route path="/bricks/manage">
              <ManageBricks />
            </Route>
            <Route path="/bricks/update/:Id">
              <UpdateBricks />
            </Route>
            <Route path="/bricks/show/:Id">
              <ShowBrick />
            </Route>
            <Route path="/bricks/customer/add">
              <AddCustomer />
            </Route>
            <Route path="/bricks/customer/manage">
              <ManageCustomer routeName="bricks" />
            </Route>
            <Route path="/bricks/customer/update/:Id">
              <UpdateCustomer routeName="bricks" />
            </Route>
          </Switch>
        </div>
        {/* Dashboard Child end */}
      </div>
    </Router>
  );
};

export default Bricks;
