import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { invokeApig } from '../libs/awsLib';
import "./Users.css";

export default class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      users: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const results = await this.users();
      this.setState({ users: results });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  users() {
    return invokeApig({ path: "/users" });
  }

  handleNoteClick = event => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute("href"));
  }

  renderNotesList(users) {
    return [{}].concat(users).map(
      (user, i) =>
        i !== 0
          ? <ListGroupItem
              key={user.userId}
              href={`/users/${user.userId}`}
              onClick={this.handleNoteClick}
              header={user.content.trim().split("\n")[0]}
            >
              {"Created: " + new Date(user.createdAt).toLocaleString()}
            </ListGroupItem>
          : <ListGroupItem
              key="new"
              href="/users/new"
              onClick={this.handleNoteClick}
            >
              <h4>
                <b>{"\uFF0B"}</b> 新增人員
              </h4>
            </ListGroupItem>
    );
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p>A simple note taking app</p>
        <div>
          <Link to="/login" className="btn btn-info btn-lg">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
          </Link>
        </div>
      </div>
    );
  }

  renderNotes() {
    return (
      <div className="user">
        <PageHeader>人員管理</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderNotesList(this.state.users)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="user">
        {this.props.isAuthenticated ? this.renderNotes() : this.renderLander()}
      </div>
    );
  }
}
