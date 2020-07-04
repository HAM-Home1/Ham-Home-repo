// import React from "react";
// import ReactDOM from "react-dom";
// import PostView from './postView.jsx';
// import SearchedHome from './searchedHome.jsx';
// import SelectAction from './selectAction.jsx';
// import ProfileView from './profileView.jsx';
// // import $ from "jquery";
// import axios from "axios";
// import {
//   Form,
//   Button,
//   FormGroup,
//   FormControl,
//   ControlLabel,
//   Col,
//   FormLabel,
//   Navbar,
//   Nav,
//   Card,
//   Carousel,
//   CarouselItem,
//   Accordion,
// } from "react-bootstrap";

// class UpdatePost extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       posts: []
//     }
//   }
//   seeSelectAction() {
//     ReactDOM.render(<SelectAction />, document.getElementById("app"));
//   }

//   seeProfile() {
//     ReactDOM.render(<ProfileView />, document.getElementById("app"));
//   }

//   render() {
//       const displayPosts = this.props.post.map((item,i)=> {
//           console.log(item)
//         return (
//           <div className= "profilePosts1" key={i} >
//           <p className="postDetails"><img src={item.imagesrc} width='280px' height='170px'/></p>
//           <p className="postDetails">Price : ${item.price}</p>
//           <p className="postDetails">Rooms : {item.rooms}</p>
//           <p className="postDetails">Address : {item.address}</p>
//           <p className="postDetails">Description : {item.description}</p>
//           <p className="postDetails">Rating : {item.rating}</p>
//           <p className="postDetails">Date : {item.date}</p>
//           <button className="postDetails">Edit</button>
//           {/* <p>{this.props.description}</p>
//           <p>{this.props.date}</p>
//           <p>{this.props.rating}</p> */}
//         </div>
//         )
//       })
//     return (
//         <div>
//             <Navbar bg="dark" variant="dark">
//           <Navbar.Brand onClick={this.seeSelectAction.bind(this)}>HAMhome</Navbar.Brand>
//           <Nav className="mr-auto">
//             <Nav.Link></Nav.Link>
//             <Nav.Link onClick={this.seeProfile.bind(this)}>Profile</Nav.Link>
//             <Nav.Link className="logout">LogOut</Nav.Link>
//           </Nav>
//         </Navbar>
//         {displayPosts}
//         <div className="modal" id="myModal">
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h4 className="modal-title"></h4>
//               </div>
//               <input className="modal-body" id="newValue" />
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-danger"
//                   data-dismiss="modal"
//                   // onClick={this.hideBox.bind(this)}
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         </div>
//     )
//   }
// }

// export default UpdatePost;

import React from "react";
import ReactDOM from "react-dom";
import PostView from "./postView.jsx";
import SearchedHome from "./searchedHome.jsx";
import SelectAction from "./selectAction.jsx";
import ProfileView from "./profileView.jsx";
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
  SaveValue() {
    console.log($("input").val());
  }
  render() {
    const displayPosts = this.props.post.map((item, i) => {
      console.log(item);
      return (
        <div className="profilePosts1" key={i}>
          <p className="postDetails">
            <img src={item.imagesrc} width="280px" height="170px" />
          </p>
          <input type="text" className="postDetails" placeholder={item.price} />
          {/* Price : ${item.price} */}
          {/* </input> */}
          <input type="text" className="postDetails" placeholder={item.rooms} />
          {/* /*Rooms : {item.rooms}*/}
          <input
            type="text"
            className="postDetails"
            placeholder={item.address}
          />
          <input
            type="text"
            className="postDetails"
            placeholder={item.description}
          />
          <p className="postDetails">Rating : {item.rating}</p>
          <p className="postDetails">Date : {item.date}</p>
          <button
            className="postDetails"
            onClick={this.SaveValue.bind(this, i)}
          >
            Save
          </button>
          {/* <p>{this.props.description}</p>
          <p>{this.props.date}</p>
          <p>{this.props.rating}</p> */}
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
