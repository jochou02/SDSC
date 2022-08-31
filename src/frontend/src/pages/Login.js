import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LoggedInTester from '../buttons/LoggedInTester';
import styles from '../styles/Login.module.css'
import trident from '../icons/trident.png';

class Login extends Component {
    constructor(props) {
      super(props);
      this.state = { username: '',
                     password: '',
                     token: '',
                     failed: false };

      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              username: this.state.username,password: this.state.password})
        };

        this.setState({ username: '' ,
                        password: ''})
    
        fetch('http://127.0.0.1:8000/account/token_auth/', requestOptions)
              .then(response => response.json())
              .then((data) => {
                this.setState({ token: data['token'] }, () => {
                    this.foo()
              })
        })
        .catch(console.log)

        event.preventDefault();
    }

    // On success, store the token somewhere and redirect to profile
    foo() {
        if (this.state.token) {
            localStorage.setItem('auth-token', 'Token ' + this.state.token );

            this.render();
            //route
            window.location.href = 'http://localhost:3000/profile';
        } else {
            this.setState({ failed: true })
        }
    }

  
    render() {
      return ( 
        <>

        <div className={styles.logo} id="logo">
			    <img src={trident} className={styles.logoPic} alt=""/> 
          <p className={styles.logoText}>UC Socially Undead</p>
		    </div>

        <div className={styles.wrapper}>
          <p className="formTitle">Login</p>
          {this.state.failed ? <div className={styles.loginError}>Login Failed</div> : console.log()}
          <form onSubmit={this.handleSubmit}
          className="formWrapper"> 

          <input 
            type="text" 
            className="field"
            value={this.state.username}
            placeholder="Username"
            onChange={(event) => {
              this.setState({ username: event.target.value })
            }}/> <br />

          <input 
          type="text" 
          className="field"
          value={this.state.password} 
          placeholder="Password"
          onChange={(event) => {
            this.setState({ password: event.target.value })
          }}/> <br />

          <input type="submit" value="Submit" className="button"/>

          </form>

          <Link to="/forgot_pass" state={{ from: "occupation" }}
          className={styles.link}>
            Forgot your password?
          </Link>

          <Link to="/register" state={{ from: "occupation" }}
          className={styles.link}>
            Don't have an account? Create account
          </Link>

        </div>
        </>
      );
    }
  }

  export default Login