import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';
import styled from 'styled-components';
import People from './People';

const Wrapper = styled.div`
  color: white;
`;

const Background = styled.div`
    background-image: url(${(props) => props.pic});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    
`
const Overlay = styled.div`
    width: 100%;
    background: rgba(26, 1, 70, 0.8);
    overflow: hidden;
    min-height: 100vh;
    z-index: 2;    
`
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

    >p {
        font-size: 1em;
        padding: 0;
        color: white;
        font-weight: 200;

    }  

    > .homeLink > a {
        text-decoration: none;
        color: white;
        font-size: 0.6em;
        float:right;
    }
`

class Movie extends Component{
    constructor(props) {
        super(props);
        this.state = {
            movieResult: {},
            credits: {},
            imageResult: {}
        }
    }

    componentDidMount() {
            this.fetchConfig();
            this.fetchInfo();
            // this.fetchCredits();  
    }

    fetchConfig() {
        fetch("https://api.themoviedb.org/3/configuration?api_key=c3111a004530dd2c7aede7c5e398885e", {
            method: "GET",
          })
            .then((response) => response.json())
            .then(res => {
                // console.log("fetchconfig: " + res);
                this.setState({ imageResult: res });
        });
    }

    fetchInfo() {
        fetch("https://api.themoviedb.org/3/movie/"+this.props.match.params.id+"?api_key=c3111a004530dd2c7aede7c5e398885e", {
            method: "GET",
          })
            .then((response) => response.json())
            .then(res => {
                console.log(res);
               this.setState({ movieResult: res });
        });
    }

    // fetchCredits() {
    //     fetch("https://api.themoviedb.org/3/movie/"+this.props.match.params.id+"/credits?api_key=c3111a004530dd2c7aede7c5e398885e", {
    //         method: "GET",        
    //       })
    //         .then((response) => response.json())
    //         .then(res => {
    //             // console.log(res);
    //             this.setState({ credits: res });   
    //     });
    // }

    // renderCast(cast) {
    //     let arr = [];
    //     let i;
    //     if (!cast)
    //         return;    
    //     for (i = 0; i < 4; i++) {
    //         arr.push(<li value={i} key={"cast" + i}>
    //             {cast[i].name} - {cast[i].character} 
    //             {/* <Link to={"/movie/" + recoms[i].id}>{recoms[i].title}</Link> */}
    //         </li>);
    //     }
    //     return arr;
    // }

    // renderCrew(crew) {
    //     let arr = [];
    //     let i;
    //     if (!crew)
    //         return;    
    //     for (i = 0; i < 4; i++) {
    //         arr.push(<li value={i} key={"crew" + i}>
    //             {crew[i].name} : {crew[i].job}    
    //             {/* <Link to={"/movie/" + recoms[i].id}>{recoms[i].title}</Link> */}
    //         </li>);
    //     }
    //     return arr;
    // }

    render() {
        let bgUrl;
        if (this.state.imageResult.images)
            bgUrl = (this.state.imageResult.images.base_url) + (this.state.imageResult.images.backdrop_sizes[3]) + this.state.movieResult.backdrop_path; 
        console.log(bgUrl);   

        return(
            <Wrapper >
                <Background pic={bgUrl}>
                    <Overlay>
                        <Content>    
                            <p className="homeLink"><Link to="/">Home</Link></p>
                            <h1>{this.state.movieResult.title}</h1>
                            <h2>{this.state.movieResult.tagline}</h2>
                            <h4>Overview:</h4>
                            <p>{this.state.movieResult.overview}</p>
                            <h4>Released:</h4>
                            <p>{this.state.movieResult.release_date}</p>
                            <People match={this.props.match}/>
                        </Content>    
                    </Overlay>    
                </Background>    
            </Wrapper>
        );
    }
}

export default Movie;
