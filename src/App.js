import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Home";
import Movie from "./Movie";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageResult: {}
    }
  }  
  componentDidMount() {
    this.fetchConfig();
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
        this.setState({ imageResult: res });
      });
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path={"/"} render={props => <Home imageResult={this.state.imageResult}/>} /> 
          <Route path={"/movie/:id"} render={props => <Movie imageResult={this.state.imageResult} {...props}/>} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
