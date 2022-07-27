import React, { Component } from 'react';

import LoggedInTester from '../buttons/LoggedInTester';

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
      this.state = { email: '',
                     auth_server: '',
                     auth_user: '',
                     auth_status: '',
                     auth_success: false,
                    };

      this.handleSubmitReg = this.handleSubmitReg.bind(this);
      this.handleSubmitAuth = this.handleSubmitAuth.bind(this);

      this.requestAuthCode = this.requestAuthCode.bind(this);
      this.checkAuthCode = this.checkAuthCode.bind(this);

      this.regForm = this.regForm.bind(this);
      this.authForm = this.authForm.bind(this);
    }


    handleSubmitReg(event) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ password: this.state.password,
                                   email: this.state.email,
                                   })
        };

        fetch('http://127.0.0.1:8000/account/update_password/', requestOptions)
              .then(response => response.json())
              .then((data) => {
                this.setState({}, () => {
                    window.location.href = 'http://localhost:3000/login';
              })
        })
        .catch(console.log)

        event.preventDefault();
    }

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

    requestAuthCode() {
        return(
        <>
            <form onSubmit = {this.handleSubmitAuth}>
                <input type="submit" value="Send Code" />
            </form> <br /> <br />
        </>
        )
    }

    checkAuthCode() {
        return(
        <>
            { this.state.auth_success ? <>Verification Success</> : <this.authForm /> }
            <br /> <br />
        </>
        )
    }

    authForm() {
        return(
        <>
            <>A Code Has Been Sent</>
            <form onSubmit = {(event) => { this.setState({ auth_success: (this.state.auth_user === this.state.auth_server) }); event.preventDefault();}}>
                <label>

                    Enter Your Verification Code Here:
                    <input type="text" value={this.state.auth_user} onChange={(event) =>
                                                                                {this.setState({ auth_user: event.target.value })}} />

                </label> <br />
                <input type="submit" value="Verify" />
            </form>
        </>
        )
    }

    regForm() {
        return (
        <>
            <form onSubmit={this.handleSubmitReg}>
                <label>
                    Password:
                    <input type="text" value={this.state.password} onChange={(event) =>
                                                                                {this.setState({ password: event.target.value })}} />
                </label> <br />

                {/* More robust error handling here? (Keep disabled until all fields non-empty) */}
                <input type="submit" value="Submit" disabled= {!this.state.auth_success} />
            </form>
        </>
        )
    }

    render() {
      return (
        <>

        <LoggedInTester />

        <label>
                    E-Mail:
                    <input type="text" value={this.state.email} disabled={this.state.auth_success}
                                        onChange={(event) => {this.setState({ email: event.target.value })}} />
        </label>

        { this.state.auth_status == 1 ? <> No user associated with this email </> : <></>}

        <br />

        {this.state.auth_server ?
            <this.checkAuthCode /> :
            <this.requestAuthCode />}

        <this.regForm />

        </>
      );
    }
  }

  export default ForgotPass
