import React, { Component } from 'react';

import './normalize.css';
import './skeleton.css';

class FamilyTree extends Component {

    componentDidMount() {
        this.getAllFamilyMembers();
    }

    getAllFamilyMembers() {
        let person = this.props.data[this.props.chosenid];
        if(person !== undefined) {
            let parents = this.getAllParents(person, []);
            console.log(parents);
        }
    }

    getAllParents(person, list) {
        if(person.mother === null) {
            return list;
        }
    }

    chosenPersonName() {
        return ( <h2>{this.props.data[this.props.chosenid].firstName} {this.props.data[this.props.chosenid].lastName}</h2> );
    }

    render() {
        return (
            <div className="nine columns ptc-right">
                {this.chosenPersonName()}
                <div className="ptc-tree-background">
                </div>
            </div>
        );
    }
}


export default FamilyTree;