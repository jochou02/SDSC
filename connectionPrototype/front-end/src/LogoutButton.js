import React, { Component } from 'react';


class LogoutButton extends Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        localStorage.clear();
        window.location.href = 'http://localhost:3000/login';
        
        event.preventDefault();
    }

    render() {
      return ( 
        <>

        <form onSubmit={this.handleSubmit}>    
          <input type="submit" value="Log out" />
        </form>

        </>
      );
    }
  }

  export default LogoutButton