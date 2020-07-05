import React from "react";
import ReactDOM from "react-dom";
import PostView from "./postView.jsx";
import SearchedHome from "./searchedHome.jsx";
import SelectAction from "./selectAction.jsx";
import ProfileView from "./profileView.jsx";
import ContentEditable from 'react-contenteditable'
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
    this.setState({posts: this.props.post})
  }
  SaveValue(i) {
    var priceupdate = $(".priceupdate").eq(i).text();
    var roomsupdate = $(".roomsupdate").eq(i).text();
    var addressupdate = $(".addressupdate").eq(i).text();
    var descriptionupdate = $(".descriptionupdate").eq(i).text();
    console.log(priceupdate,roomsupdate,addressupdate,descriptionupdate)
    axios.post("/update", {
      price:priceupdate,
      rooms:roomsupdate,
      description:descriptionupdate,
      address:addressupdate,
      imagesrc:this.state.posts[i].imagesrc
    })
  }

  DeletePost(i) {
    axios.post("/delete", {
      imagesrc:this.state.posts[i].imagesrc
    })
    ReactDOM.render(<ProfileView />, document.getElementById("app"));
  }
  // handleChange(i) {
  //   console.log(event.target.value)
  //   console.log($(".priceupdate").eq(1).text())
  // }
  render() {
    const displayPosts = this.state.posts.map((item, i) => {
      return (
        <div className="profilePosts1" key={i}>
          <p className="postDetails">
            <img src={item.imagesrc} width="280px" height="170px" />
          </p>
          <p>Price : <div className="postDetails priceupdate" contenteditable="true">{item.price}</div></p>
          {/* <ContentEditable className="postDetails priceupdate" html={item.price} onChange={this.handleChange.bind(this,i)} /> */}
          {/* <input type="text" className="postDetails priceupdate" value={item.price} onChange={this.handleChange.bind(this,i)} /> */}
          {/* Price : ${item.price} */}
          {/* </input> */}
          {/* <input type="text" className="postDetails roomsupdate" value={item.rooms} /> */}
          <p>Rooms : <div className="postDetails roomsupdate" contenteditable="true">{item.rooms}</div></p>
          {/* /*Rooms : {item.rooms}*/}
          {/* <input
            type="text"
            className="postDetails addressupdate"
            value={item.address}
          /> */}
          <p>Address : <div className="postDetails addressupdate" contenteditable="true">{item.address}</div></p>
          {/* <input
            type="text"
            className="postDetails descriptionupdate"
            value={item.description}
          /> */}
          <div className="postDetails descriptionupdate" contenteditable="true">{item.description}</div>
          <p className="postDetails">Rating : {item.rating}</p>
          <p className="postDetails">Date : {item.date}</p>
          <button className="postDetails" onClick={this.SaveValue.bind(this, i)}>Save</button>
          <button className="postDetails" onClick={this.DeletePost.bind(this, i)}>Delete</button>
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
         {displayPosts} 
      </div>
    );
  }
}
export default UpdatePost;