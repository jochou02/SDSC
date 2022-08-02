import React, { Component } from 'react';

import LoggedInTester from '../buttons/LoggedInTester';
import '../styles/ForgotPass.css'

/*
    Basically the workflow of this page goes like this.

    1. User inputs email, and then when the "Send Code" button is hit, handleSubmitAuth is called.

    2. handleSubmitAuth makes a call to the GenEmailAuth API on the server.
        a. GenEmailAuth requires two input. One is the email for us to send the code to, another
            is the mode indicator. Here, we indicated that we are in fpwd(forgot password) mode.

        b. GenEmailAuth would then check whether the email is associated with any accounts.
            In forgot password mode, there is supposed to be exactly one account that's associated, so
            if there's none, GenEmailAuth would let us know by:
                i. signaling something is wrong by sending auth_status = 1
                ii. return an empty string as the authentication code. This is important because the
                    default for auth_server is empty string and that's how we check if we have received
                    a real authentication code from the server.

        c. If there is, indeed, an account associated with the account, then GenEmailAuth generates a 8-digit
            token, and sends it back to the front-end, which the front-end then stores as auth_server.

            Now, realistically, GenEmailAuth is also supposed to send an email to the user, we will make that happen
            down the road. To test the functionality, since the tokens are transmitted in plaintext, we could inspect
            its value in the network section of the developer's mode.

    3. Now that a code has been retrieved, auth_server is no longer empty string, so instead of requestAuthCode,
        checkAuthCode is now going to be displayed, which:
            a. Displays authForm, which takes in user's input for the authentication code, and
                checks it against the code that server has sent us. Upon success, we mark auth_success to be True, at
                which point...

            b. Displays a "Verification Success" in place of the auth form.

    4. With auth_success = True, !auth_sucess = False, so the submit button for the textbox that contains user's input
        for new password would no longer be disabled. At this point, the user could input the desired new password, and
        upon hitting submit, we call UpdatePassword API on the backend with the supplied password, and UpdatePassword
        would update the password for the user.
*/

class ForgotPass extends Component {
    constructor(props) {
      super(props);
      /*
                     email: User's input in the email box

                     auth_server: Auth code from server, keep this as empty string until
                                  server confirms the email

                     auth_user: User's input in the box for auth code

                     auth_status: Whether the request for auth code is successful
                                  (0 is success, 1 is fail)

                     auth_success: Whether the user has successfully authenticated against
                                   the code from server. Lock email box upon success so
                                   the user couldn't swap the email after auth and change
                                   someone else's password.
      */
      this.state = { email: '',
                     auth_server: '',
                     auth_user: '',
                     auth_status: '',
                     auth_success: false,
                    };

      // this binding for functions
      this.handleSubmitReg = this.handleSubmitReg.bind(this);
      this.handleSubmitAuth = this.handleSubmitAuth.bind(this);

      this.requestAuthCode = this.requestAuthCode.bind(this);
      this.checkAuthCode = this.checkAuthCode.bind(this);

      this.regForm = this.regForm.bind(this);
      this.authForm = this.authForm.bind(this);
    }

    /*
        Makes a POST request to UpdatePassword API. Unless we introduce some restriction on password,
        there's no way this function / API call can fail, so we just re-direct user to login page.
    */
    handleSubmitReg(event) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            // Note the body here contains user's email and new password
            body: JSON.stringify({ password: this.state.password,
                                   email: this.state.email,
                                   })
        };

        fetch('http://127.0.0.1:8000/account/update_password/', requestOptions)
              .then(response => response.json())
              .then((data) => {
                this.setState({}, () => {
                    // This setState({?} (?) => {???}) thing seems to be a trick to wait till fetch is finished
                    // before executing the arrow function? I'm not sure but it works.
                    window.location.href = 'http://localhost:3000/login';
              })
        })
        .catch(console.log)

        event.preventDefault();
    }

    /*
        Makes a POST request to GenEmailAuth API, and stores the response (server-generated auth code, and status code)
        in auth_server and auth_status.
    */
    handleSubmitAuth(event) {
//        console.log("Yay");
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ email: this.state.email,
                                   mode: 'fpwd'})
        };

        fetch('http://127.0.0.1:8000/account/gen_auth/', requestOptions)
              .then(response => response.json())
              .then((data) => {
                    this.setState({ auth_server: data['auth_server'].toString(),
                                    auth_status: data['status']})
        })
        .catch(console.log)

        event.preventDefault();
    }

    /*
        Shows the button for requesting an auth code. If email is not associated with any account, show err msg here.
    */
    requestAuthCode() {
        return(
        <>
            { this.state.auth_status === 1 ? <> No user associated with this email </> : <></>}
            <br />
            <form onSubmit = {this.handleSubmitAuth}>
                <input type="submit" value="Send Code" className="button"/>
            </form> <br /> <br />
        </>
        )
    }

    /*
        If auth_success is True, meaning the user has successfully authenticated against the server-generated code,
        then display "Verification Success". Otherwise, render the authForm, which would ask user to enter
        the auth code they received.
    */
    checkAuthCode() {
        return(<>
        { this.state.auth_success ? <p className="success-message">Verification Success</p> : <this.authForm /> }
        <br /> <br />
        </>)
    }

    /*
        Renders a textbox that records user's input for auth code, and a button which sets auth_success to True if the code user inputs matches the one from the server, or False otherwise.
    */
    authForm() {
        return(
        <>
            <>A Code Has Been Sent</>
            <form 
                onSubmit = {(event) => { 
                    this.setState({ auth_success: (this.state.auth_user === this.state.auth_server) 
                    });
                    event.preventDefault();
                }}
                className="form-wrapper" >
                <input 
                type="text" 
                value={this.state.auth_user} 
                className="field"
                placeholder="Verification Code"
                onChange={(event) => {
                    this.setState({ auth_user: event.target.value })
                }} /> <br />
                <input type="submit" value="Verify" className="button"/>
            </form>
        </>
        )
    }

    /*
        Renders a textbox that records user's input for password, and a box for submitting that.

        Note that the submit button is disabled until auth_success becomes True.
    */
    regForm() {
        return (
        <>
            <div className="wrapper">
            <p className="form-title">Create a new password</p>
            <form onSubmit={this.handleSubmitReg}
            className="form-wrapper">
            <input 
                type="text" 
                value={this.state.password} 
                className="field"
                placeholder="Password"
                onChange={(event) => {
                    this.setState({ password: event.target.value })
                }} /> 
            <br />

            {/* More robust error handling here? (Keep disabled until all fields non-empty) */}
            <input 
                type="submit" 
                value="Submit" 
                className="button" 
                disabled= {!this.state.auth_success} 
            />
            </form>
            </div>
        </>
        )
    }

    render() {
      return (
        <>
        {/* Shows Login status / link to login/out */}
        <LoggedInTester />

        {/* Textbox for email. Note we disable this box upon auth success*/}
        <div className="wrapper">
        <p className="form-title">Email verification</p>
        <input 
        type="text" 
        value={this.state.email} 
        className="field"
        disabled={this.state.auth_success}
        placeholder="Email"
        onChange={(event) => {
            this.setState({ email: event.target.value })
        }} />

        {/* */}


        <br />

        {/*
            If server has sent a non-empty code, show interface for verifying that code.
            Otherwise, show interface for sending a code
         */}
        {this.state.auth_server ?
            <this.checkAuthCode /> :
            <this.requestAuthCode />}

        </div>
        <br />

        <this.regForm />
        

        </>
      );
    }
  }

  export default ForgotPass
