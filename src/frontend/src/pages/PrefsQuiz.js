import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LoggedInTester from '../buttons/LoggedInTester';
import styles from '../styles/PrefsQuiz.module.css';

class PrefsQuiz extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        user_id: 0,
        college: '',
        major: '',
        tutor_checked: '',
        phone: '',
        ig: '',
        discord: '',
        prefs_save_success: false,
      };

      this.handleSubmitPrefs = this.handleSubmitPrefs.bind(this);
      this.onCheck = this.onCheck.bind(this);
      this.TutorForm = this.TutorForm.bind(this);
      this.CollegeForm = this.CollegeForm.bind(this);
    }

    componentDidMount() {
      const headers = {"Content-Type": "application/json"};
  
      if (localStorage.getItem('auth-token')) {
        headers["Authorization"] = localStorage.getItem('auth-token');
      }

      fetch('http://127.0.0.1:8000/connect/get_info/', { headers, })
        .then(response => response.json())
        .then((data) => {
            this.setState({ 
              foo: data,
              user_id: data.id,
              college: data.user_college,
              major: data.user_major,
              phone: data.phone,
              ig: data.ig,
              discord: data.discord
            });
            //console.log(data);
        })
      .catch(console.log)
    }

    handleSubmitPrefs(event) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ 
          user_id: this.state.user_id,
          college: this.state.college,
          major: this.state.major,
          tutor_checked: this.state.tutor_checked,
          phone: this.state.phone,
          ig: this.state.ig,
          discord: this.state.discord})
      };
    
      fetch('http://127.0.0.1:8000/account/set_prefs/', requestOptions)
        .then(response => response.json())
        .then((data) => {
          this.setState({ }, () => {
            console.log();})
        })
        .catch(console.log)
        event.preventDefault();
    }

    onCheck(event) {
      this.setState({tutor_checked: event.target.checked});
    }

    TutorForm() {
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

    CollegeForm() {
      return (
        <>
        <p>What college are you in?</p>
        <select 
          name="Colleges" 
          onChange={(event) => {
              this.setState({ college: event.target.value })
          }}
          value={this.state.college}
          >
          <option value="Revelle">Revelle</option>
          <option value="Muir">Muir</option>
          <option value="Marshall">Marshall</option>
          <option value="Warren">Warren</option>
          <option value="ERC">ERC</option>
          <option value="Sixth">Sixth</option>
          <option value="Seventh">Seventh</option>
          <option value="Eighth">Eighth</option>
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

        <this.CollegeForm />

        <label>Major</label>
        <input 
            type="text" 
            value={this.state.major} 
            placeholder="Major"
            className="field"
            onChange={(event) => {
              this.setState({ major: event.target.value })
            }} 
        /><br />

        <label>Phone Number</label>
        <input 
            type="text" 
            value={this.state.phone} 
            className="field"
            onChange={(event) => {
              this.setState({ phone: event.target.value })
            }} 
        />

        <label>Instagram</label>
        <input 
          type="text" 
          value={this.state.ig} 
          className="field"
          onChange={(event) => {
            this.setState({ ig: event.target.value })
          }} 
        />

        <label>Discord</label>
        <input 
          type="text" 
          value={this.state.discord} 
          className="field"
          style={{marginBottom: "15px"}}
          onChange={(event) => {
            this.setState({ discord: event.target.value })
          }} 
        />

        <div className={styles.question}>
          <p>Would you like to become a tutor?</p>
          <input 
            type="checkbox" 
            className={styles.checkbox} 
            onClick={this.onCheck}/>
        </div>

        {this.state.tutor_checked ? <this.TutorForm /> : <></>}

        <input 
            type="submit" 
            value="Submit" 
            className={styles.button}
            onClick={() => {
              this.setState({ prefs_save_success: true})
            }}
        />

        {this.state.prefs_save_success ? <p className={styles.message}>Preferences saved</p> : <></>}

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