import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import PropTypes from "prop-types";
import axios from "axios";
import {
  faQuestion,
  faSearch,
  faLifeRing,
  faHeartbeat,
  faSmile,
  faHome,
  faPuzzlePiece,
  faTrophy,
  faMapSigns,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, InputGroup, CardText } from "reactstrap";
import {
  Card,
  CardBody,
  Label,
  Form,
  InputGroupAddon,
  Col,
  Row,
  Table,
  Breadcrumb,
  BreadcrumbItem,
  FormText,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  FormGroup,
  Input
} from "reactstrap";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  UncontrolledDropdown
} from "reactstrap";
import _ from "lodash"; //lodash was used to make even easier
import { isNullOrUndefined } from "util";
import Dropdown from "reactstrap/lib/Dropdown";
import Container from "reactstrap/lib/Container";
import { findDOMNode } from "react-dom";
import $ from "jquery";
const rideGroup = ["Always", "Sometimes", "Never"];
const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      users: [],
      userFiltered: []
    };
  }

  componentDidMount() {
    //request to bring users data
    axios.get(`https://jsonplaceholder.typicode.com/users`).then(res => {
      const users = res.data;
      users.forEach(element => {
        element["ride"] = this.randomData(rideGroup);
        element["days"] = this.randomData(week);
      });
      //console.log(userDetails);
      this.setState({ users: users });
      //this.getOtherData();
    });
  }
  randomData(array) {
    let min = 1;
    var max = array.length;
    // will return two items randomly from the array using lodash
    if (max === 3) {
      max = 1;
    }
    const randomData = _.sampleSize(
      array,
      Math.floor(Math.random() * (max - min + 1) + min)
    );
    return randomData.toLocaleString();
  }

  getOtherData() {
    const { users } = this.state;
    const user = users;
    //request to bring users data
    axios.get(`https://jsonplaceholder.typicode.com/albums`).then(res => {
      const usersAlbums = res.data;
      console.log(usersAlbums);

      let usersAlbumsFiltered = [];
      usersAlbumsFiltered = _.filter(usersAlbums, e => {
        if (
          Object.values(e).includes(usersAlbums[0].userId) ||
          Object.values(e)
            .toLocaleString()
            .toLowerCase()
            .includes(usersAlbums.userId)
        ) {
          console.log(e);
          return e;
        }
        console.log(usersAlbumsFiltered);
        //this.setState({ users: users });
      });
    });
    //request to bring users data
    axios.get(`https://jsonplaceholder.typicode.com/photos`).then(res => {
      const usersPhotos = res.data;

      //console.log(usersPhotos);
      //this.setState({ users: usersPhotos });
    });
    //request to bring users data
    axios.get(`https://jsonplaceholder.typicode.com/posts`).then(res => {
      const usersPosts = res.data;
      //console.log(usersPosts);
      //this.setState({ users: usersPosts });
    });
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  //set a format for each row to make easier to show
  userRow = (key, users) => {
    const user = users;

    return (
      <tr
        class="rowuser"
        key={user.id}
        refs={user.id}
        onMouseEnter={this.hoverOn}
        onMouseLeave={this.hoverOff}
      >
        <td>{user.username}</td>

        <td>{user.name}</td>
        <td class="mark">{user.email}</td>
        <td class="mark">{user.address.city}</td>
        <td>{user.ride}</td>
        <td>{user.days}</td>
        <td class="mark">Posts</td>
        <td class="mark">albums</td>
        <td>photos</td>
        <td className={`${user.id}`}>
          <FontAwesomeIcon icon={faTrash} />
        </td>
      </tr>
    );
  };

  hoverOn = () => {
    const { users } = this.state;
    users.forEach(element => {
      document.getElementsByClassName(`${element.id}`)[0].style.display =
        "block";
    });
  };
  hoverOff = () => {
    const { users } = this.state;
    users.forEach(element => {
      document.getElementsByClassName(`${element.id}`)[0].style.display =
        "none";
    });
  };
  //fuction to make a search in content
  filterContent = option => {
    const { users } = this.state;
    let optionChoosed = option.target.value;
    let userFiltered = [];
    userFiltered = _.filter(users, e => {
      // Verifica e busca usuários que algum atributo digitado for igual ou pertencer a um usuário
      if (
        Object.values(e).includes(optionChoosed) ||
        Object.values(e)
          .toLocaleString()
          .toLowerCase()
          .includes(optionChoosed.toLowerCase())
      ) {
        return e;
      }
    });

    this.setState({ userFiltered });
  };
  render() {
    return (
      <React.Fragment>
        <div id="top">
          <Navbar color="light" light expand="md">
            <div id="backicon">
              <div class="square">
                <FontAwesomeIcon class="question" icon={faQuestion} />
              </div>{" "}
            </div>
            <NavbarBrand id="brand" href="/">
              Venturus Sports{" "}
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem />
                <div className="textname" data-letters="JB" />
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle className="textname" nav caret>
                    Jason Bourne
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Friends List</DropdownItem>
                    <DropdownItem>Saved Itens</DropdownItem>
                    <DropdownItem>Notifications</DropdownItem>
                    <DropdownItem>User Preferences</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Log Out</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
        </div>

        <div id="breadcrumb">
          <Breadcrumb tag="nav" listTag="div">
            <BreadcrumbItem tag="a" href="#">
              <FontAwesomeIcon icon={faHome} />
            </BreadcrumbItem>
            <BreadcrumbItem tag="a" href="#">
              Data
            </BreadcrumbItem>
            <BreadcrumbItem active tag="span">
              Users
            </BreadcrumbItem>
          </Breadcrumb>
        </div>

        <div class="header">
          <div className="headerdisplay">
            <Col md={4}>
              <div style={{ display: "flex", marginTop: "20px" }}>
                <div>
                  <FontAwesomeIcon class="iconheader" icon={faPuzzlePiece} />
                </div>
                <div style={{ marginLeft: "15px" }}>
                  <h6 class="headersub">Sport type</h6>
                  <h4 class="headertitle">Cycling</h4>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div style={{ display: "flex", marginTop: "20px" }}>
                <div>
                  <FontAwesomeIcon class="iconheader" icon={faTrophy} />
                </div>
                <div style={{ marginLeft: "15px" }}>
                  <h6 class="headersub">Mode</h6>
                  <h4 class="headertitle">Advanced</h4>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div style={{ display: "flex", marginTop: "20px" }}>
                <div>
                  <FontAwesomeIcon class="iconheader" icon={faMapSigns} />
                </div>
                <div style={{ marginLeft: "15px" }}>
                  <h6 class="headersub">Route</h6>
                  <h4 class="headertitle">30 miles</h4>
                </div>
              </div>
            </Col>
          </div>
        </div>
        <Container>
          <div className="App">
            <div className="animated fadeIn">
              <Row form>
                <Col className="title" md={2}>
                  Users
                </Col>
                <Col md={7} style={{ marginTop: "25px" }}>
                  <div class="divider" />
                </Col>

                <Col md={3}>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <FontAwesomeIcon
                          icon={faSearch}
                          style={{ color: "grey", marginTop: "12px" }}
                        />
                      </InputGroupAddon>

                      <Input
                        type="search"
                        onChange={this.filterContent}
                        placeholder="Filter table content"
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                {/* <Col md={3} /> */}
              </Row>
              <Row>
                <Col xl={12}>
                  <Card>
                    <CardBody>
                      <Table responsive hover>
                        <thead>
                          <tr>
                            <th scope="col">Username</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">City</th>
                            <th scope="col">Ride in group</th>
                            <th scope="col">Day of the week</th>
                            <th scope="col">Posts</th>
                            <th scope="col">Albums</th>
                            <th scope="col">Photos</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.users &&
                            this.state.users.length > 0 &&
                            (this.state.userFiltered.length > 0
                              ? this.state.userFiltered
                              : this.state.users
                            ).map((user, index) => this.userRow(index, user))}
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
            <div>
              {/* <Container> */}
              <div className="animated fadeIn">
                <Row form>
                  <Col className="title" md={12}>
                    Registration
                  </Col>{" "}
                </Row>
                <Row style={{ marginTop: "20px" }}>
                  <Col md={4}>
                    <h4 class="mark">Need Help?</h4>
                    <div style={{ display: "flex", marginTop: "20px" }}>
                      <div>
                        <FontAwesomeIcon class="icon" icon={faLifeRing} />
                      </div>
                      <div style={{ marginLeft: "25px" }}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                      </div>
                    </div>
                  </Col>
                  <Col md={4}>
                    <h4 class="mark">Why register?</h4>
                    <div style={{ display: "flex", marginTop: "20px" }}>
                      <div>
                        <FontAwesomeIcon class="icon" icon={faHeartbeat} />
                      </div>
                      <div style={{ marginLeft: "25px" }}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                      </div>
                    </div>
                  </Col>
                  <Col md={4}>
                    <h4 class="mark">What people are saying...</h4>
                    <div style={{ display: "flex", marginTop: "20px" }}>
                      <div>
                        <FontAwesomeIcon class="icon" icon={faSmile} />
                      </div>
                      <div style={{ marginLeft: "25px" }}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row style={{ marginTop: "40px" }}>
                  <div class="divider" />
                </Row>

                <Row id="rowform">
                  <Form style={{ width: "100%" }}>
                    <div id="formid">
                      <Col md={6}>
                        <FormGroup>
                          <Label>Username</Label>
                          <Input type="text" name="username" />
                        </FormGroup>
                        <FormGroup>
                          <Label>Name</Label>
                          <Input type="text" name="name" />
                        </FormGroup>
                        <FormGroup>
                          <Label>Email</Label>
                          <Input type="email" name="email" />
                        </FormGroup>
                        <FormGroup>
                          <Button id="savebutton">Save</Button>

                          <Button id="button">Discard</Button>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label>City</Label>
                          <Input type="text" name="city" />
                        </FormGroup>
                        <Label className="labelmargin">Ride in group?</Label>
                        <FormGroup
                          id="margincustom"
                          /* tag="fieldset" */
                        >
                          <div style={{ display: "inline-flex" }}>
                            <FormGroup check id="alradio">
                              <Label check>
                                <Input type="radio" name="always" />{" "}
                                &nbsp;&nbsp;Always
                              </Label>
                            </FormGroup>
                            <FormGroup check>
                              <Label check>
                                <Input type="radio" name="sometimes" />{" "}
                                &nbsp;&nbsp;Sometimes
                              </Label>
                            </FormGroup>
                            <FormGroup check>
                              <Label check>
                                <Input type="radio" name="never" />{" "}
                                &nbsp;&nbsp;Never
                              </Label>
                            </FormGroup>
                          </div>
                        </FormGroup>{" "}
                        <Label>Days of the week</Label>
                        <FormGroup>
                          <div style={{ display: "inline-flex" }}>
                            <FormGroup check id="alradio">
                              <Label check>
                                <Input type="checkbox" />
                                &nbsp; Sun
                              </Label>
                            </FormGroup>
                            <FormGroup id="paddingcustom" check>
                              <Label check>
                                <Input type="checkbox" /> &nbsp;&nbsp;Mon
                              </Label>
                            </FormGroup>
                            <FormGroup id="paddingcustom" check>
                              <Label check>
                                <Input type="checkbox" /> &nbsp;&nbsp;Tue
                              </Label>
                            </FormGroup>
                            <FormGroup id="paddingcustom" check>
                              <Label check>
                                <Input type="checkbox" /> &nbsp;&nbsp;Wed
                              </Label>
                            </FormGroup>
                            <FormGroup id="paddingcustom" check>
                              <Label check>
                                <Input type="checkbox" /> &nbsp;&nbsp;Thr
                              </Label>
                            </FormGroup>
                            <FormGroup id="paddingcustom" check>
                              <Label check>
                                <Input type="checkbox" /> &nbsp;&nbsp;Fri
                              </Label>
                            </FormGroup>
                            <FormGroup id="paddingcustom" check>
                              <Label check>
                                <Input type="checkbox" /> &nbsp;&nbsp;Sat
                              </Label>
                            </FormGroup>
                          </div>
                        </FormGroup>
                      </Col>
                    </div>
                  </Form>
                </Row>
              </div>
            </div>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}
Breadcrumb.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  listTag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
  listClassName: PropTypes.string,
  cssModule: PropTypes.object,
  children: PropTypes.node,
  "aria-label": PropTypes.string
};

BreadcrumbItem.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  active: PropTypes.bool,
  className: PropTypes.string,
  cssModule: PropTypes.object
};
InputGroup.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  size: PropTypes.string,
  className: PropTypes.string
};

InputGroupAddon.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  addonType: PropTypes.oneOf(["prepend", "append"]).isRequired,
  className: PropTypes.string
};
export default App;
