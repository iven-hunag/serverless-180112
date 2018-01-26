import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { invokeApig } from "../libs/awsLib";
import config from "../config";
import "./NewPermission.css";
import { CognitoUserPool } from "amazon-cognito-identity-js";

export default class NewPermission extends Component {
  constructor(props) {
    super(props);

    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    });

    this.state = {
      isLoading: null,
      username: userPool.getCurrentUser().username,
      floors: [1, 2, 3],
      cameras: [1, 2, 3],
      floor_checked:[],
      camera_checked:[]
    };
  }

  createPermission(permission) {
    return invokeApig({
      path: "/permissions",
      method: "POST",
      body: permission
    });
  }

  toggleChange = (event) => {
    var check_type = (event.target.name === "floor")? "floor_checked" : "camera_checked";

    if (event.target.checked) {
      this.setState({[check_type]: [...this.state[check_type], parseInt(event.target.value, 10)]});
    } else {
      var type = this.state[check_type];
      var index = type.indexOf(parseInt(event.target.value, 10));
      type.splice(index, 1);
      this.setState({[check_type]: type});
    }
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await this.createPermission({
        username: this.state.username,
        floors: this.state.floor_checked,
        cameras: this.state.camera_checked
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  createCheckbox = (checkbox_value, index, checkbox_text) => (
    <div className="form-check form-check-inline" key={index}>
      <label>
          {checkbox_value}:
          <input
            name={checkbox_text}
            type="checkbox"
            onChange={this.toggleChange}
            value={checkbox_value}
            id={checkbox_text + "_" + index}
          />
        </label>
    </div>
  )

  floors = () => (
    this.state.floors.map((floor, index) =>
      this.createCheckbox(floor, index, "floor")
    )
  )

  cameras = () => (
    this.state.cameras.map((camera, index) =>
      this.createCheckbox(camera, index, "camera")
    )
  )

  render() {
    return (
      <div className="NewPermission">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="userid" bsSize="large">
            <ControlLabel>UserName</ControlLabel>
            <FormControl
              disabled
              type="text"
              value={this.state.username}
            />
          </FormGroup>
          <FormGroup controlId="floor" bsSize="large">
            <ControlLabel>樓層</ControlLabel>
            {this.floors()}
          </FormGroup>
          <FormGroup controlId="camera" bsSize="large">
            <ControlLabel>Camera</ControlLabel>
            {this.cameras()}
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating…"
          />
        </form>
      </div>
    );
  }
}
