import React, { Component } from 'react';

import './normalize.css';
import './skeleton.css';


class NavbarLeft extends Component {

    constructor(props) {
        super(props);

        this.personlistcomponent = this.personlistcomponent.bind(this);
    }

    renderPersonList() {
        let personlist = this.props.data;

        if(personlist !== '') {
            let list = personlist.map(this.personlistcomponent);
            return (<ul>{list}</ul>);
        }
        else {
            return (<div>ossi</div>);
        }
    }

    personlistcomponent(person) {
        return (
            <li className="listitem" key={person.id} onClick={(e) => this.listedClicked(person.id)}>
                {person.firstName} {person.lastName}
            </li>
        );
    }

    listedClicked(id) {
        this.props.chosenPerson(id);
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
                    {this.renderPersonList()}
                </div>
            </div>
        );
    }
}

export default NavbarLeft;