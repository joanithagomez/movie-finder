import React, { Component } from "react";
import styled from "styled-components";

const Year = styled.span`
  font-size: 0.8em;
  font-weight: 300;
  opacity: 0.8;

  @media screen and (min-width: 45em) {
    font-weight: 200;
    font-size: 1em;
  }
`;

export default class ReleaseDate extends Component {
  render() {
    var date = this.props.release_date;
    if (!date) return <div></div>;
    let arr = date.split("-");
    return <Year>{arr[0]}</Year>;
  }
}
