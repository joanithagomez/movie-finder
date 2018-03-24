import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ReleaseDate from "./ReleaseDate";
import RunTime from "./RunTime";
const mdb = require("moviedb")("c3111a004530dd2c7aede7c5e398885e");

export default class Home extends Component {
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
          // console.log(res);
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
          <Linkstyle>
            <Link to={"/movie/" + recoms[i].id}>
              <img src={posterUrl} alt="poster" />
              <Title>{recoms[i].title}</Title>
              <RunTime id={recoms[i].id} />
              <ReleaseDate release_date={recoms[i].release_date} />
            </Link>
          </Linkstyle>
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
        <div>
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
        </div>
      </Wrapper>
    );
  }
}

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
const List = styled.li`
  list-style: none;
  background-color: white;
  border: 1px solid grey;
`;
const Title = styled.div`
  display: inline-block;
  font-size: 2em;
`;
const Linkstyle = styled.span`
  > a {
    color: black;
  }
`;

const InputWrapper = styled.div`
  font-size: 2em;
  font-weight: 200;
  padding: 2em 0;

  > input {
    font-size: 1em;
    font-weight: 200;
    text-align: center;
    border: none;
    border-bottom: 1px solid grey;
    background-color: transparent;
    padding: 0.2em 0;
    width: 100%;
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
