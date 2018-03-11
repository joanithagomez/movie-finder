import React, { Component } from "react";
import styled from "styled-components";
import "whatwg-fetch";

class People extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credits: {}
    };
  }

  componentDidMount() {
    this.fetchCredits();
  }

  fetchCredits() {
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        this.props.match.params.id +
        "/credits?api_key=c3111a004530dd2c7aede7c5e398885e",
      {
        method: "GET"
      }
    )
      .then(response => response.json())
      .then(res => {
        // console.log(res);
        this.setState({ credits: res });
      });
  }

  renderCast(cast) {
    let arr = [];
    let i;
    let headshotUrl;
    let end;
    if (!cast || cast.length === 0) return;

    if (cast.length < 3) end = cast.length;
    else end = 3;

    arr.push(<h4>Cast</h4>);
    for (i = 0; i < end; i++) {
      // console.log(headshotUrl);
      if (this.state.credits.cast[i].profile_path != null)
        headshotUrl =
          this.props.baseUrl + "w185" + this.state.credits.cast[i].profile_path;
      else {
        headshotUrl =
          "https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png";
      }

      arr.push(
        <span value={i} key={"cast" + i}>
          <img src={headshotUrl} alt="cast" />
          {cast[i].name} - {cast[i].character}
          {/* <Link to={"/movie/" + recoms[i].id}>{recoms[i].title}</Link> */}
        </span>
      );
    }
    return arr;
  }

  renderCrew(crew) {
    let arr = [];
    let i;
    let headshotUrl;
    let end;

    if (!crew || crew.length === 0) {
      return;
    }

    if (crew.length < 3) end = crew.length;
    else end = 3;

    arr.push(<h4>Crew</h4>);
    for (i = 0; i < end; i++) {
      if (this.state.credits.crew[i].profile_path != null)
        headshotUrl =
          this.props.baseUrl + "w185" + this.state.credits.crew[i].profile_path;
      else {
        headshotUrl =
          "https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png";
      }

      arr.push(
        <span value={i} key={"crew" + i}>
          <img src={headshotUrl} alt="crew" />
          {crew[i].name} : {crew[i].job}
          {/* <Link to={"/movie/" + recoms[i].id}>{recoms[i].title}</Link> */}
        </span>
      );
    }
    return arr;
  }

  render() {
    // if (this.state.credits.crew) {
    // }
    return (
      <div>
        {this.renderCrew(this.state.credits.crew)}

        {this.renderCast(this.state.credits.cast)}
      </div>
    );
  }
}

export default People;
