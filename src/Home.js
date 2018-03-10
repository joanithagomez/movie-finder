import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const mdb = require('moviedb')('c3111a004530dd2c7aede7c5e398885e');

class Home extends Component{

    constructor() {
        super();
        this.state = {
            title: '',
            recommendations: [],
            id: 0
        }
    }


    handleSubmit(e) {
        if (e.key === 'Enter') {
            mdb.searchMovie({ query: this.state.title }, (err, res) => {
                if (res) {
                    this.setState({ recommendations: res.results });
                }
                });        
            }
    }


    renderMovies(recoms) {
        let arr = [];
        for (var i in recoms) {
            arr.push(<li value={i} key={"movie" + i}>
                <Link to={"/movie/" + recoms[i].id}>{recoms[i].title}</Link>
            </li>);
        }
        return arr;
    }


    handleTitleChange = (event) => {
        this.setState({ title: event.target.value });
    };

    
    render() {          
        
        return(
            <div>
                <h1>MovieLookup</h1>
                    Enter movie:
                        <input type="text" value={this.state.title} onKeyPress={this.handleSubmit.bind(this)} onChange={this.handleTitleChange}
                        />
                <ul>
                    {this.renderMovies(this.state.recommendations)}
                </ul>                
            </div>
        );
    }
}

export default Home;
