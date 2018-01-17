import React, { Component } from "react";
import "./CodeReader.css";
import QrReader from "react-qr-reader";

export default class CodeReader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      delay: 300,
      result: 'No result',
    };
    this.handleScan = this.handleScan.bind(this);
  }

  handleScan(data){
    if(data){
      this.setState({
        result: data,
      })
    }
  }

  handleError(err){
    console.error(err)
  }

  render() {
    return (
      <div className="CodeReader">
        <QrReader
          delay={this.state.delay}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '20%' }}
          />
        <p>掃描結果：{this.state.result}</p>
      </div>
    );
  }
}
