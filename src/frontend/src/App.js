import React, { Component } from 'react';

import Login from './Login';
import Register from './Register';

import Navbar from './pages/Navbar'

class App extends Component {

    render() {
        return (
            <>
            <Login />
            <br />
            <Register />
            </>
        )
    }
}

export default App;
