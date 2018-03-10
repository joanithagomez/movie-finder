import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';

  
class Movie extends Component{
    constructor(props) {
        super(props);
        this.state = {
            movieResult: {},
            credits:{}
        }
    }

    componentDidMount() {
        this.fetchInfo();
        this.fetchCredits();        
    }

    fetchInfo() {
        fetch("https://api.themoviedb.org/3/movie/"+this.props.match.params.id+"?api_key=c3111a004530dd2c7aede7c5e398885e", {
            method: "GET",
          })
            .then((response) => response.json())
            .then(res => {
               this.setState({ movieResult: res });
        });
    }

    fetchCredits() {
        fetch("https://api.themoviedb.org/3/movie/"+this.props.match.params.id+"/credits?api_key=c3111a004530dd2c7aede7c5e398885e", {
            method: "GET",        
          })
            .then((response) => response.json())
            .then(res => {
                // console.log(res);
                this.setState({ credits: res });   
        });
    }

    renderCast(cast) {
        let arr = [];
        let i;
        if (!cast)
            return;    
        for (i = 0; i < 4; i++) {
            arr.push(<li value={i} key={"cast" + i}>
                <img src=""/>    
                {cast[i].name} - {cast[i].character} 
                {/* <Link to={"/movie/" + recoms[i].id}>{recoms[i].title}</Link> */}
            </li>);
        }
        return arr;
    }

    renderCrew(crew) {
        let arr = [];
        let i;
        if (!crew)
            return;    
        for (i = 0; i < 4; i++) {
            arr.push(<li value={i} key={"crew" + i}>
                {crew[i].name} : {crew[i].job}    
                {/* <Link to={"/movie/" + recoms[i].id}>{recoms[i].title}</Link> */}
            </li>);
        }
        return arr;
    }

    render() {
        return(
            <div>
                <Link to="/">Home</Link>
                <h1>{this.state.movieResult.title}</h1>
                <h2>{this.state.movieResult.tagline}</h2>
                <h4>Overview:</h4>
                <p>{this.state.movieResult.overview}</p>
                <h4>Released:</h4>
                <p>{this.state.movieResult.release_date}</p>
                <h4>Crew</h4>
                {this.renderCrew(this.state.credits.crew)}
                <h4>Cast</h4>
                {this.renderCast(this.state.credits.cast)}
            </div>
        );
    }
}

export default Movie;
