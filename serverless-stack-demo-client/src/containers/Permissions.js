import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { invokeApig } from '../libs/awsLib';
import "./Permissions.css";

export default class Permissions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      Permissions: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const results = await this.Permissions();
      this.setState({ Permissions: results });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  Permissions() {
    return invokeApig({ path: "/permissions/list" });
  }

  handleNoteClick = event => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute("href"));
  }

  renderNotesList(Permissions) {
    return [{}].concat(Permissions).map(
      (permission, i) =>
        i !== 0
          ? <ListGroupItem
              key={permission.permissionId}
              href={`/permissions/${permission.permissionId}`}
              onClick={this.handleNoteClick}
            >
              {"Created: " + new Date(permission.createdAt).toLocaleString()}
            </ListGroupItem>
          : <ListGroupItem
              key="new"
              href="/permissions/new"
              onClick={this.handleNoteClick}
            >
              <h4>
                <b>{"\uFF0B"}</b> 新增權限
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
        <PageHeader>權限管理</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderNotesList(this.state.Permissions)}
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
