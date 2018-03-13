import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Home";
import Movie from "./Movie";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path={"/"} component={Home} />
          <Route path={"/movie/:id"} component={Movie} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
