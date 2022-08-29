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
        user_interest1: '',
        user_interest2: '',
        user_interest3: '',
        prefs_save_success: false,
        pfp_success: false,
        pfp: '',
      };

      this.handleSubmitPrefs = this.handleSubmitPrefs.bind(this);
      this.onCheck = this.onCheck.bind(this);
      this.TutorForm = this.TutorForm.bind(this);
      this.CollegeForm = this.CollegeForm.bind(this);
      this.openFileDialog = this.openFileDialog.bind(this);
      this.displayPicture = this.displayPicture.bind(this);
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
              discord: data.discord,
              user_interest1: data.user_interest1,
              user_interest2: data.user_interest2,
              user_interest3: data.user_interest3,
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
          discord: this.state.discord,
          user_interest1: this.state.user_interest1,
          user_interest2: this.state.user_interest2,
          user_interest3: this.state.user_interest3,
          pfp: this.state.pfp
        })
      };
    
      fetch('http://127.0.0.1:8000/account/set_prefs/', requestOptions)
        .then(response => response.json())
        .then((data) => {
          this.setState({ }, () => {
            //console.log(data.pfp);
          })
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

    openFileDialog (accept, callback) {  
      // Create an input element and display element
      var inputElement = document.createElement("input");

      // Set its type to file
      inputElement.type = "file";

      // Set accept to the file types you want the user to select. 
      // Include both the file extension and the mime type
      inputElement.accept = ".png";

      // set onchange event to call callback when user has selected file
      inputElement.addEventListener("change", callback)

      // dispatch a click event to open the file dialog
      inputElement.dispatchEvent(new MouseEvent("click")); 

      inputElement.addEventListener("change", (e) => {
        var size_limit = false;
        if(inputElement.files[0].size > 200000){
          console.log("FILE TOO BIG!")
          size_limit = true;
        };
        
        var file = inputElement.files[0];
        var imageType = /image.png/;

        if (file.type.match(imageType) && size_limit === false) {
          var p = new Promise(function(resolve) {
            var reader = new FileReader();
            reader.onload = function() {
              var img = new Image();
              img.src = reader.result;
              var pfp = img.src
              resolve(pfp);
            };
            reader.readAsDataURL(file);
          });
          
          p.then((data) => {
            this.setState({
              pfp_success: true,
              pfp: data
            },() => console.log());
          })
        }
      })
    } 

    displayPicture() {
      //console.log(this.state.pfp)
      return(<>
        <img src={this.state.pfp} alt="pfp"></img>
      </>)
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
        
        <br />
        <p>Change profile picture</p>
        <button onClick={this.openFileDialog}>Select file</button>
        <br />

        <img src={this.state.pfp} alt=""></img>
        <br /><br />

{/* 
        {this.state.pfp_success ? <this.displayPicture /> : <p>No pfp</p>}
*/}

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

        <label>Interest 1</label>
        <input 
          type="text" 
          value={this.state.user_interest1} 
          className="field"
          style={{marginBottom: "15px"}}
          onChange={(event) => {
            this.setState({ user_interest1: event.target.value })
          }} 
        />
        <label>Interest 2</label>
        <input 
          type="text" 
          value={this.state.user_interest2} 
          className="field"
          style={{marginBottom: "15px"}}
          onChange={(event) => {
            this.setState({ user_interest2: event.target.value })
          }} 
        />
        <label>Interest 3</label>
        <input 
          type="text" 
          value={this.state.user_interest3} 
          className="field"
          style={{marginBottom: "15px"}}
          onChange={(event) => {
            this.setState({ user_interest3: event.target.value })
          }} 
        />

{/* 
        <div className={styles.question}>
          <p>Would you like to become a tutor?</p>
          <input 
            type="checkbox" 
            className={styles.checkbox} 
            onClick={this.onCheck}/>
        </div>

        {this.state.tutor_checked ? <this.TutorForm /> : <></>}
*/}

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