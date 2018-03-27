import React, { Component } from "react";
import styled from "styled-components";

const Year = styled.span`
  font-size: 1em;
`;

export default class ReleaseDate extends Component {
  render() {
    var date = this.props.release_date;
    if (!date) return <div>''</div>;
    let arr = date.split("-");
    return <Year>{arr[0]}</Year>;
  }
}
