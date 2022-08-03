import React, { Component } from 'react';
// eslint-disable-next-line
import { useLocation } from 'react-router-dom'

import LoggedInTester from '../buttons/LoggedInTester';
import styles from "../styles/Profile.module.css"

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

        fetch('http://127.0.0.1:8000/connect/get_info/', { headers, })
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
        return (<>
        <p>ID: {foo['id']}</p>
        <p className={styles.name}>
            {foo['first_name']}
            {' '}
            {foo['last_name']}
        </p>
        <p>Email: {foo['email']}</p> 
        <p>College: {foo['user_college']}</p>
        </>);
    }
    
    render() {
      return (
        <>
            <div className={styles.componentWrapper}>
            <LoggedInTester />
            {/* Sufficient to get whatever info we need from user */}
            { localStorage.getItem('auth-token') } <br /><br /><br />
            </div>

            {/* Example of showing user's information */}
            <div className={styles.profileWrapper}>
            <this.ShowProfile foo={this.state.foo} />

            {/* Delete user. Only show when user is logged in */}
            { localStorage.getItem('auth-token') ?
                <form onSubmit={this.handleSubmit}>
                    <input type="submit" value="Delete My Account" className={styles.button}/>
                </form> :

                <></>
            }
            </div>
        </>
      );
    }
  }

  export default Profile