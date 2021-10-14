import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useHistory
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import cancelBtn from "../../../../images/cancelMenu.svg";
import homeImg from "../../../../images/home.svg";
import leftArrow from "../../../../images/leftArrow.svg";
import menuBtn from "../../../../images/menu.svg";
import { setLoggedInUser } from "../../../../redux/loggin";
import AddAdminEmployee from "../../BricksDashboard/AddAdminEmployee/AddAdminEmployee";
import AddCustomer from "../../BricksDashboard/AddCustomer/AddCustomer";
import AddPoultry from "../AddPoultry/AddPoultry";
import ManagePoultry from "../ManagePoultry/ManagePoultry";
import ShowPoultry from "../ShowPoultry/ShowPoultry";
import UpdatePoultry from "../UpdatePoultry/UpdatePoultry";
import "./Poultry.scss";

const Poultry = () => {
  const [expandSidebar, setExpandSidebar] = useState(false);
  const [logoutShow,setLogoutShow] = useState(false);
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
        <ToastContainer />
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
            <div
              onClick={() => setActive(0)}
              className={`${active === 0 && "activeBtn"}  sidebarMenu`}
            >
              <Link to="/poultry/addaccount">Add Admin/Employee</Link>
            </div>
          )}
          <div
            onClick={() => setActive(1)}
            className={`${active === 1 && "activeBtn"}  sidebarMenu`}
          >
            <Link to="/poultry/add">Add Product</Link>
          </div>
          <div
            onClick={() => setActive(2)}
            className={`${active === 2 && "activeBtn"}  sidebarMenu`}
          >
            <Link to="/poultry/manage">Manage Product</Link>
          </div>
          <div
            onClick={() => setActive(3)}
            className={`${active === 3 && "activeBtn"}  sidebarMenu`}
          >
            <Link to="/poultry/addcustomer">Add Customer</Link>
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
                    onClick={()=>{
                      setLogoutShow(!logoutShow);
                    }}
                      className="btn dropdown-toggle dopdownBtn"
                    >
                     {loggedInUser.email}
                    </button>

                    <ul className={`dopdownData ${logoutShow && 'dopdownDataShow'}`}
                    >
                      <li>
                          <button onClick={()=>{
                            localStorage.removeItem('Authorization');
                            dispatch(setLoggedInUser({status:false,email:''}))}
                        } className="btn">Logout</button>
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
            {loggedInUser.rule === "admin" && (
              <Route exact path="/poultry/addaccount">
                <AddAdminEmployee />
              </Route>
            )}
            <Route path="/poultry/add">
              <AddPoultry />
            </Route>
            <Route path="/poultry/manage">
              <ManagePoultry />
            </Route>
            <Route path="/poultry/update/:Id">
              <UpdatePoultry />
            </Route>
            <Route path="/poultry/show/:Id">
              <ShowPoultry />
            </Route>
            <Route path="/poultry/addcustomer">
              <AddCustomer/>
            </Route>
          </Switch>
        </div>
        {/* Dashboard Child end */}
      </div>
    </Router>
  );
};

export default Poultry;
