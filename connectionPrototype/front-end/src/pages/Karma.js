import React, { Component } from 'react';

import LoggedInTester from '../buttons/LoggedInTester';
import styles from '../styles/Profile.module.css'

class Karma extends Component {
  constructor (props) {
    super(props);
    this.state = { 
      foo: [],
      user_karma: 0, 
    };
    this.addKarma = this.addKarma.bind(this);
  }

  componentDidMount() {
    const headers = {"Content-Type": "application/json"};

    if (localStorage.getItem('auth-token')) {
      headers["Authorization"] = localStorage.getItem('auth-token');
    }

    fetch('http://127.0.0.1:8000/connect/get_info/', { headers, })
      .then(response => response.json())
      .then((data) => { this.setState( {foo: data })
      })
    .catch(console.log)
  }

  addKarma(event) {
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('auth-token'),
      },
      body: JSON.stringify({user_karma: this.state.user_karma})
    };
    fetch('http://127.0.0.1:8000/connect/add_karma/', requestOptions)
    .then(response => {response.json()})
      .then((data) => {
        this.setState({ }, () => {
          console.log("mail has been sent\n\n");
        })
      })
      .catch(console.log)

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
    <p>Karma: {foo['user_karma']}</p>
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

        {/* Add karma. Only show when user is logged in */}

        {/* Comment out for now
                { localStorage.getItem('auth-token') ?
          <button 
            onClick={this.addKarma}
            className={styles.button}>
            Karma+1
          </button> : 
          <></>
        }
        End of comment */}

        <input
          type="text"
          value={this.state.user_karma}
          placeholder="New karma"
          onChange={(event) => {
            this.setState({user_karma: event.target.value})
          }} 
        />

        <button
          value={this.state.user_karma}
          onClick={(event) => {
            this.setState(prevState => ({
              user_karma: prevState.user_karma +1
            }));
          }}
        >
          Karma+1
        </button>

        <button
          onClick={this.addKarma}
          className={styles.button}>
          Send new karma to backend
        </button>

        </div>
      </>
    );
  }
}

export default Karma

