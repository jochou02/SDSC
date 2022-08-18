import React, { Component } from 'react';

// eslint-disable-next-line
import LoggedInTester from '../buttons/LoggedInTester';
import styles from '../styles/Karma.module.css'

class Karma extends Component {
  constructor (props) {
    super(props);
    this.state = { 
      foo: [],
      add_karma: 0, 
      user_id: 0,
    };
    this.addKarma = this.addKarma.bind(this);
  }

  componentDidMount() {
    const headers = {"Content-Type": "application/json"};

    if (localStorage.getItem('auth-token')) {
      headers["Authorization"] = localStorage.getItem('auth-token');
    }

    fetch('http://127.0.0.1:8000/account/get_user_info/', { headers, })
      .then(response => response.json())
      .then((data) => {
        this.setState({ foo: data })
        this.setState({user_id: data.id})
      })
    .catch(console.log)
  }

  addKarma() {
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('auth-token'),
      },
      body: JSON.stringify({add_karma: this.state.add_karma, user_id: this.state.user_id})
    };
    fetch('http://127.0.0.1:8000/connect/add_karma/', requestOptions)
    .then(response => {response.json()})
      .then(() => {
        this.setState({ }, () => {
          console.log();
        })
      })
      .catch(console.log)

      //event.preventDefault();
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
      {/*
        <div className={styles.componentWrapper}>
        <LoggedInTester />
        { localStorage.getItem('auth-token') } <br /><br /><br />
        </div>
      */}
        {/* Example of showing user's information */}
        <div className={styles.profileWrapper}>

        {/* 
        <this.ShowProfile foo={this.state.foo} /> 
        */}
        <p>
          {"Karma to add (testing): "+ this.state.add_karma}
        </p>
        <button
          value={this.state.add_karma}
          className={styles.add_button}
          onClick={(event) => {
            this.setState(prevState => ({
              add_karma: prevState.add_karma +1
            }));
          }}
        >
          Karma+1
        </button>

        <button
          onClick={this.addKarma}
          className={styles.backend_button}>
          Send info to backend
        </button>
        </div>
      </>
    );
  }
}

export default Karma

