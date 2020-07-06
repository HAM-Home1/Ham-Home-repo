import React, { Component } from "react";
import axios from "axios";
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      userName: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      address: "",
      dateBirth: "",
    };
  }

  onChangeUserName(e) {
    this.setState({
      userName: e.target.value,
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  onChangeConfirmPassword(e) {
    this.setState({
      confirmPassword: e.target.value,
    });
  }
  onChangePhoneNumber(e) {
    this.setState({
      phoneNumber: e.target.value,
    });
  }
  onChangeAddress(e) {
    this.setState({
      address: e.target.value,
    });
  }
  onChangeDateBirth(e) {
    this.setState({
      dateBirth: e.target.value,
    });
  }

  registerUser() {
    // e.preventDefault();

    const userObject = {
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      phoneNumber: this.state.phoneNumber,
      address: this.state.address,
      dateBirth: this.state.dateBirth,
    };

    axios
      .post("/api/users", userObject)
      // .then((res) => {
      //   console(res);
      //   console.log(res.data);
      // })
      // .catch((error) => {
      //   console.log(error);
      // });
      .then(() => {
        this.getToken();
      });
  }

  getToken = () => {
    axios.get("/api/users").then((res) => {
      console.log(res);
    });
  };

  render() {
    return (
      <div className="design">
        <form className="home">
          <h3>Sign Up</h3>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="User name"
              onChange={this.onChangeUserName.bind(this)}
            />
          </div>

          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={this.onChangeEmail.bind(this)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={this.onChangePassword.bind(this)}
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              onChange={this.onChangeConfirmPassword.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Phone Number"
              onChange={this.onChangePhoneNumber.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              onChange={this.onChangeAddress.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Date Of Birth</label>
            <input
              type="text"
              className="form-control"
              placeholder="Date of Birth"
              onChange={this.onChangeDateBirth.bind(this)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            onClick={this.registerUser.bind(this)}
          >
            Sign Up
          </button>
          <p className="forgot-password text-right">
            Already registered <a href="#">sign in?</a>
          </p>
        </form>
      </div>
    );
  }
}

export default SignUp;
