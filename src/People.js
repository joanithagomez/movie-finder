import React, { Component } from "react";
import styled from "styled-components";
import "whatwg-fetch";

const PhotoCard = styled.div`
  color: white;
  display: inline-block;
   justify-content: center;
   ${"" /* border: 1px solid red; */}
> div
    display:flex;
    ${"" /* border: 1px solid yellow; */};
  }
  > h4{
    display: block;
  }
  > div > p{
    font-weight: 100;
    font-size: 0.8em;
  }
`;

const Wrapper = styled.div`display: block;`;

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
        <PhotoCard>
          <div value={i} key={"cast" + i}>
            <img src={headshotUrl} alt="cast" />
            <p>{cast[i].name}</p>
            <p>{cast[i].character}</p>
            {/* <Link to={"/movie/" + recoms[i].id}>{recoms[i].title}</Link> */}
          </div>
        </PhotoCard>
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
        <PhotoCard>
          <div value={i} key={"crew" + i}>
            <img src={headshotUrl} alt="crew" />
            <p>{crew[i].name}</p>
            <p>{crew[i].job}</p>
            {/* <Link to={"/movie/" + recoms[i].id}>{recoms[i].title}</Link> */}
          </div>
        </PhotoCard>
      );
    }
    return arr;
  }

  render() {
    // if (this.state.credits.crew) {
    // }
    return (
      <Wrapper>
        {this.renderCrew(this.state.credits.crew)}
        {this.renderCast(this.state.credits.cast)}
      </Wrapper>
    );
  }
}

export default People;
