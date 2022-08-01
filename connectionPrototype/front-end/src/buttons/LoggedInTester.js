import React, { Component } from 'react';
// eslint-disable-next-line
import { Link } from 'react-router-dom';

import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';


class LoggedInTester extends Component {
// eslint-disable-next-line
    constructor(props) {
      super(props);
    }

    render() {
      return ( 
        <>

        { localStorage.getItem('auth-token') ? 
        <><div>
          Logged In
          <LogoutButton/>
        </div></> : 
        <><div>
          Not Logged In
          <LoginButton/>
          </div></>
        }</>
      );
    }
  }

  export default LoggedInTester