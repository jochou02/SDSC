import React, { Component } from 'react'
import styles from '../../styles/Test.module.css'
import { Link } from 'react-router-dom'
import TestProfile from './TestProfile'

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {id: '', foo: []};
  }

  getUserProfile() {
    console.log(this.state);
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('auth-token'),
      },
      body: JSON.stringify({id: this.state.id})
    };
    fetch('http://127.0.0.1:8000/connect/get_info/', requestOptions)
    .then(response => response.json())
      .then((data) => {
        this.setState({id: data.id, foo: data}, () => {console.log("yay test")
        })
      })
    .catch(console.log);
  }

  test(e) {
    this.setState({id: e}, () => this.getUserProfile());
  }

  render() {
    return (<>
      <button 
        className={styles.profileButton}
        onClick={() => {
          this.test(this.props.id)
        }}>
        Display User Profile
      </button>
      <TestProfile foo={this.state.foo}/>
     </>);
  }
}

export default Test