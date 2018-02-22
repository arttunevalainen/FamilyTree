import React, { Component } from 'react';
import NavbarLeft from './components/NavbarLeft.js';
import FamilyTree from './components/FamilyTree.js';
import axios from 'axios';

import './css/App.css';
import './css/normalize.css';
import './css/skeleton.css';

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
        if(response === "error" || response === undefined) {
            this.setState({error: "Could not get data ;___;"});
        }
        else {
            this.setState({data: response.data});
            console.log(this.state.data);
        }
        
    }

    getFamilyTree() {
        let url = 'http://localhost:8081/families';
        return axios.get(url)
            .catch(function (error) {
                return("error");
            });
    }

    chosenPerson(id) {
        setTimeout(() => {this.setState({ chosenid: id-1 }, function(){
                this.forceUpdate(); 
            });
        }, 10);
    }

    render() {
        return (
            <div className="container ptc-custom u-full-width u-max-full-width">
                {this.state.error}
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
