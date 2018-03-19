import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ReleaseDate from "./ReleaseDate";
const mdb = require("moviedb")("c3111a004530dd2c7aede7c5e398885e");

const Wrapper = styled.div`
  min-height: 100vh;
  height: 100%;
  background-color: #000;
  color: rgba(255, 255, 255, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;

  > h1 {
    margin: 0;
  }
`;
const Recommendations = styled.div`color: white;`;
const List = styled.li`list-style: none;`;
const InputWrapper = styled.div`
  font-size: 2em;
  font-weight: 200;

  > input {
    font-size: 1em;
    font-weight: 200;
    border: none;
    border-bottom: 1px solid grey;
    background-color: transparent;
    padding: 0.2em 1em;
    width: 80%;
    text-align: center;
    transition: 0.2s border ease-in;
    color: white;
  }

  > input:focus {
    outline: none;
    border-bottom: 1px solid white;
  }
  @media screen and (max-width: 45em) {
    font-size: 3em;
    > input {
      font-size: 2em;
      font-weight: 200;
    }
  }
`;

class Home extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      recommendations: [],
      id: 0
    };
  }

  handleSubmit(e) {
    if (e.key === "Enter") {
      // this.props.history.push('/results');
      mdb.searchMovie({ query: this.state.title }, (err, res) => {
        if (res) {
          this.setState({ recommendations: res.results });
        }
      });
    }
  }

  renderMovies(recoms) {
    let arr = [];
    let baseUrl;
    var posterUrl;
    baseUrl = this.props.imageResult.images.base_url;

    for (var i in recoms) {
      posterUrl =
        baseUrl + this.props.imageResult.images.poster_sizes[0] + recoms[i].poster_path;
      arr.push(
        <List value={i} key={"movie" + i}>
          <Link to={"/movie/" + recoms[i].id}>
            <img src={posterUrl} alt="poster" />
            {recoms[i].title}
            (<ReleaseDate release_date={recoms[i].release_date} />)
          </Link>
        </List>
      );
    }
    return arr;
  }

  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  render() {
    return (
      <Wrapper>
        <InputWrapper>
          What movie are you after?
          <input
            type="text"
            value={this.state.title}
            onKeyPress={this.handleSubmit.bind(this)}
            onChange={this.handleTitleChange}
          />
        </InputWrapper>
        <Recommendations>
          {this.props.imageResult.images && (
            <ul>{this.renderMovies(this.state.recommendations)}</ul>
          )}
        </Recommendations>
      </Wrapper>
    );
  }
}

export default Home;
