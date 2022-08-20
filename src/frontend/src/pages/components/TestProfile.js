import React, { Component } from 'react';
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';

import LoggedInTester from '../../buttons/LoggedInTester'
import Karma from '../Karma'
import styles from '../../styles/TestProfile.module.css'

import pfp from '../../icons/pfp.png'

class TestProfile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const headers = {"Content-Type": "application/json"};

    if (localStorage.getItem('auth-token')) {
        headers["Authorization"] = localStorage.getItem('auth-token');
    }

    fetch('http://127.0.0.1:8000/connect/get_info/', { headers, })
        .then(response => response.json())
        .then((data) => {
            this.setState({ foo: data });
            console.log(data);
        })
    .catch(console.log)
}

  render() {
    return (
      <p>Hello</p>
    );
  }
}

export default TestProfile