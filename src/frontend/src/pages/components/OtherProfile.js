import React, { Component } from 'react';

import LoggedInTester from '../../buttons/LoggedInTester'
import styles from '../../styles/OtherProfile.module.css'
import pfp from '../../icons/pfp.png'
import withRouter from './withRouter';

class OtherProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { id: '', userInfo: [], };
  }

  componentDidMount() {
    this.setState({id: this.props.params.userId}, () => {
      this.getUserProfile();
    })
  }

  getUserProfile() {
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
        this.setState({userInfo: data}, () => {console.log()})
      })
    .catch(console.log);
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log(prevProps);
    //console.log(this.props.userInfo);
    if (prevProps.userInfo !== this.props.userInfo) {
      this.setState({userInfo: this.props.userInfo}, () => console.log())
    }
  }

  ShowProfile = ({ userInfo }) => {
    return (<>
      <div className={styles.profile_wrapper2}>      
        <img src={pfp} alt="pfp" className={styles.pfp}></img>
        <div className={styles.profile_info_wrapper}>
          <p>ID: {userInfo['id']}</p>
          <p className={styles.name}>
            {userInfo['first_name']}
            {' '}
            {userInfo['last_name']}
          </p>
          <p>College: {userInfo['user_college']}</p>
          <p>Major: {userInfo['user_major']}</p>
          <p>Karma: {userInfo['user_karma']}</p>
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
          <this.ShowProfile userInfo={this.state.userInfo} />
        </div>
      </div>
    </>);
  }
}

export default withRouter(OtherProfile);