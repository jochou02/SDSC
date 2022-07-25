import React, { Component } from 'react';

import LoggedInTester from './LoggedInTester';


class Register extends Component {
    constructor(props) {
      super(props);
      this.state = { username: '',
                     password: '',
                     email: '',
                     first_name: '',
                     last_name: '',
                     auth_server: '',
                     auth_user: '',
                     auth_success: false,
                    };

      this.handleSubmitReg = this.handleSubmitReg.bind(this);
      this.handleSubmitAuth = this.handleSubmitAuth.bind(this);
    }


    handleSubmitReg(event) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
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
                    window.location.href = 'http://localhost:3000/login';
              })
        })
        .catch(console.log)

        event.preventDefault();
    }

    handleSubmitAuth(event) {
//        console.log("Yay");
        const headers = {"Content-Type": "application/json"};

        //Get email authentication code
        fetch('http://127.0.0.1:8000/account/gen_auth/', { headers, })
                    .then(response => response.json())
                    .then((data) => {
                    this.setState({ auth_server: data })
        })
        .catch(console.log)

        event.preventDefault();
    }

    handleEmailAuth() {
        return(
        <>
            <form onSubmit = {this.handleSubmitAuth}>
                <label>
                    E-Mail:
                    <input type="text" value={this.state.email} onChange={(event) =>
                                                                                {this.setState({ email: event.target.value })}} />
                </label> <br />
                <input type="submit" value="Send Code" />
            </form> <br /> <br />
        </>
        )
    }


    render() {
      return (
        <>

        <LoggedInTester />
        <this.handleEmailAuth />

        <form onSubmit={this.handleSubmitReg}>
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
            First Name:
            <input type="text" value={this.state.first_name} onChange={(event) => 
                                                                        {this.setState({ first_name: event.target.value })}} />
        </label> <br />

        <label>
            Last Name:
            <input type="text" value={this.state.last_name} onChange={(event) => 
                                                                        {this.setState({ last_name: event.target.value })}} />
        </label> <br />

        {/* More robust error handling here? (Keep disabled until all fields non-empty) */}
            <input type="submit" value="Submit" disabled= {!((this.state.auth_server == this.state.auth_user) && (this.state.auth_server))} />
        </form>

        </>
      );
    }
  }

  export default Register