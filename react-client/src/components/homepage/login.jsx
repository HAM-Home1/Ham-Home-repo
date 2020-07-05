import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      userName: "",
      password: "",
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangeUserName(e) {
    this.setState({
      lastName: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  verifyUser(e) {
    e.preventDefault();

    const userObject = {
      email: this.state.email,
      userName: this.state.userName,
      password: this.state.password,
    };

    axios
      .post("/signin", userObject)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <form className="home">
        <h3>Sign In</h3>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="email"
            placeholder="Enter email"
            onChange={this.onChangeEmail.bind(this)}
          />
        </div>

        <div className="form-group">
          <label>Username</label>
          <input
            type="username"
            className="username"
            placeholder="Enter Username"
            onChange={this.onChangeUserName.bind(this)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="password"
            placeholder="Enter password"
            onChange={this.onChangePassword.bind(this)}
          />
        </div>

        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block"
          onClick={this.verifyUser.bind(this)}
        >
          Submit
        </button>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </form>
    );
  }
}

export default Login;
