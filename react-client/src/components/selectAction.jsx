import React from "react";
import ReactDOM from "react-dom";
import darkmode from "../../dist/script.js";
import PostView from "./postView.jsx";
import ProfileView from "./profileView.jsx";
import RentView from "./rentView.jsx";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {
  Form,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  Col,
  FormLabel,
  Navbar,
  Nav,
  Card,
} from "react-bootstrap";
class SelectAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  // seePost() {
  //   ReactDOM.render(<RentView />, document.getElementById("app"));
  // }
  // addPost() {
  //   ReactDOM.render(<PostView />, document.getElementById("app"));
  // }

  seeProfile() {
    ReactDOM.render(<ProfileView />, document.getElementById("app"));
  }

  render() {
    return (
      <div>
      <Router>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>HAMhome</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link></Nav.Link>
            <Nav.Link to={"/profile"} onClick={this.seeProfile.bind(this)}>Profile</Nav.Link>
            <Nav.Link to={"/"} className="logout">LogOut</Nav.Link>
          </Nav>
        </Navbar>
        </Router>
        <center>
          <div>
            <h1>Get Started With HAMhome</h1>
          </div>
        </center>
        <center>
          <Card id="card" style={{ width: "18rem" }}>
            <Card.Img
              id="rentimg"
              variant="top"
              src="https://d2u8towkwolubl.cloudfront.net/wp-content/uploads/2019/08/RentalHome.jpg"
            />
            <Card.Body>
              <Card.Title>you want to rent a house?</Card.Title>
              <Card.Text>
                If you are a client and you look for new house
              </Card.Text>
              <Link to={"/rentposts"}>
              <Button
                variant="primary"
                id="seepost"
                // onClick={this.seePost.bind(this)}
              >
                See all posts
              </Button>
              </Link>
            </Card.Body>
          </Card>
          <Card id="card1" style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              id="postimg"
              src="https://png2.cleanpng.com/sh/d71527b0a0c0504c77a36f3f0a0e33a2/L0KzQYm3VMI5N6dvfZH0aYP2gLBuTgBwe6Uyh9hvaXPoPb7oifwufZ9ujNdtLYP3ccXsk71xd6R5ed42c3X1hrrqhb1tbaV5RadqZUS8Q4G5U8gxQZU3RqoDNEmzQ4K3UcUzPGo3UaQDMkK1SYa1kP5o/kisspng-post-office-mail-united-states-postal-service-lett-5ae493023809d2.8849031015249292822295.png"
            />
            <Card.Body>
              <Card.Title>New Post</Card.Title>
              <Card.Text>
                If you are the owner and you wnt to post an offer proceed from
                here
              </Card.Text>
              <Link to={"/newpost"}>
              <Button
                variant="primary"
                id="addpost"
                // onClick={this.addPost.bind(this)}
              >
                Add New Post
              </Button>
              </Link>
            </Card.Body>
          </Card>
        </center>
      </div>
      
    );
  }
}

export default SelectAction;
