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
    this.state = { foo: [], };
  }

  componentDidMount() {
    this.setState({foo: this.props.foo}, () => console.log("foo"));
  }

  ShowProfile = ({ foo }) => {
    return (<>
      <div className={styles.profile_wrapper2}>      
        <img src={pfp} alt="pfp" className={styles.pfp}></img>
        <div className={styles.profile_info_wrapper}>
          <p>ID: {foo['id']}</p>
          <p className={styles.name}>
            {foo['first_name']}
            {' '}
            {foo['last_name']}
          </p>
          <p>College: {foo['user_college']}</p>
          <p>Major: {foo['user_major']}</p>
          <p>Karma: {foo['user_karma']}</p>
          <hr className={styles.solid}></hr>
        </div>
      </div>
    </>);
  } 

  render() {
    return (<>
      <div className={styles.componentWrapper}>
        <LoggedInTester />
        {/* Sufficient to get whatever info we need from user */}
        { localStorage.getItem('auth-token') }
      </div>

      <div className={styles.wrapper}>
        <div className={styles.profile_wrapper}>
          <this.ShowProfile foo={this.state.foo} />
        </div>
      </div>
    </>);
  }
}

export default TestProfile