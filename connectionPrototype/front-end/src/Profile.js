import React, { Component } from 'react';

import LoggedInTester from './LoggedInTester';


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { foo: [],
                     };

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentWillMount() {
        const headers = {"Content-Type": "application/json"};

        if (localStorage.getItem('auth-token')) {
            headers["Authorization"] = localStorage.getItem('auth-token');
        }

        fetch('http://127.0.0.1:8000/account/get_user_info/', { headers, }) 
                    .then(response => response.json())
                    .then((data) => {
                    this.setState({ foo: data })
        })
        .catch(console.log)
    }

    handleSubmit(event) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                       'Authorization': localStorage.getItem('auth-token'), },
            body: JSON.stringify({})
        };

        fetch('http://127.0.0.1:8000/account/delete_user/', requestOptions)
        .then(response => response.json())
              .then((data) => {
                this.setState({ token: data['token'] }, () => {
                    window.location.href = 'http://localhost:3000/login';
              })
        })
        .catch(console.log)

        event.preventDefault();
    }
    
    ShowProfile = ({ foo }) => {
        return (
            <>
                ID: {foo['id']} <br />
                Username: {foo['username']} <br />
                Name: {foo['first_name']} {foo['last_name']} <br />
                E-Mail: {foo['email']}
            </>
        );
    }
    
    render() {
        console.log(this.state.foo)
      return (
        <>
            <LoggedInTester />

            {/* Sufficient to get whatever info we need from user */}
            { localStorage.getItem('auth-token') } <br /><br /><br />

            {/* Example of showing user's information */}
            <this.ShowProfile foo={this.state.foo} />

            {/* Delete user. Only show when user is logged in */}
            { localStorage.getItem('auth-token') ?
                <form onSubmit={this.handleSubmit}>
                    <input type="submit" value="Delete My Account" />
                </form> :

                <></>
            }

        </>
      );
    }
  }

  export default Profile