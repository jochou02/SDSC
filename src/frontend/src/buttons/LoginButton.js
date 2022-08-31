import React, { Component } from 'react';

import '../styles/home.css';

class LoginButton extends Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        window.location.href = 'http://localhost:3000/login';
        
        event.preventDefault();
    }

    render() {
      return ( 
        <>

        <form onSubmit={this.handleSubmit}>    
          <input type="submit" value="Log in" className="login-button"/>
        </form>

        </>
      );
    }
  }

  export default LoginButton