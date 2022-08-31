import React, { Component } from 'react';

import '../styles/home.css';

class LogoutButton extends Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        localStorage.removeItem('auth-token');
        window.location.href = 'http://localhost:3000/login';
        
        event.preventDefault();
    }

    render() {
      return ( 
        <>

        <form onSubmit={this.handleSubmit}>    
          <input type="submit" value="Log out" class="login-button"/>
        </form>

        </>
      );
    }
  }

  export default LogoutButton