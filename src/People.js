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
    let arr = [],
      i,
      end = 4,
      sofar = {},
      personIndex,
      innerarr = [];

    if (!cast || cast.length === 0) return;
    if (cast.length < end) end = cast.length;

    arr.push(<h4 key="cast">Cast</h4>);

    for (i = 0; i < end; i++) {
      if (!sofar[cast[i].name]) sofar[cast[i].name] = [cast[i].character];
      else {
        innerarr = sofar[cast[i].name];
        innerarr.push(", " + cast[i].character);
        sofar[cast[i].name] = innerarr;
      }
    }

    for (var person in sofar) {
      personIndex = indexof(cast, person);

      arr.push(
        <PhotoCard key={"photocardcast" + personIndex}>
          <div value={personIndex} key={"cast" + personIndex}>
            <p>{person}</p>
            <p>{sofar[person]}</p>
          </div>
        </PhotoCard>
      );
    }
    return arr;
  }

  renderCrew(crew) {
    let arr = [],
      i,
      end = 4,
      sofar = {},
      personIndex,
      innerarr = [];

    if (!crew || crew.length === 0) return;
    if (crew.length < end) end = crew.length;

    arr.push(<h4 key="crew">Crew</h4>);

    for (i = 0; i < end; i++) {
      if (!sofar[crew[i].name]) sofar[crew[i].name] = [crew[i].job];
      else {
        innerarr = sofar[crew[i].name];
        innerarr.push(", " + crew[i].job);
        sofar[crew[i].name] = innerarr;
      }
    }

    for (var person in sofar) {
      personIndex = indexof(crew, person);
      arr.push(
        <PhotoCard key={"photocardcrew" + personIndex}>
          <div value={personIndex} key={"crew" + personIndex}>
            <p>{person}</p>
            <p>{sofar[person]}</p>
          </div>
        </PhotoCard>
      );
    }
    return arr;
  }

  render() {
    // console.log(this.props.secureBaseUrl);
    return (
      <Wrapper>
        {this.renderCrew(this.state.credits.crew)}
        {this.renderCast(this.state.credits.cast)}
      </Wrapper>
    );
  }
}

function indexof(array, person) {
  return array.findIndex(x => x.name === person);
}

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

export default People;
