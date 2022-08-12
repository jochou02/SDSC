import React, { Component } from 'react';
// eslint-disable-next-line
import { useLocation } from 'react-router-dom'

import LoggedInTester from '../buttons/LoggedInTester';

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

        fetch('http://127.0.0.1:8000/tutoring/get_current_courses/', { headers, })
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

        // User should not be logged in account that's no longer exists
        localStorage.removeItem('auth-token')

        event.preventDefault();
    }
    
    ShowProfile = ({ foo }) => {
        return (
            <>
                ID: {foo['id']} <br />
                Name: {foo['first_name']} {foo['last_name']} <br />
                E-Mail: {foo['email']} <br />
                College: {foo['user_college']}
            </>
        );
    }
    
    render() {
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