import React, { Component } from 'react';
// eslint-disable-next-line
import { Link } from 'react-router-dom';

import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';

import '../styles/home.css';

class LoggedInTester extends Component {
// eslint-disable-next-line
    constructor(props) {
      super(props);
    }

    render() {
      return ( 
        <>

        { localStorage.getItem('auth-token') ? 
        <div class="login-message">
          You are currently logged in.
          <LogoutButton/>
        </div> : 
        <div class="login-message">
          You are not logged in.
          <LoginButton/>
          </div>
        }</>
      );
    }
  }

  export default LoggedInTester