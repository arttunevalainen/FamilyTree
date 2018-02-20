import React, { Component } from 'react';
import './App.css';
import fetch from 'fetch';


class App extends Component {

    componentDidMount() {
        fetch('http://ohjelmointitehtava.protacon.fi/family_tree.json').then(response => response.json()).then(data => this.state({data: data}));
    }

    render() {
        return (
            <div className="App">
                {this.state.data}
            </div>
        );
    }
}

export default App;
