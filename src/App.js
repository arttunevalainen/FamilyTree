import React, { Component } from 'react';
import NavbarLeft from './NavbarLeft.js';

import './App.css';
import './normalize.css';
import './skeleton.css';

class App extends Component {

    render() {
        return (
            <div className="container ptc-custom u-full-width u-max-full-width">
                <NavbarLeft></ NavbarLeft>
            </div>
        );
    }
}

export default App;
