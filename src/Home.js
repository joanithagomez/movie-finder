import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ReleaseDate from "./ReleaseDate";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      recommendations: [],
      id: 0,
      isNoResults:false,
    };

   //  fetch(
   //     "https://api.themoviedb.org/3/search/movie?api_key=c3111a004530dd2c7aede7c5e398885e&query="+this.state.title,
   //     {
   //       method: "GET"
   //     }
   //   )
   //   .then(response => response.json())
   //   .then(res => {
   //     if(res.total_results !== 0){
   //     // console.log(res);
   //     this.setState({
   //       isNoResults: false,
   //       recommendations: res.results });
   //     }else{
   //       this.setState({
   //         recommendations: [],
   //         isNoResults: true
   //       });
   //     }
   // });
  }


  handleSubmit(e) {
    if (e.key === "Enter" && this.state.title !== "") {
      // this.props.history.push('/results');
        fetch(
           "https://api.themoviedb.org/3/search/movie?api_key=c3111a004530dd2c7aede7c5e398885e&query="+this.state.title,
           {
             method: "GET"
           }
         )
         .then(response => response.json())
         .then(res => {
           if(res.total_results !== 0){
           // console.log(res);
           this.setState({
             isNoResults: false,
             recommendations: res.results });
           }else{
             this.setState({
               recommendations: [],
               isNoResults: true
             });
           }
       });
      }
  }


  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };



    renderMovies(recoms) {
      let arr = [];
      let secureBaseUrl;
      var posterUrl;
      secureBaseUrl = this.props.images.secure_base_url;

      for (var i in recoms) {
        if(recoms[i].poster_path)
        posterUrl =
          secureBaseUrl + this.props.images.poster_sizes[1] + recoms[i].poster_path;
        arr.push(
          <List value={i} key={"movie" + i}>
            <Linkstyle>
              <Link to={"/movie/" + recoms[i].id}>
                <img src={posterUrl} alt="poster" />
                <Title>{recoms[i].title}</Title>
                <ReleaseDate release_date={recoms[i].release_date} />
              </Link>
            </Linkstyle>
          </List>
        );
      }

      return arr;
    }


  render() {
    // console.log(this.state.isNoResults);
    return (
      <Wrapper>
        <div>
          <InputWrapper>
            <Input>
            What movie are you after?
            <input
              type="text"
              value={this.state.title}
              onKeyPress={this.handleSubmit.bind(this)}
              onChange={this.handleTitleChange}
            />
          </Input>
          </InputWrapper>
          <Recommendations>
            {this.props.images && (
              <Grid>{this.renderMovies(this.state.recommendations)}</Grid>
            )}
            {this.state.isNoResults && (<div>No results</div>)}
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

  //border: 1px solid red;

  > h1 {
    margin: 0;
  }

`;

const Recommendations = styled.div`
color:white;

`;
const Grid = styled.div`
  display:grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 30px;
  max-width: auto;
  margin: 0 100px;
//  border: 1px solid white;

`;

const List = styled.div`
  width: auto;

  background-color: transparent;
  position: relative;
  cursor: pointer;
  min-height: 100%;
`;
const Title = styled.div`
  font-size: 1em;
`;
const Linkstyle = styled.span`
  > a {
    color: white;
    text-decoration: none;
  }
`;

const InputWrapper = styled.div`
 display: flex;
justify-content: center;
align-items: center;
`;
const Input = styled.div`
  font-size: 1.2em;
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

  @media screen and (min-width: 45em) {
    font-size: 2em;
    > input {
      font-size: 1em;
      font-weight: 200;
    }
  }
`;
