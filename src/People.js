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
      i ,
      end = 4,
      castSet = new Set();

    if (!cast || cast.length === 0) return;
    if (cast.length < end) end = cast.length;


    arr.push(<Label key="cast">Cast</Label>);

    //using set to remove duplicates
    for(i = 0; i < end; i++){
      castSet.add(cast[i].name);
    }

    let peopleArr = [...castSet];
    let names = peopleArr.join(', ');

    arr.push(<Name key="name">{names}</Name>);
    return arr;
  }

  renderCrew(crew) {
    let arr = [],
      i,
      end = 5,
      map = {};

    if (!crew || crew.length === 0) return;
    if (crew.length < end) end = crew.length;

    for (i = 0; i < end; i++) {
      if(map[crew[i].job] === undefined){
        map[crew[i].job] = crew[i].name;
      }else{
        map[crew[i].job] = map[crew[i].job] + ", "+ crew[i].name;
      }
    }

    for(var key in map){
      arr.push(<PhotoCard key={key}><Label>{key}</Label><Name>{map[key]}</Name></PhotoCard>);
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

const Wrapper = styled.div`
  width: 100%;

  @media screen and (min-width: 45em) {
    width: 50%;
    padding-left: 6em;
    ${'' /* border: 1px solid red; */}
  }

  `;

const PhotoCard = styled.div`
//border : 1px solid white;
  display: flex;
  padding: 0.5%;
`;
const Label = styled.span`
  font-weight:300;
  opacity: 0.8;
  font-size: 0.8em;
  display: inline-block;
  width: 140px;
  text-align: right;
 //border: 1px solid red;
 @media screen and (min-width: 45em) {
   font-size: 0.8em;
}
`;

const Name = styled.span`
width: 200px;
font-weight:100;
//border: 1px solid green;
margin-left: 2%;

@media screen and (min-width: 45em) {
  font-size: 0.8em;
  margin-left: 6%;

}

`;
