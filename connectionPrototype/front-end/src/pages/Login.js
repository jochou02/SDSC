import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LoggedInTester from '../buttons/LoggedInTester';


class Login extends Component {
    constructor(props) {
      super(props);
      this.state = { username: '',
                     password: '',
                     token: '',
                     failed: false };

      this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.state.username,
                                   password: this.state.password})
        };

        this.setState({ username: '' ,
                        password: ''})
    
        fetch('http://127.0.0.1:8000/account/token_auth/', requestOptions)
              .then(response => response.json())
              .then((data) => {
                this.setState({ token: data['token'] }, () => {
                    this.foo()
              })
        })
        .catch(console.log)

        event.preventDefault();
    }

    // On success, store the token somewhere and redirect to profile
    foo() {
        if (this.state.token) {
            localStorage.setItem('auth-token', 'Token ' + this.state.token );

            //route
            //window.location.href = 'http://localhost:3000/profile';
        } else {
            this.setState({ failed: true })
        }
    }

  
    render() {
      return ( 
        <>

        <LoggedInTester />

        { this.state.failed ? <div> Login Failed </div> : <div> Welcome to Login Page </div> }

        <form onSubmit={this.handleSubmit}>    
        <label>
            Username:
            <input type="text" value={this.state.username} onChange={(event) => 
                                                                        {this.setState({ username: event.target.value })}} />
        </label> <br />

        <label>
            Password:
            <input type="password" value={this.state.password} onChange={(event) =>
                                                                        {this.setState({ password: event.target.value })}} />
        </label>  
          <input type="submit" value="Submit" />
        </form>

        <Link to="profile" state={{ from: "occupation" }}>
          Next Step
        </Link>

        </>
      );
    }
  }

  export default Login