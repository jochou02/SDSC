import React, { Component } from 'react';

import LoggedInTester from './LoggedInTester';


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { foo: [],
                       username: '',
                       password: '',
                       email: '',
                       first_name: '',
                       last_name: ''
                      };
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

            <this.ShowProfile foo={this.state.foo} />

            {/* Example of showing user's information */}

        </>
      );
    }
  }

  export default Profile