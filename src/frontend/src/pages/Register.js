import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LoggedInTester from '../buttons/LoggedInTester';
import styles from '../styles/Register.module.css';

class Register extends Component {
    constructor(props) {
      super(props);
      this.state = { username: '',
                     password: '',
                     email: '',
                     first_name: '',
                     last_name: '',
                     auth_server: '',
                     auth_user: '',
                     auth_status: '',
                     auth_success: false,
                     email_success: false,
                    };

      this.handleSubmitReg = this.handleSubmitReg.bind(this);
      this.handleSubmitAuth = this.handleSubmitAuth.bind(this);

      this.requestAuthCode = this.requestAuthCode.bind(this);
      this.checkAuthCode = this.checkAuthCode.bind(this);

      this.regForm = this.regForm.bind(this);
      this.authForm = this.authForm.bind(this);

      this.checkEmail = this.checkEmail.bind(this);
    }

    handleSubmitReg(event) {
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
                    window.location.href = 'http://localhost:3000/login';
              })
        })
        .catch(console.log)

        event.preventDefault();
    }

    handleSubmitAuth(event) {
      if (this.state.email_success == true) {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', },
          body: JSON.stringify({ 
            email: this.state.email,
            mode: 'reg'})
        };

        fetch('http://127.0.0.1:8000/account/gen_auth/', requestOptions)
          .then(response => response.json())
          .then((data) => {
            this.setState({ 
              auth_server: data['auth_server'].toString(),
              auth_status: data['status']})
        })
        .catch(console.log)
        event.preventDefault();
      }
    }

    requestAuthCode() {
        return(
        <>
            <form onSubmit = {this.handleSubmitAuth}>
                <input type="submit" value="Send Code" 
                className={styles.button}
                style={{marginTop: 20}}/>
            </form>
        </>)
    }

    checkAuthCode() {
        return(
        <>
            { this.state.auth_success ? <p className={styles.successMessage}>Verification Success</p> : <this.authForm /> }
        </>)
    }

    authForm() {
      return(<>
        <>A Code Has Been Sent</>
        <form 
        onSubmit = {(event) => { 
          this.setState({ 
            auth_success: (this.state.auth_user === this.state.auth_server) });
          event.preventDefault();
        }}
        className="formWrapper">
        <p>Enter Your Verification Code Here:</p>
        <input 
          type="text" 
          value={this.state.auth_user} 
          onChange={(event) => {
            this.setState({ 
              auth_user: event.target.value })
          }}
          className="field"
          style={{width: "100px"}} />
        <br />
        <input type="submit" value="Verify" className={styles.button}/>
        </form>
      </>)
    }

    regForm() {
        return (
        <>
          <div className={styles.wrapper}>
          <p className="formTitle">Create Account</p>
          <form onSubmit={this.handleSubmitReg} className="formWrapper"><input 
            type="text" 
            value={this.state.first_name} 
            placeholder="First Name"
            className="field"
            onChange={(event) => {
              this.setState({ first_name: event.target.value })
            }} 
          /> <br />

          <input 
            type="text" 
            value={this.state.last_name} 
            placeholder="Last Name"
            className="field"
            onChange={(event) => {
              this.setState({ last_name: event.target.value })
            }} 
          /> <br />

          <input 
            type="text" 
            value={this.state.username}
            placeholder="Username" 
            className="field"
            onChange={(event) => {
              this.setState({ username: event.target.value })
            }}
          /> <br />

          <input 
            type="text" 
            value={this.state.password}
            placeholder="Password"
            className="field"
            onChange={(event) => {
              this.setState({ password: event.target.value })
            }} 
          /> <br />

            {/* More robust error handling here? (Keep disabled until all fields non-empty) */}
            <input 
              type="submit" 
              value="Submit" 
              disabled= {!this.state.auth_success}
              className={styles.button}
            />

            <Link to="/login" state={{ from: "occupation" }}
            className={styles.link}>
            Already have an account? Sign in
            </Link>
          </form>
          </div>
        </>
        )
    }

    checkEmail(event) {
      const email = event.target.value;
      //Regular expression to check if email ends in ucsd.edu
      let regExp =  /^[a-z]+@+ucsd.edu$/;
      if(email.match(regExp)) {
        event.target.className = styles.emailSuccess;
        this.setState({
          email_success: true,
          auth_status: '',
        },() => console.log());
        return true;
      } else {
        //If field is empty, reset to default grey border
        if(email === "") {
            event.target.className = styles.email;
            this.setState({
              email_success: false,
              auth_status: '',
            },() => console.log());
            return true;
        }
        //If input is invalid
        event.target.className = styles.emailError;
        this.setState({
          email_success: false,
          auth_status: '',
        },() => console.log());
        return false;
      }
    }
    
    render() {
      return (
        <>

        <LoggedInTester />

        <div className={styles.emailWrapper}>
        <p className="formTitle">Email Verification</p>
        <input 
          className={styles.email}
          type="text" 
          value={this.state.email} 
          disabled={this.state.auth_success}
          placeholder="Email"

          onChange={(event) => { 
            this.setState({ email: event.target.value }) 
            //Border color will change as user types
            this.checkEmail(event)
          }}

          onFocus={(event) => {
            this.checkEmail(event)
          }}

          onBlur={(event) => {
            //If email is invalid, keep red border
            //Else, reset to default border
            if(!this.checkEmail(event)) {
              this.checkEmail(event)
            } else {
              event.target.className=styles.email;
            }
          }}
        />

        { this.state.auth_status === 1 ? <p className={styles.errorMessage}>Email already exists</p> : <></>}

        { (this.state.email_success && this.state.auth_status !== '') ? <this.checkAuthCode /> : <this.requestAuthCode />}
        </div>

        <this.regForm />
        </>
      );
    }
  }

  

  export default Register