import React, { Component } from 'react';
import ClickableList from './ClickableList';

import protaconLogo from '../images/protacon_logo.png';

class NavbarLeft extends Component {

    render() {
        return(
            <div className="three columns ptc-left">
                <div className="logo">
                    <a href="https://www.protacon.com/" target="_new">
                        <img src={protaconLogo} alt="logo"/>
                    </a>
                </div>
                <hr/>
                <ClickableList 
                    data={this.props.data}
                    chosenid={this.props.chosenPerson}>
                </ClickableList>
            </div>
        );
    }
}

export default NavbarLeft;