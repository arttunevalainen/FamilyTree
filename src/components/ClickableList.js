import React, { Component } from 'react';
import '../css/clickablelist.css';

class ClickableList extends Component {

    constructor(props) {
        super(props);

        this.personlistcomponent = this.personlistcomponent.bind(this);
        this.listedClicked = this.listedClicked.bind(this);
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
        this.props.chosenid(id);
    }

    render() {
        return (
            <div className="scroll">
                {this.renderPersonList()}
            </div>
        );
    }

}

export default ClickableList;