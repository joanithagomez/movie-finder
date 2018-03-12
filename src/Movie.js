import React, { Component } from "react";
import { Link } from "react-router-dom";
import "whatwg-fetch";
import styled from "styled-components";
import People from "./People";

const Wrapper = styled.div`color: white;`;

const Background = styled.div`
  background-image: url(${props => props.pic});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
const Overlay = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.8); //rgba(26, 1, 70, 0.8);
  overflow: hidden;
  min-height: 100vh;
  z-index: 2;
`;
const Content = styled.div`
  padding: 4% 10%;
  > h1 {
    padding: 0;
    font-size: 4em;
    font-weight: 200;
    color: red;
    width: 60%;
    margin-bottom: 0;
    // border: 1px solid yellow;
  }

  > h2 {
    // text-align:center;
    // border: 1px solid yellow;
    font-weight: 200;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 1em;
  }

  > p {
    font-size: 1em;
    padding: 0;
    color: white;
    font-weight: 200;
    ${"" /* background-color: white; */};
  }

  > .homeLink > a {
    text-decoration: none;
    color: white;
    font-size: 0.6em;
    float: right;
  }
`;

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieResult: {},
      imageResult: {}
    };
  }

  componentDidMount() {
    this.fetchConfig();
    this.fetchInfo();
  }

  fetchConfig() {
    fetch(
      "https://api.themoviedb.org/3/configuration?api_key=c3111a004530dd2c7aede7c5e398885e",
      {
        method: "GET"
      }
    )
      .then(response => response.json())
      .then(res => {
        // console.log("fetchconfig: " + res);
        this.setState({ imageResult: res });
      });
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
        console.log(res);
        this.setState({ movieResult: res });
      });
  }

  render() {
    let bgUrl;
    let posterUrl;
    var baseUrl;
    if (this.state.imageResult.images) {
      baseUrl = this.state.imageResult.images.base_url;
      bgUrl =
        baseUrl +
        this.state.imageResult.images.backdrop_sizes[3] +
        this.state.movieResult.backdrop_path;
      posterUrl =
        baseUrl +
        this.state.imageResult.images.poster_sizes[3] +
        this.state.movieResult.poster_path;
    }

    return (
      <Wrapper>
        <Background pic={bgUrl}>
          <Overlay>
            <Content>
              <p className="homeLink">
                <Link to="/">Home</Link>
              </p>
              <h1>{this.state.movieResult.title}</h1>
              <h2>{this.state.movieResult.tagline}</h2>
              <img src={posterUrl} alt="poster" />
              <p>{this.state.movieResult.release_date}</p>

              <p>{this.state.movieResult.overview}</p>
              {/* <h4>Released:</h4> */}

              <People
                baseUrl={baseUrl}
                imageResult={this.state.imageResult}
                match={this.props.match}
              />
            </Content>
          </Overlay>
        </Background>
      </Wrapper>
    );
  }
}

export default Movie;
