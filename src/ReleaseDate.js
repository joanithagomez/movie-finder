import React, { Component } from "react";
import styled from "styled-components";

const Year = styled.div`
  opacity: 0.8;
  font-size: 0.8em;
`;

class ReleaseDate extends Component {
  render() {
    var date = this.props.release_date;
    if (!date) return <div>''</div>;
    let arr = date.split("-");
    return <Year>{arr[0]}</Year>;
  }
}

export default ReleaseDate;
