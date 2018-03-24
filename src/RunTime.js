import React, { Component } from "react";
import styled from "styled-components";
const mdb = require("moviedb")("c3111a004530dd2c7aede7c5e398885e");

export default class RunTime extends Component {
  constructor() {
    super();
    this.state = {
      runtime: ""
    };
  }
  componentDidMount() {
    this.fetchInfo();
  }

  fetchInfo() {
    mdb.movieInfo({ id: this.props.id }, (err, res) => {
      // console.log(res);
      if (res) this.setState({ runtime: res.runtime });
    });
  }

  render() {
    if (!this.state.runtime) return <p />;

    return <Time> {this.state.runtime && <span>{this.state.runtime} mins</span>}</Time>;
  }
}

const Time = styled.div`opacity: 0.8;`;
