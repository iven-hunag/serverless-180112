import React, { Component } from "react";
import "./CodeGenerator.css";
import QRCode from "qrcode.react";

export default class CodeGenerator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "http://www.google.com"
    };
    this.handleEmail = this.handleEmail.bind(this);
  }

  handleEmail(event){
        this.setState({content: event.target.value});
  }

  render() {
    return (
      <div className="CodeGenerator">
        <div>
        請輸入連結：<input onChange={this.handleEmail}/>
        <br />
        連結：{this.state.content}
        </div><br />
        <QRCode value={this.state.content} />
      </div>
    );
  }
}
