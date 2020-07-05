import React from "react";
import ReactDOM from "react-dom";
import PostView from "./postView.jsx";
import SearchedHome from "./searchedHome.jsx";
import SelectAction from "./selectAction.jsx";
import ProfileView from "./profileView.jsx";
// import ContentEditable from 'react-contenteditable'
import $ from "jquery";
import axios from "axios";
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
class UpdatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }
  seeSelectAction() {
    ReactDOM.render(<SelectAction />, document.getElementById("app"));
  }
  seeProfile() {
    ReactDOM.render(<ProfileView />, document.getElementById("app"));
  }

  componentDidMount() {
    this.setState({ posts: this.props.post });
  }
  closePop() {
    $("#myModal").hide();
    $(".profilePosts1").animate({ opacity: "1" });
    ReactDOM.render(<ProfileView />, document.getElementById("app"));
  }

  closePop1() {
    $("#myModal1").hide();
    $(".profilePosts1").animate({ opacity: "1" });
    ReactDOM.render(<ProfileView />, document.getElementById("app"));
  }

  SaveValue(i) {
    $("#myModal").show();
    $(".profilePosts1").animate({ opacity: "0.2" });
    var priceupdate = $(".priceupdate").eq(i).text();
    var roomsupdate = $(".roomsupdate").eq(i).text();
    var addressupdate = $(".addressupdate").eq(i).text();
    var descriptionupdate = $(".descriptionupdate").eq(i).text();
    console.log(priceupdate, roomsupdate, addressupdate, descriptionupdate);
    axios.post("/update", {
      price: priceupdate,
      rooms: roomsupdate,
      description: descriptionupdate,
      address: addressupdate,
      imagesrc: this.state.posts[i].imagesrc,
    });
  }

  DeletePost(i) {
    $("#myModal1").show();
    $(".profilePosts1").animate({ opacity: "0.2" });
    axios.post("/delete", {
      imagesrc: this.state.posts[i].imagesrc,
    });
    // ReactDOM.render(<ProfileView />, document.getElementById("app"));
  }
  // handleChange(i) {
  //   console.log(event.target.value)
  //   console.log($(".priceupdate").eq(1).text())
  // }
  render() {
    const displayPosts = this.state.posts.map((item, i) => {
      return (
        <div className="profilePosts1" id="updateDiv" key={i}>
          <p className="postDetails">
            <img src={item.imagesrc} width="280px" height="170px" />
          </p>
          <p>
            Price :{" "}
            <div
              className="postDetails priceupdate"
              id="updateDivPrice"
              contenteditable="true"
            >
              {item.price}
            </div>
          </p>
          <p strong>
            Rooms :{" "}
            <div
              className="postDetails roomsupdate"
              id="updateDivPrice"
              contenteditable="true"
            >
              {item.rooms}
            </div>
          </p>
          <p>
            Address :{" "}
            <div
              className="postDetails addressupdate"
              id="updateDivPrice"
              contenteditable="true"
            >
              {item.address}
            </div>
          </p>
          <p>
            Description :
            <div
              className="postDetails descriptionupdate"
              id="updateDivPrice"
              contenteditable="true"
            >
              {item.description}
            </div>
          </p>
          <p className="postDetails">Rating : {item.rating}</p>
          <p className="postDetails">Date : {item.date}</p>
          <button
            className="postDetails"
            onClick={this.SaveValue.bind(this, i)}
          >
            Save
          </button>
          <button
            className="postDetails"
            onClick={this.DeletePost.bind(this, i)}
          >
            Delete
          </button>
        </div>
      );
    });
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
        <div id="myModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Delete Alert</h4>
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>

              <div class="modal-body">
                Are you sure you want to edit this post
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-danger"
                  data-dismiss="modal"
                  onClick={this.closePop.bind(this)}
                >
                  cancel
                </button>
                <button
                  type="button"
                  class="btn btn-success"
                  data-dismiss="modal"
                  onClick={this.closePop.bind(this)}
                >
                  update
                </button>
              </div>
            </div>
          </div>
        </div>
        <div id="myModal1">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Delete Alert</h4>
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>

              <div class="modal-body">
                Are you sure you want to delete this post
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-danger"
                  data-dismiss="modal"
                  onClick={this.closePop1.bind(this)}
                >
                  delete
                </button>
                <button
                  type="button"
                  class="btn btn-success"
                  data-dismiss="modal"
                  onClick={this.closePop1.bind(this)}
                >
                  cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        {displayPosts}
      </div>
    );
  }
}
export default UpdatePost;
