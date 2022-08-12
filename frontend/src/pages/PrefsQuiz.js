import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LoggedInTester from '../buttons/LoggedInTester';
import styles from '../styles/PrefsQuiz.module.css';

class PrefsQuiz extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        user_id: 0,
        tutor_checked: null,
        phone: '',
        ig: '',
        discord: '',
      };

      this.handleSubmitPrefs = this.handleSubmitPrefs.bind(this);
      this.onCheck = this.onCheck.bind(this);
      this.tutorForm = this.tutorForm.bind(this);
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

    handleSubmitPrefs(event) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ 
          user_id: this.state.user_id,
          tutor_checked: this.state.tutor_checked,
          phone: this.state.phone,
          ig: this.state.ig,
          discord: this.state.discord})
      };
    
      fetch('http://127.0.0.1:8000/account/set_prefs/', requestOptions)
        .then(response => response.json())
        .then((data) => {
          this.setState({ }, () => {
            console.log("mail has been sent\n\n");})
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
        <form onSubmit={this.handleSubmitPrefs} className="formWrapper">
            
        <div className={styles.question}>
          <p>Would you like to become a tutor?</p>
          <input 
            type="checkbox" 
            className={styles.checkbox} 
            onClick={this.onCheck}/>
        </div>

        {this.state.tutor_checked ? <this.tutorForm /> : <></>}

        <input 
            type="text" 
            value={this.state.phone} 
            placeholder="Phone Number"
            className="field"
            onChange={(event) => {
              this.setState({ phone: event.target.value })
            }} 
        />

        <input 
          type="text" 
          value={this.state.phone} 
          placeholder="Instagram"
          className="field"
          onChange={(event) => {
            this.setState({ ig: event.target.value })
          }} 
        />

        <input 
          type="text" 
          value={this.state.discord} 
          placeholder="Discord"
          className="field"
          onChange={(event) => {
            this.setState({ phone: event.target.value })
          }} 
        />

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