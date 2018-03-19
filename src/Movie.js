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
    // console.log(this.props.match)
    let bgUrl;
    let posterUrl;
    let baseUrl;
    if (this.props.imageResult.images) {
      baseUrl = this.props.imageResult.images.base_url;
      bgUrl =
        baseUrl +
        this.props.imageResult.images.backdrop_sizes[3] +
        this.state.movieResult.backdrop_path;
      posterUrl =
        baseUrl +
        this.props.imageResult.images.poster_sizes[2] +
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
              <Header>
                <div>
                  <h1 className="title">{this.state.movieResult.title}</h1>
                  <h2 className="tagline">{this.state.movieResult.tagline}</h2>
                </div>
                <img src={posterUrl} alt={this.state.movieResult.title + "poster"} />
              </Header>
              <ReleaseDate release_date={this.state.movieResult.release_date} />
              {/* <p>{this.state.movieResult.release_date}</p> */}
              <hr />
              <OverView>
                <p>{this.state.movieResult.overview}</p>
              </OverView>
              <People
                baseUrl={baseUrl}
                imageResult={this.props.imageResult}
                match={this.props.match}
              />
            </Content>
          </Overlay>
        </Background>
      </Wrapper>
    );
  }
}

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

const Header = styled.div`
  display: flex;
  ${"" /* border: 1px solid red; */} > div {
    width: 60%;
  }
  .title {
    padding: 0;
    font-size: 6em;
    font-weight: 200;
    color: red;
    margin-bottom: 0;
    // border: 1px solid yellow;
  }

  .tagline {
    // text-align:center;
    // border: 1px solid yellow;
    font-weight: 200;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 1em;
  }
`;

const OverView = styled.div`
  display: flex;

  > p {
    font-weight: 100;
    font-size: 1em;
  }
`;
const Content = styled.div`
  padding: 4% 10%;

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
  > hr {
    border: 0.5px solid grey;
  }
`;
export default Movie;
