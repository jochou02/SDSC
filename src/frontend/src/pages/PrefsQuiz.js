import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LoggedInTester from '../buttons/LoggedInTester';
import styles from '../styles/PrefsQuiz.module.css';

class PrefsQuiz extends Component {
    constructor(props) {
      super(props);
      this.state = { username: '',
                     password: '',
                     email: '',
                     first_name: '',
                     last_name: '',
                     tutor_checked: null,
                    };

      this.handleSubmitPrefs = this.handleSubmitPrefs.bind(this);
      this.onCheck = this.onCheck.bind(this);
      this.tutorForm = this.tutorForm.bind(this);
    }


    handleSubmitPrefs(event) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ 
          username: this.state.username,password: this.state.password, email: this.state.email,
          first_name: this.state.first_name,last_name: this.state.last_name,})
      };
    
      fetch('http://127.0.0.1:8000/account/register/', requestOptions)
        .then(response => response.json())
        .then((data) => {
          this.setState({ }, () => {
              window.location.href = 'http://localhost:3000/login';})
        })
        .catch(console.log)
        event.preventDefault();
    }

    onCheck(event) {
      this.setState({tutor_checked: event.target.checked});
    }

    tutorForm() {
      return (
        <>
        <p>What courses would you like to tutor?</p>
        <select name="Courses" multiple>
          <option value="BIMM100">BIMM 100</option>
          <option value="BICD110">BICD110</option>
          <option value="BIPN102">BIPN102</option>
        </select>
        <br />
        </>
      )
    }

    render() {
      return (
        <>
        <LoggedInTester />
        <div className={styles.wrapper}>
        <p className="formTitle">User Preferences</p>
        <form onSubmit={this.handleSubmitReg} className="formWrapper">
            
        <div className={styles.question}>
          <p>Would you like to become a tutor?</p>
          <input 
            type="checkbox" 
            className={styles.checkbox} 
            onClick={this.onCheck}/>
        </div>

        {this.state.tutor_checked ? <this.tutorForm /> : <></>}

        <input 
            type="submit" 
            value="Submit" 
            className={styles.button}
        />

          <Link to="/profile" state={{ from: "occupation" }}
          className={styles.link}>
          Back to Profile
          </Link>

        </form>
        </div>
        </>
      );
    }
  }

  export default PrefsQuiz