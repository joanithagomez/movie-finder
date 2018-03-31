import React, { Component } from "react";
import { Link } from "react-router-dom";
import "whatwg-fetch";
import styled from "styled-components";
import People from "./People";
import ReleaseDate from "./ReleaseDate";

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieResult: {}
    };
  }

  componentDidMount() {
    this.fetchInfo();
  }

  fetchInfo() {
    fetch(
     "https://api.themoviedb.org/3/movie/" +
      this.props.match.params.id +
       "?api_key=c3111a004530dd2c7aede7c5e398885e",
     {
       method: "GET"
     }
   )
     .then(response => response.json())
     .then(res => {
       // console.log(res);
       this.setState({ movieResult: res });
   });

  }

  render() {
    // console.log(this.props.images);
    let bgUrl;
    let posterUrl;
    var secureBaseUrl;

    if(this.props.images){
      secureBaseUrl = this.props.images.secure_base_url;

      if(this.state.movieResult.poster_path){
        posterUrl =
          secureBaseUrl +
          this.props.images.poster_sizes[1] +
          this.state.movieResult.poster_path;
      }
      if (this.state.movieResult.backdrop_path ) {
        bgUrl =
          secureBaseUrl +
          this.props.images.backdrop_sizes[3] +
          this.state.movieResult.backdrop_path;
      }
    }

    return (
      <Wrapper>
        <Background pic={bgUrl}>
          <Overlay>
            <HomeLink className="homeLink">
              <Link to="/">Home</Link>
            </HomeLink>
            {this.state.movieResult && <Content>

              <Header>
                <Image><img src={posterUrl} alt={this.state.movieResult.title + "poster"} /></Image>
                <div>
                  <h1 className="title">{this.state.movieResult.title}</h1>
                  <h2 className="tagline">{this.state.movieResult.tagline}</h2>
                </div>
              </Header>
              <ReleaseDate release_date={this.state.movieResult.release_date}></ReleaseDate>
              <Time>{this.state.movieResult.runtime} mins</Time>

              <hr />

              <Block>
              <OverView>
                <p>{this.state.movieResult.overview}</p>
              </OverView>
              {this.props.images && <People
                secureBaseUrl={secureBaseUrl}
                images={this.props.images}
                match={this.props.match}
              />}
            </Block>

            </Content> }
          </Overlay>
        </Background>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
color: white;`
;

const Background = styled.div`
  background-image: url(${props => props.pic});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Overlay = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  overflow: hidden;
  min-height: 100vh;
  z-index: 2;
`;


const HomeLink = styled.span`
> a {
    padding: 2%;
    text-decoration: none;
    color: white;
    font-size: 0.6em;
    float: right;
  }
`;

const Header = styled.div`
  .title {
    padding: 0;
    font-size: 2em;
    font-weight: 200;
    color: red;
    margin-bottom: 0;
    //border: 1px solid yellow;
  }

  .tagline {
    font-size: 0.8em;
    font-weight: 200;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  @media screen and (min-width: 45em) {
    display: flex;
    .title {
      padding: 0;
      font-size: 4em;
      font-weight: 200;
      color: red;
      margin-bottom: 0;
    }

    .tagline {
      font-weight: 200;
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-size: 1em;
    }
  }
`;

const Time = styled.div`
font-size: 0.6em;
font-weight:100;
opacity: 0.8;
text-align: left;

@media screen and (min-width: 45em) {
  font-size: 1em;
}
  `;

const Image = styled.div `
  text-align: left;
  padding-top: 2em;
  padding-right: 2em;
`;

const OverView = styled.div`
  width: 100%;
  > p {
    font-weight: 100;
    font-size: 0.8em;
    letter-spacing: 0.2px;
  }
  @media screen and (min-width: 45em) {
    width: 50%;
    ${'' /* border: 1px solid red; */}
    padding: 0em 1em;
    > p {
      margin: 0;
      font-weight: 100;
      font-size: 1em;
    }
  }
`;

const Content = styled.div`
  padding: 6% 10%;
  > hr {
    border: 0.5px solid grey;
  }
`;

const Block = styled.div`
  display: block;
  @media screen and (min-width: 45em) {
    display: flex;
    padding: 1em 0;
  }
`;

export default Movie;
