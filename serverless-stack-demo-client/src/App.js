import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, NavItem, Navbar } from "react-bootstrap";
import Routes from "./Routes";
import { authUser, signOutUser } from "./libs/awsLib";
import RouteNavItem from "./components/RouteNavItem";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    try {
      if (await authUser()) {
        this.userHasAuthenticated(true);
      }
    }
    catch(e) {
      alert(e);
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = event => {
    signOutUser();

    this.userHasAuthenticated(false);

    this.props.history.push("/login");
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.state.isAuthenticating &&
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">新鴻基</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {this.state.isAuthenticated
                ? [
                    <RouteNavItem href="/qrcode-generator">
                      產生QRcode
                    </RouteNavItem>,
                    <RouteNavItem href="/qrcode-reader">
                      掃描QRcode
                    </RouteNavItem>,
                    <RouteNavItem href="/users">
                      人員管理
                    </RouteNavItem>,
                    <RouteNavItem href="/permissions">
                      權限管理
                    </RouteNavItem>,
                    <NavItem href="#">
                      門禁管理
                    </NavItem>,
                    <NavItem href="#">
                      camera管理
                    </NavItem>,
                    <NavItem onClick={this.handleLogout}>
                      登出
                    </NavItem>
                  ]
                : [
                    <RouteNavItem key={1} href="/signup">
                      註冊
                    </RouteNavItem>,
                    <RouteNavItem key={2} href="/login">
                      登入
                    </RouteNavItem>
                  ]}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default withRouter(App);
