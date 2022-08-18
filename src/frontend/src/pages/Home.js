import React, { Component } from 'react';

import LoggedInTester from '../buttons/LoggedInTester';

import GenerateMatching from './components/GenerateMatching';
import MatchingReceived from './components/MatchingReceived';
import Test from './components/Test';

/* import Profile from './Profile' */

/*
    GenerateMatching takes care of generating a matching, as well as displaying
    matching that we have sent.

    Matching Received takes care of interaction between we and matching that we
    have received.


*/
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { foo: [], };

        this.ShowProfile = this.ShowProfile.bind(this);
    }

    componentDidMount() {
        const headers = {"Content-Type": "application/json"};

        if (localStorage.getItem('auth-token')) {
            headers["Authorization"] = localStorage.getItem('auth-token');
        }

        fetch('http://127.0.0.1:8000/connect/get_info/', { headers, })
                    .then(response => response.json())
                    .then((data) => {
                    this.setState({ foo: data })
        })
        .catch(console.log)
    }

    ShowProfile = ({ foo }) => {
        return (
            <>
                {   !localStorage.getItem('auth-token') ? <></> : <>
                    ID: {foo['id']} <br />
                    Name: {foo['first_name']} {foo['last_name']} <br />
                    E-Mail: {foo['email']} <br />
                    College: {foo['user_college']}
                    </>
                }
            </>
        );
    }

    render() {
      return (
        <>
            <LoggedInTester />

            {/* Example of showing user's information */}
            <this.ShowProfile foo={this.state.foo} />

            <GenerateMatching /> 
            <MatchingReceived />

            <Test />

        </>
      );
    }
  }

  export default Home