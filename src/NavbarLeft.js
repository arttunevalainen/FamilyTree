import React, { Component } from 'react';
import axios from 'axios';

import './normalize.css';
import './skeleton.css';


class NavbarLeft extends Component {

    constructor() {
        super();

        this.state = { data: '' };
    }

    componentDidMount() {
        this.build();
    }

    async build() {
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

    renderPeopleList() {
        let peoplelist = this.state.data;

        if(peoplelist !== '') {
            let list = peoplelist.map(this.peoplelistcomponent);
            return (<ul>{list}</ul>);
        }
        else {
            return (<div>ossi</div>);
        }
    }

    peoplelistcomponent(human) {
        return (
            <li className="listitem" key={human.id}>
                {human.firstName} {human.lastName}
            </li>
        );
    }

    render() {
        return(
            <div className="three columns ptc-left">
                <div className="logo">
                    <a href="https://www.protacon.com/" target="_new">
                        <img src={require("./images/protacon_logo.png")} alt="logo"/>
                    </a>
                </div>
                <hr/>
                <div className="scroll">
                    {this.renderPeopleList()}
                </div>
            </div>
        );
    }
}

export default NavbarLeft;