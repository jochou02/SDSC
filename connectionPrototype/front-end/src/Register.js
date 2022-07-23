import React, { Component } from 'react';

import LoggedInTester from './LoggedInTester';


class Register extends Component {
    constructor(props) {
      super(props);
      this.state = { username: '',
                     password: '',
                     email: '',
                     first_name: '',
                     last_name: ''
                    };

      this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                       'Authorization': localStorage.getItem('auth-token') },
            body: JSON.stringify({ username: this.state.username,
                                   password: this.state.password,
                                   email: this.state.email,
                                   first_name: this.state.first_name,
                                   last_name: this.state.last_name,})
        };
    
        fetch('http://127.0.0.1:8000/account/register/', requestOptions)
              .then(response => response.json())
              .then((data) => {
                this.setState({ }, () => {
                    this.fooo()
              })
        })
        .catch(console.log)

        event.preventDefault();
    }

    fooo() {
      window.location.href = 'http://localhost:3000/login';;
    }

    render() {
      return (
        <>

        <LoggedInTester />

        <form onSubmit={this.handleSubmit}>    
        <label>
            Username:
            <input type="text" value={this.state.username} onChange={(event) => 
                                                                        {this.setState({ username: event.target.value })}} />
        </label> <br />

        <label>
            Password:
            <input type="text" value={this.state.password} onChange={(event) => 
                                                                        {this.setState({ password: event.target.value })}} />
        </label> <br />

        <label>
            E-Mail:
            <input type="text" value={this.state.email} onChange={(event) => 
                                                                        {this.setState({ email: event.target.value })}} />
        </label> <br />

        <label>
            First Name:
            <input type="text" value={this.state.first_name} onChange={(event) => 
                                                                        {this.setState({ first_name: event.target.value })}} />
        </label> <br />

        <label>
            Last Name:
            <input type="text" value={this.state.last_name} onChange={(event) => 
                                                                        {this.setState({ last_name: event.target.value })}} />
        </label> <br />

          <input type="submit" value="Submit" />
        </form>

        </>
      );
    }
  }

  export default Register