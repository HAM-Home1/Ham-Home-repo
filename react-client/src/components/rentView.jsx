import React from "react";
import Select from "react-select";
import SearchedHome from "./searchedHome.jsx";
import $ from "jquery";
import axios from "axios";
import ReactDOM from "react-dom";
import "./rentView.css";
const mdbreact = require("mdbreact");
const { Button, Collapse } = mdbreact;
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink,
  MDBContainer,
  MDBMask,
  MDBView,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdbreact";

const cities = [
  { label: "Ariana", value: 1 },
  { label: "Beja", value: 2 },
  { label: "Ben Arous", value: 3 },
  { label: "Bizerte", value: 4 },
  { label: "Gabes", value: 5 },
  { label: "Gafsa", value: 6 },
  { label: "Jendouba", value: 7 },
  { label: "Kairouan", value: 8 },
  { label: "Kasserine", value: 29 },
  { label: "Kebili", value: 10 },
  { label: "Kef", value: 11 },
  { label: "Mahdia", value: 12 },
  { label: "Manouba", value: 13 },
  { label: "Mednine", value: 14 },
  { label: "Monastir", value: 15 },
  { label: "Nabeul", value: 16 },
  { label: "Sfax", value: 17 },
  { label: "Sidi Bouzid", value: 18 },
  { label: "Seliana", value: 19 },
  { label: "Sousse", value: 20 },
  { label: "Tataouine", value: 21 },
  { label: "Tozeur", value: 22 },
  { label: "Tunis", value: 23 },
  { label: "Zaghouan", value: 24 },
];

const price = [
  { label: "300-500", value: 1 },
  { label: "500-700", value: 2 },
  { label: "700-1000", value: 3 },
  { label: "1000-1500", value: 4 },
  { label: "1500-2000", value: 5 },
  { label: "2000-3000", value: 6 },
  { label: "3000-5000", value: 7 },
];

const rooms = [
  { label: "1 bedroom - 1 bathroom", value: 1 },
  { label: "2 bedrooms - 1 bathroom", value: 2 },
  { label: "3 bedrooms - 1 bathroom", value: 3 },
  { label: "4 bedrooms - 1 bathroom", value: 4 },
  { label: "2 bedrooms - 2 bathrooms", value: 5 },
  { label: "3 bedrooms - 2 bathrooms", value: 6 },
  { label: "4 bedrooms - 2 bathrooms", value: 7 },
  { label: "5 bedrooms - 2 bathrooms", value: 8 },
  { label: "3 bedrooms - 3 bathrooms", value: 9 },
  { label: "4 bedrooms - 3 bathrooms", value: 10 },
  { label: "5 bedrooms - 3 bathrooms", value: 11 },
];

class RentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
      city: null,
      rooms: null,
      price: null,
      posts: [],
    };
  }

  componentDidMount() {
    axios.get("/rentPosts1").then((res) => {
      const posts = res.data;
      this.setState({ posts });
    });
  }

  NavbarOnClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }
  handleChange1(city) {
    this.setState({ city: city.label });
  }
  handleChange2(rooms) {
    this.setState({ rooms: rooms.label });
  }
  handleChange3(price) {
    this.setState({ price: price.label });
  }
  handleClick() {
    console.log(this.state.city);
    console.log(this.state.rooms);
    console.log(this.state.price);
    axios
      .post("/search", {
        city: this.state.city,
        rooms: this.state.rooms,
        price: this.state.price,
      })
      .then((res) => {
        const posts = res.data;
        this.setState({ posts });
        console.log(this.state.posts);
      });
  }

  showMore(i) {
    ReactDOM.render(
      <SearchedHome post={this.state.posts[i]} />,
      document.getElementById("app")
    );
  }

  render() {
    const displayPosts = this.state.posts.map((item, i) => {
      var arr = item.imagesrc.split(",");
      return (
        <div className="cardBox" id="rentContainer">
          <MDBRow className="cardBox1">
            <MDBCol id="cardBox2" md="4">
              <MDBCard>
                <MDBCardImage
                  top
                  src={arr[0]}
                  overlay="white-slight"
                  hover
                  waves
                  alt="MDBCard image cap"
                  id="cardBoxImage"
                />
                <MDBCardBody className="elegant-color white-text rounded-bottom">
                  <a
                    href="#!"
                    className="activator waves-effect waves-light mr-4"
                  >
                    <MDBIcon icon="share-alt" className="white-text" />
                  </a>
                  <MDBCardTitle>Price : ${item.price}</MDBCardTitle>
                  <hr className="hr-light" />
                  <MDBCardText className="white-text">
                    Rooms : {item.rooms}
                  </MDBCardText>
                  <MDBCardText className="white-text">
                    Address : {item.address}
                  </MDBCardText>
                  <a
                    href="#!"
                    className="black-text d-flex justify-content-end"
                  >
                    <h5
                      className="white-text"
                      onClick={this.showMore.bind(this, i)}
                    >
                      Read more
                      <MDBIcon icon="angle-double-right" className="ml-2" />
                    </h5>
                  </a>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </div>
      );
    });
    return (
      <div>
        <div id="image">
          <header>
            <Router>
              <MDBNavbar
                color="bg-primary"
                fixed="top"
                dark
                expand="md"
                scrolling
                transparent
              >
                <MDBNavbarBrand href="/">
                  <strong>Navbar</strong>
                </MDBNavbarBrand>
                {!this.state.isWideEnough && (
                  <MDBNavbarToggler onClick={this.NavbarOnClick.bind(this)} />
                )}
                <MDBCollapse isOpen={this.state.collapse} navbar>
                  <MDBNavbarNav left>
                    <MDBNavItem active>
                      <MDBNavLink to="/selectaction">Home</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink to="#">Link</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink to="/profile">Profile</MDBNavLink>
                    </MDBNavItem>
                  </MDBNavbarNav>
                </MDBCollapse>
              </MDBNavbar>
            </Router>
          </header>
        </div>
        <div>
          <img
            id="headerimages"
            src="./assets/imgs/bg.jpg"
            style={{ width: "100%" }}
          />
        </div>
        <div className="inner-div">
          <div className="container1">
            <p>City</p>
            <Select
              options={cities}
              id="select1"
              onChange={this.handleChange1.bind(this)}
            />
          </div>

          <div className="container1">
            <p>Number of rooms</p>
            <Select
              options={rooms}
              id="select2"
              onChange={this.handleChange2.bind(this)}
            />
          </div>

          <div className="container1">
            <p>Price</p>
            <Select
              options={price}
              id="select3"
              onChange={this.handleChange3.bind(this)}
            />
          </div>
          <button
            type="submit²"
            className="btn-search"
            onClick={this.handleClick.bind(this)}
          >
            Search
          </button>
        </div>
        {displayPosts}
      </div>
    );
  }
}

export default RentView;
