import React, { Component } from "react";
import styled from "styled-components";
import "whatwg-fetch";

export default class People extends Component {
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


    for (i = 0; i < end; i++) {
      if (!sofar[cast[i].name]) sofar[cast[i].name] = [cast[i].character];
      else {
        innerarr = sofar[cast[i].name];
        innerarr.push(", " + cast[i].character);
        sofar[cast[i].name] = innerarr;
      }
    }

    arr.push(<Label>Cast</Label>);
    for (var person in sofar) {
      personIndex = indexof(cast, person);

      arr.push(

          <div value={personIndex} key={"cast" + personIndex}>
            <Name>{person}</Name>
          </div>

      );
    }
    return arr;
  }

  renderCrew(crew) {
    let arr = [],
      i,
      end = 3,
      sofar = {},
      personIndex,
      innerarr = [];

    if (!crew || crew.length === 0) return;
    if (crew.length < end) end = crew.length;

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
          <div value={personIndex} key={"crew" + personIndex}>
            <Person><Label>{sofar[person]}</Label><Name>{person}</Name></Person>
          </div>
      );
    }
    return arr;
  }

  render() {
    // console.log(this.props.secureBaseUrl);
    return (
      <Wrapper>
        {this.renderCrew(this.state.credits.crew)}
        <PhotoCard>
          {this.renderCast(this.state.credits.cast)}
        </PhotoCard>
      </Wrapper>
    );
  }
}

function indexof(array, person) {
  return array.findIndex(x => x.name === person);
}

const Wrapper = styled.div`
  width: 100%;

  @media screen and (min-width: 45em) {
    width: 50%;
    padding-left: 6em;
    ${'' /* border: 1px solid red; */}
  }

  `;

const PhotoCard = styled.div`
  border : 1px solid white;
  display: block;
`;
const Person = styled.div`
  font-size: 1em;
  font-weight:100;
 ${'' /* border: 1px solid white;  */}

`;

const Label = styled.span`
  font-weight:300;
  opacity: 0.8;
  font-size: 0.8em;
  display: inline-block;
  width: 140px;
  text-align: right;

border: 1px solid red;
`;

const Name = styled.span`
width: 200px;
display: inline-block;
border: 1px solid green;
margin-left: 2%;

@media screen and (min-width: 45em) {

  margin-left: 6%;

}

`;
