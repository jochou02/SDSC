import React, { Component } from 'react';

import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';


class LoggedInTester extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      return ( 
        <>

        { localStorage.getItem('auth-token') ? 
        <><div> Logged In </div> <LogoutButton /></> : 
        <><div> Not Logged In </div> <LoginButton /> </>}

        <br /><br /><br />

        </>
      );
    }
  }

  export default LoggedInTester