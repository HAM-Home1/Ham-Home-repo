import React from "react";
import ReactDOM from "react-dom";
import ProfileView from "./profileView.jsx";
import { BrowserRouter as Link } from "react-router-dom";
import {
  InputGroup,
  Form,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  Col,
  FormLabel,
  Nav,
  Navbar,
} from "react-bootstrap";
import SelectAction from "./selectAction.jsx";
import $ from "jquery";
import axios from "axios";

class PostView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
  }
  //   onFormSubmit(e){
  //     e.preventDefault();
  //     const formData = new FormData();
  //     formData.append('myImage',this.state.file);
  //     const config = {
  //         headers: {
  //             'content-type': 'multipart/form-data'
  //         }
  //     };
  //     axios.post("/upload",formData,config)
  //         .then((response) => {
  //             alert("The file is successfully uploaded");
  //         }).catch((error) => {
  //     });
  // }
  // onChange(e) {
  //     this.setState({file:e.target.files[0]});
  // }

  handleClick() {
    const username = $("#username").val();
    const price = $("#price").val();
    const rooms = $("#rooms").val();
    const imagesrc = "./uploads/" + $("#imagesrc").val().slice(12);
    const address = $("#address").val();
    const description = $("#description").val();
    const date = new Date().toString();
    const rating = 0;

    if (
      username !== "" &&
      price !== "" &&
      rooms !== "" &&
      imagesrc !== "" &&
      address !== "" &&
      description !== ""
    ) {
      axios.post("/posts", {
        username,
        imagesrc,
        price,
        rooms,
        address,
        rating: rating,
        description,
        date: date,
        availibility: true,
        messages: "",
      });
      ReactDOM.render(<ProfileView />, document.getElementById("app"));
    }
  }

  // seeProfile() {
  //   ReactDOM.render(<ProfileView />, document.getElementById("app"));
  // }

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>HAMhome</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link></Nav.Link>
            <Link to={"/profile"}>
              <Nav.Link>Profile</Nav.Link>
            </Link>
            <Link to={"/"}>
              <Nav.Link className="logout">LogOut</Nav.Link>
            </Link>
          </Nav>
        </Navbar>
        <div id="first">
          <Form className="rent">
            <Form.Group as={Col}>
              <Form.Label>
                {" "}
                <h5>username :</h5>{" "}
              </Form.Label>
              <Form.Control
                type="text"
                id="username"
                value="Mohamed Amine Oueslati"
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>
                {" "}
                <h5>Image :</h5>{" "}
              </Form.Label>
              <Form.File
                className="position-relative"
                required
                name="image"
                id="imagesrc"
                // onChange={handleChange} isInvalid={!!errors.file} feedback={errors.file} feedbackTooltip
              />
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>
                {" "}
                <h5>Price :</h5>{" "}
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Price"
                  aria-describedby="inputGroupPrepend"
                  name="price"
                  id="price"

                  // value={values.username} onChange={handleChange} isInvalid={!!errors.username}
                />
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                </InputGroup.Prepend>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>
                {" "}
                <h5>Rooms :</h5>{" "}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="0 bedroom(s) - 0 bathroom(s)"
                id="rooms"
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>
                <h5>Address :</h5>
              </Form.Label>
              <Form.Control placeholder="1234 Main St ,State" id="address" />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>
                {" "}
                <h5>Description :</h5>{" "}
              </Form.Label>
              <textarea
                className="form-control"
                rows="5"
                placeholder="describe your house"
                id="description"
              ></textarea>
            </Form.Group>
          </Form>
        </div>
        <div id="second">
          {" "}
          <center>
            {" "}
            <h1>Important Note</h1>
          </center>{" "}
          <ul>
            <li>
              <h4>Never communicate your card number</h4>
            </li>
            <li>
              <h4>Make sure the photos are real</h4>
            </li>
            <li>
              <h4>precise the exact adress </h4>
            </li>
            <li>
              <h4>use the Google map</h4>
            </li>
          </ul>
          <br />
          <center>
            <Link to={"/profile"}>
              <Button
                as={Col}
                variant="primary"
                type="submit"
                id="submitPost"
                onClick={this.handleClick.bind(this)}
              >
                Submit
              </Button>
            </Link>
          </center>
        </div>
      </div>
    );
  }
}

export default PostView;
