import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import ChooseOption from "./components/ChooseOption/ChooseOption";
import Bricks from "./components/Dashboard/BricksDashboard/Bricks/Bricks";
import Poultry from "./components/Dashboard/PoultryDashboard/Poultry/Poultry";
import Login from "./components/Login/Login";
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path ="/chooseoption">
          <ChooseOption/>
        </PrivateRoute>
        <PrivateRoute path="/bricks">
          <Bricks/>
        </PrivateRoute>
        <PrivateRoute path="/poultry">
          <Poultry/>
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
