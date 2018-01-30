import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { invokeApig } from "../libs/awsLib";
import "./UpdatePermission.css";

export default class UpdatePermission extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      isDeleting: null,
      isChecked: true,
      note: null,
      content: "",
      floors: [1, 2, 3],
      cameras: [1, 2, 3],
      floor_checked:[],
      camera_checked:[]
    };
  }

  async componentDidMount() {
    try {
      const results = await this.getNote();
      this.setState({
        note: results,
        content: results.content,
        permission: results,
        floor_checked: results.floors,
        camera_checked: results.cameras
      });
    } catch (e) {
      alert(e);
    }
  }

  getNote() {
    return invokeApig({ path: `/permissions/${this.props.match.params.id}` });
  }

  deleteNote() {
    return invokeApig({
      path: `/permissions/${this.props.match.params.id}`,
      method: "DELETE"
    });
  }

  saveNote(note) {
    return invokeApig({
      path: `/permissions/${this.props.match.params.id}`,
      method: "PUT",
      body: note
    });
  }

  validateForm() {
    // return this.state.content.length > 0;
  }

  formatFilename(str) {
    return str.length < 50
      ? str
      : str.substr(0, 20) + "..." + str.substr(str.length - 20, str.length);
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
  }

  createCheckbox = (checkbox_value, index, checkbox_text, checked_value) => (
    <div className="form-check form-check-inline" key={index}>
      <label>
          {checkbox_value}:
          <input
            checked={checked_value}
            name={checkbox_text}
            type="checkbox"
            onChange={this.toggleChange}
            value={checkbox_value}
          />
        </label>
    </div>
  )

  floors = () => (
    this.state.floors.map((floor, index) => (
      this.createCheckbox(floor, index, "floor", (this.state.floor_checked.indexOf(floor) === -1?false:true))
    ))
  )

  cameras = () => (
    this.state.cameras.map((camera, index) =>
      this.createCheckbox(camera, index, "camera", (this.state.camera_checked.indexOf(camera) === -1?false:true))
    )
  )

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
      await this.saveNote({
        ...this.state.note,
        floors: this.state.floor_checked,
        cameras: this.state.camera_checked
      });
      alert("修改成功");      
    } catch (e) {
      alert(e);
    }
    this.setState({ isLoading: false });
  }

  handleDelete = async event => {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this permissions?"
    );

    if (!confirmed) {
      return;
    }

    this.setState({ isDeleting: true });

    try {
      await this.deleteNote();
      this.props.history.push("/permissions");
    } catch (e) {
      alert(e);
      this.setState({ isDeleting: false });
    }
  }

  render() {
    return (
      <div className="UpdatePermission">
        {this.state.note &&
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="floor" bsSize="large">
              <ControlLabel>樓層</ControlLabel>
              {this.floors()}
            </FormGroup>
            <FormGroup controlId="camera" bsSize="large">
              <ControlLabel>camera</ControlLabel>
              {this.cameras()}
            </FormGroup>
            {/*this.state.note.attachment &&
              <FormGroup>
                <ControlLabel>Attachment</ControlLabel>
                <FormControl.Static>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={this.state.note.attachment}
                  >
                    {this.formatFilename(this.state.note.attachment)}
                  </a>
                </FormControl.Static>
              </FormGroup>*/}
            <FormGroup controlId="file">
              {!this.state.note.attachment &&
                <ControlLabel>Attachment</ControlLabel>}
              <FormControl onChange={this.handleFileChange} type="file" />
            </FormGroup>
            <LoaderButton
              block
              bsStyle="primary"
              bsSize="large"
              // disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Save"
              loadingText="Saving…"
            />
            <LoaderButton
              block
              bsStyle="danger"
              bsSize="large"
              isLoading={this.state.isDeleting}
              onClick={this.handleDelete}
              text="Delete"
              loadingText="Deleting…"
            />
          </form>}
      </div>
    );
  }
}
