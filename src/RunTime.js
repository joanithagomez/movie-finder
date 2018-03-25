import React, { Component } from "react";
import styled from "styled-components";

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
    fetch(
     "https://api.themoviedb.org/3/movie/" +
      this.props.id +
       "?api_key=c3111a004530dd2c7aede7c5e398885e",
     {
       method: "GET"
     }
   )
     .then(response => response.json())
     .then(res => {
       // console.log(res);
       this.setState({ runtime: res.runtime });
   });

  }

  
  render() {
    if (!this.state.runtime) return <p />;

    return <Time> {this.state.runtime && <span>{this.state.runtime} mins</span>}</Time>;
  }
}

const Time = styled.div`opacity: 0.8;`;
