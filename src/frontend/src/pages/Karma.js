import React, { Component } from 'react';

// eslint-disable-next-line
import LoggedInTester from '../buttons/LoggedInTester';
import styles from '../styles/Karma.module.css'

class Karma extends Component {
  constructor (props) {
    super(props);
    this.state = { 
      add_karma: 1, 
      user_id: ''
    };
    this.addKarma = this.addKarma.bind(this);
  }

  componentDidMount() {
    this.setState({user_id: this.props.id}, () => {
      //console.log(this.state.user_id)
    })
  }

  addKarma() {
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('auth-token'),
      },
      body: JSON.stringify({
        add_karma: 1, 
        user_id: this.state.user_id})
    };
    fetch('http://127.0.0.1:8000/connect/add_karma/', requestOptions)
    .then(response => {response.json()})
    .catch(console.log);
  }

  render() {
    return (
      <>
{/*
        <p>
          {"Karma to add (testing): "+ this.state.add_karma}
        </p>
*/}
        <button
          value={this.state.add_karma}
          className={styles.add_button}
          onClick={this.addKarma}
        >
          Karma+1
        </button>
{/* 
        <button
          onClick={this.addKarma}
          className={styles.backend_button}>
          Send info to backend
        </button>
*/}
      </>
    );
  }
}

export default Karma

