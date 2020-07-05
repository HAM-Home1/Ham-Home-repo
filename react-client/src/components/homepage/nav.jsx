import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "./logo.png";

class Nav extends React.Component {
  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link to={"/"}>
              <div className="navbar-brand">HAM Home</div>
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"}>
                    <div className="nav-link">Login</div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/signup"}>
                    <div className="nav-link">Sign up</div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <center>
          {" "}
          <img id="logoImage" src={logo} />
        </center>
      </div>
    );
  }
}

export default Nav;
