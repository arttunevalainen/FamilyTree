import React, { Component } from 'react';
import NavbarLeft from './NavbarLeft.js';
import FamilyTree from './FamilyTree.js';
import axios from 'axios';

import './App.css';
import './normalize.css';
import './skeleton.css';

class App extends Component {

    constructor() {
        super();

        this.state = { data: '', chosenid: -1 };

        this.chosenPerson = this.chosenPerson.bind(this);
    }

    componentDidMount() {
        this.saveFamilyTree();
    }

    async saveFamilyTree() {
        let response = await this.getFamilyTree();
        this.setState({data: response.data});
        console.log(this.state.data);
    }

    getFamilyTree() {
        let url = 'http://localhost:8081/families';
        return axios.get(url)
            .catch(function (error) {
                console.log(error);
            });
    }

    chosenPerson(id) {
        this.setState({chosenid: id-1});
    }

    render() {
        return (
            <div className="container ptc-custom u-full-width u-max-full-width">
                {(this.state.data !== '') && 
                    <NavbarLeft data={this.state.data}
                                chosenPerson={this.chosenPerson}>
                    </NavbarLeft>
                }
                {(this.state.chosenid !== -1) && 
                    <FamilyTree data={this.state.data}
                                chosenid={this.state.chosenid}>
                    </FamilyTree>
                }
            </div>
        );
    }
}

export default App;
