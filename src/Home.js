import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ReleaseDate from "./ReleaseDate";
const mdb = require("moviedb")("c3111a004530dd2c7aede7c5e398885e");

const Wrapper = styled.div`
  min-height: 100vh;
  height: 100%;
  background-color: black;
  color: white;


  > h1 {
    margin: 0;
  }
`;

const List = styled.li`
list-style:none;
`

class Home extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      recommendations: [],
      id: 0,
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
      posterUrl = baseUrl + this.props.imageResult.images.poster_sizes[0] + recoms[i].poster_path;
      arr.push(
        <List value={i} key={"movie" + i}>
          <Link to={"/movie/" + recoms[i].id}>
            <img src= {posterUrl} alt="poster"/>
            {recoms[i].title}
            (<ReleaseDate release_date={recoms[i].release_date}></ReleaseDate>)
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
        <h1>MovieLookup</h1>
        Search:
        <input
          type="text"
          value={this.state.title}
          onKeyPress={this.handleSubmit.bind(this)}
          onChange={this.handleTitleChange}
        />
     
        {this.props.imageResult.images && <ul>{this.renderMovies(this.state.recommendations)}</ul>}
        
      </Wrapper>
    );
  }
}

export default Home;
