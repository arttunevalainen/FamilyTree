import React, { Component } from 'react';
import '../css/familytree.css';

class FamilyTree extends Component {

    constructor(props) {
        super(props);

        this.state = { parents: [], siblings: [], children: [] };
    }

    componentDidMount() {
        this.getAllFamilyMembers();
    }

    componentWillReceiveProps() {
        this.getAllFamilyMembers();
    }

    getAllFamilyMembers() {
        let person = this.props.data[this.props.chosenid];
        if(person !== undefined) {
            let parents = [];
            let children = [];
            let siblings = [];

            this.getAllParents(person, parents);
            this.getPersonsChildren(person, children);
            this.getSiblings(person, siblings);
            
            this.setState({ parents: parents, siblings: siblings, children: children });
        }
    }

    getAllParents(person, list) {
        if(person !== null) {
            if(person.father !== null && person.mother !== null) {
                list.push(this.props.data[person.father-1]);
                list.push(this.props.data[person.mother-1]);
                this.getAllParents(this.props.data[person.father-1], list);
                this.getAllParents(this.props.data[person.mother-1], list);
            }
        }
    }

    getPersonsChildren(person, list) {
        for(let i = 0; i < this.props.data.length; i++) {
            if(this.props.data[i].father === person.id || this.props.data[i].mother === person.id) {
                list.push(this.props.data[i]);
                this.getPersonsChildren(this.props.data[i], list);
            }
        }
    }

    getSiblings(person, list) {
        for(let i = 0; i < this.props.data.length; i++) {
            if(this.props.data[i].father !== null) {
                if(this.props.data[i].father === person.father || this.props.data[i].mother === person.mother) {
                    if(this.props.data[i].id !== person.id) {
                        list.push(this.props.data[i]);
                    }
                }
            }
        }
    }

    chosenPersonName() {
        return ( <h2>{this.props.data[this.props.chosenid].firstName} {this.props.data[this.props.chosenid].lastName}</h2> );
    }

    listParents() {
        let parents = this.state.parents;

        if(parents.length > 0) {
            let list = parents.map(this.persontreelistcomponent);
            return (<div className="Column"><h4>Vanhemmat:</h4><ul>{list}</ul></div>);
        }
        else {
            return (<div></div>);
        }
    }

    listSiblings() {
        let siblings = this.state.siblings;

        if(siblings.length > 0) {
            let list = siblings.map(this.persontreelistcomponent);
            return (<div className="Column"><h4>Sisaret:</h4><ul>{list}</ul></div>);
        }
        else {
            return (<div></div>);
        }
    }

    listChilren() {
        let children = this.state.children;

        if(children.length > 0) {
            let list = children.map(this.persontreelistcomponent);
            return (<div className="Column"><h4>Lapset:</h4><ul>{list}</ul></div>);
        }
        else {
            return (<div></div>);
        }
    }

    persontreelistcomponent(person) {
        return (
            <li key={person.id} className="listedPerson">
                {person.firstName} {person.lastName}
            </li>
        );
    }

    render() {
        
        return (
            <div className="nine columns ptc-right">
                <div className="ptc-tree-background">
                    {this.chosenPersonName()}
                    <div className="Row">
                        {this.listParents()}
                        {this.listSiblings()}
                        {this.listChilren()}
                    </div>
                </div>
            </div>
        );
    }
}


export default FamilyTree;