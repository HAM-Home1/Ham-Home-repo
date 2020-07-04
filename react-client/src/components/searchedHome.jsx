import React from "react";
import ReactDOM from "react-dom";
import darkmode from "../../dist/script.js";
import ProfileView from "./profileView.jsx";
import SelectAction from "./selectAction.jsx";
import axios from "axios";
import $ from "jquery";
import "regenerator-runtime/runtime";
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
  Carousel,
  CarouselItem,
  Accordion,
} from "react-bootstrap";

class SearchedHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  seeProfile() {
    ReactDOM.render(<ProfileView />, document.getElementById("app"));
  }
  seeSelectAction() {
    ReactDOM.render(<SelectAction />, document.getElementById("app"));
  }

  async chat() {
    var description1 = this.props.post.description;
    $("#chatbox").show();
    // Make connection
    var socket = io.connect("http://localhost:3000");

    // Query DOM
    var message = document.getElementById("message"),
      handle = document.getElementById("handle"),
      btn = document.getElementById("send"),
      output = document.getElementById("output"),
      feedback = document.getElementById("feedback");

    // Emit events
    console.log(message.value, handle, btn, output, feedback);

    /*this is to implement in the new repo */
    var msg = await axios.post("/GetMessages", {
      description: description1,
    });
    var getall = "[" + msg.data.slice(0, msg.data.length - 1) + "]";
    // output.value === msg;
    var resultmsg = JSON.parse(getall);
    console.log(resultmsg);
    // $("#output").html("");
    resultmsg.map((msg, i) => {
      socket.emit("chat", { message: msg.message, handle: msg.sender });
    });
    btn.addEventListener("click", function () {
      if ($("#message").val() && $("#handle").val()) {
        socket.emit("chat", {
          message: message.value,
          handle: handle.value,
        });
        $("#output").scrollTop($("#output")[0].scrollHeight);
        console.log(message.value, handle.value);
        var dat = new Date().toString();
        // console.log(description1);

        // this.setState({ history });
        axios.post("/messages", {
          sender: handle.value,
          message: message.value,
          date: dat,
          description: description1,
        });
        $("#chat-window").scrollTop($("#chat-window")[0].scrollHeight);
        $("#message").val("");
      }
    });
    //the code above should be transfered
    // getting the saved messages from the database and posting them on the output
    // axios.get("/posts", {});

    message.addEventListener("keypress", function () {
      socket.emit("typing", handle.value);
    });

    // Listen for events
    socket.on("chat", function (data) {
      feedback.innerHTML = "";
      output.innerHTML +=
        "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
    });

    socket.on("typing", function (data) {
      feedback.innerHTML =
        "<p><em>" + data + " is typing a message...</em></p>";
    });

    // ReactDOM.render(<ChatRoom />, document.getElementById("chatbox"));
    // // $("#startchat").hide();
  }
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand onClick={this.seeSelectAction.bind(this)}>
            HAMhome
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link></Nav.Link>
            <Nav.Link onClick={this.seeProfile.bind(this)}>Profile</Nav.Link>
            <Nav.Link className="logout">LogOut</Nav.Link>
          </Nav>
        </Navbar>
        <div id="caroussel">
          <Carousel>
            <Carousel.Item>
              <img
                id="imagecaroussel"
                className="d-block w-100"
                src={this.props.post.imagesrc}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                id="imagecaroussel"
                className="d-block w-100"
                src="https://d2u8towkwolubl.cloudfront.net/wp-content/uploads/2019/08/RentalHome.jpg"
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                id="imagecaroussel"
                className="d-block w-100"
                src="https://d2u8towkwolubl.cloudfront.net/wp-content/uploads/2019/08/RentalHome.jpg"
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>
        <div id="context">
          <Accordion defaultActiveKey="0" id="according">
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  <h4>Description</h4>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body> {this.props.post.description} </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                  <h4>Address</h4>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body> {this.props.post.address} </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="2">
                  <h4>Equipment</h4>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  {" "}
                  Price : ${this.props.post.price}
                  <br />
                  Rooms : {this.props.post.rooms}
                  <br />
                  Rating : {this.props.post.rating}
                  <br />
                  Availibility : {this.props.post.availibility}{" "}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
        <Button variant="primary" id="startchat" onClick={this.chat.bind(this)}>
          Chat
        </Button>
        <div id="chatbox">
          <div id="mario-chat">
            <h2>HamHome Chat</h2>
            <div id="chat-window">
              <div id="output"></div>
              <div id="feedback"></div>
            </div>
            <input id="handle" type="text" placeholder="Handle" />
            <input id="message" type="text" placeholder="Message" />
            <button id="send">Send</button>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchedHome;
