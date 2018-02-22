import React, { Component } from 'react';
import '../css/familytree.css';

class FamilyTree extends Component {

    constructor(props) {
        super(props);

        this.state = { grandparents: [], parents: [], siblings: [], grandchildren: [], children: [] };
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
            let grandparents = [];
            let parents = [];
            let grandchildren = [];
            let children = [];
            let siblings = [];

            this.getParents(person, parents);
            this.getGrandParents(person, grandparents);
            this.getChildren(person, children);
            this.getGrandChildren(person, grandchildren);
            this.getSiblings(person, siblings);
            
            this.setState({ grandparents: grandparents, parents: parents, siblings: siblings, grandchildren: grandchildren, children: children });
        }
    }

    getGrandParents(person, list, nofirsts = false) {
        if(person !== null) {
            if(person.father !== null && person.mother !== null) {
                if(nofirsts) {
                    list.push(this.props.data[person.father-1]);
                    list.push(this.props.data[person.mother-1]);
                }
                this.getGrandParents(this.props.data[person.father-1], list, true);
                this.getGrandParents(this.props.data[person.mother-1], list, true);
            }
        }
    }

    getParents(person, list) {
        if(person.father !== null) {
            for(let i = 0; i < this.props.data.length; i++) {
                if(this.props.data[i].id === person.father || this.props.data[i].id === person.mother) {
                    list.push(this.props.data[i]);
                }
            }
        }
    }

    getChildren(person, list) {
        for(let i = 0; i < this.props.data.length; i++) {
            if(this.props.data[i].father !== null) {
                if(this.props.data[i].father === person.id || this.props.data[i].mother === person.id) {
                    list.push(this.props.data[i]);
                }
            }
        }
    }

    getGrandChildren(person, list) {
        for(let i = 0; i < this.props.data.length; i++) {
            if(this.props.data[i].father === person.id || this.props.data[i].mother === person.id) {
                list.push(this.props.data[i]);
                this.getGrandChildren(this.props.data[i], list);
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

    listPersons(table, header) {
        if(table.length > 0) {
            let list = table.map(this.persontreelistcomponent);
            return (<div className="Column"><h4>{header}:</h4><ul>{list}</ul></div>);
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
                        {this.listPersons(this.state.grandparents, "Isovanhemmat")}
                        {this.listPersons(this.state.parents, "Vanhemmat")}
                        {this.listPersons(this.state.siblings, "Sisaret")}
                        {this.listPersons(this.state.children, "Lapset")}
                        {this.listPersons(this.state.grandchildren, "Lastenlapset")}
                    </div>
                </div>
            </div>
        );
    }
}


export default FamilyTree;