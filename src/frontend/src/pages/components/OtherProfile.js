import React, { Component } from 'react';

import LoggedInTester from '../../buttons/LoggedInTester'
import Karma from '../Karma'
import styles from '../../styles/OtherProfile.module.css'
import withRouter from './withRouter';

class OtherProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      id: '', //ID of user to display profile for
      viewerID: '', //ID of user who is viewing profile i.e. auth user
      userInfo: [],
      courses: [],
      pfp: '', 
      matched: [],
      pending: [],
      //Will be changed when we call checkID()
      //Want to know whether the profile the user is viewing is that of a match or pending
      valid_matched: false,
      valid_pending: false,
    };

    this.getUserProfile = this.getUserProfile.bind(this);
    this.getMatches = this.getMatches.bind(this);
    this.getID = this.getID.bind(this);
    this.checkID = this.checkID.bind(this);
  }

  componentDidMount() {
    this.setState({
      id: parseInt(this.props.params.userId),
    }, () => {
      this.getUserProfile();
      this.getMatches();
    })
  }

  getMatches() {
    const headers = {"Content-Type": "application/json"};

    if (localStorage.getItem('auth-token')) {
      headers["Authorization"] = localStorage.getItem('auth-token');
    }

    fetch('http://127.0.0.1:8000/connect/match_finalized/', {headers, })
    .then(res => res.json())
    .then((data) => {
        this.setState({ matched: data }, () => {
          //console.log(this.state.matched);
        })
    })

    fetch('http://127.0.0.1:8000/connect/match_received/', {headers, })
    .then(res => res.json())
    .then((data) => {
        this.setState({ pending: data }, () => {
          //console.log(this.state.pending);
          this.getID();
        })
    })

    .catch(console.log)
  }

  getID() {
    const headers = {"Content-Type": "application/json"};

    if (localStorage.getItem('auth-token')) {
      headers["Authorization"] = localStorage.getItem('auth-token');
    }

    fetch('http://127.0.0.1:8000/connect/get_info/', {headers, })
    .then(res => res.json())
    .then((data) => {
        this.setState({ viewerID: data.id }, () => {
          //console.log(this.state.viewerID);
          this.checkID();
        })
    })
  }

  checkID() {
    this.state.matched.map((matched) => {
      if (matched['id'] === this.state.id)
        this.setState({valid_matched: true}, () => {
          //console.log(this.state.valid_matched)
        })
    })

    this.state.pending.map((pending) => {
      if (pending['id'] === this.state.id)
      this.setState({valid_pending: true}, () => {
        //console.log(this.state.valid_pending)
      })
    })
  }

  getUserProfile() {
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('auth-token'),
      },
      body: JSON.stringify({
        id: this.state.id
      })
    };

    fetch('http://127.0.0.1:8000/connect/get_info_test/', requestOptions)
    .then(response => response.json())
      .then((data) => {
        this.setState({userInfo: data}, () => {
          //console.log(this.state.userInfo)
        })
      })
    .catch(console.log);

    fetch('http://127.0.0.1:8000/connect/get_pfp/', requestOptions, )
        .then(response => response.json())
        .then((data) => {
          if(data.length > 0) {
            this.setState({ pfp: 
                "http://127.0.0.1:8000/static/" + 
                data.split("/")[2] 
            }, () => {
              //console.log(this.state.pfp);
            });
          } 
        })
  }

  getCourses() {
    var headers = {
      "Content-Type": "application/json",};

  if (localStorage.getItem('auth-token')) {
      headers["Authorization"] = localStorage.getItem('auth-token');
  }

    fetch("http://127.0.0.1:8000/tutoring/get_all_courses/", { headers, })
                    .then(response => response.json())
                    .then((data) => {
                    this.setState({ courses: data }, () => {
                        //console.log(this.state.courses)
                    })
        })
        .catch(console.log)
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log(prevProps);
    //console.log(this.props.userInfo);
    if (prevProps.userInfo !== this.props.userInfo) {
      this.setState({userInfo: this.props.userInfo}, () => console.log("update"))
    }
  }

  ShowProfile = ({ userInfo }) => {
    return (<>
      <div className={styles.profile_wrapper2}>      
        <img src={this.state.pfp} alt="pfp" className={styles.pfp}></img>
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
          {this.state.valid_matched ? 
          <div className={styles.contact_info_wrapper}>
            <div><p className={styles.contact_type}>Email:</p>
            <this.ShowContactInfo contact={userInfo['email']}/></div>

            <div><p className={styles.contact_type}>Phone:</p>
            <this.ShowContactInfo contact={userInfo['phone']}/></div>

            <div><p className={styles.contact_type}>Discord:</p>
            <this.ShowContactInfo contact={userInfo['discord']}/></div>

            <div><p className={styles.contact_type}>Instagram:</p>
            <this.ShowContactInfo contact={userInfo['ig']}/></div>
          </div> : 
          <></>}
        </div>
      </div>
    </>);
  } 

  ShowContactInfo = (contact) => {
    return (<>
        <p className={styles.contact_info}>{contact['contact']}</p></>)
  }

  ShowCourses = () => {
    this.getCourses();
      return (<>
          <div className={styles.module}>
              <p className={styles.module_title}>Courses</p>
              <div className={styles.module_grid}>
                  {this.state.courses?.current_courses?.map((course) => (
                      <div className={styles.module_item } style={{backgroundColor: "var(--color-accent)"}}>
                          <p className={styles.module_text} style={{fontWeight: "800"}}>
                          {course.course_dept} {course.course_num}</p>
                      </div>
                  ))}
                  {this.state.courses?.tutoring_courses?.map((course) => (
                      <div className={styles.module_item} style={{backgroundColor: "var(--color-secondary)"}}>
                          <p className={styles.module_text} style={{fontWeight: "800"}}>
                          {course.course_dept} {course.course_num}</p>
                      </div>
                  ))}
                  {this.state.courses?.past_courses?.map((course) => (
                      <div className={styles.module_item} style={{opacity: 0.5}}>
                          <p className={styles.module_text} style={{fontWeight: "800"}}>
                          {course.course_dept} {course.course_num}</p>
                      </div>
                  ))}
              </div>
          </div>
      </>);
  }

  ShowInterests = ({ userInfo }) => {
    return (<>
        <div className={styles.module}>
            <p className={styles.module_title}>Interests</p>
            <div className={styles.module_grid}>
                <div className={styles.module_item} style={{backgroundColor: "var(--color-primary)"}}>
                    <p className={styles.module_text}>{userInfo['user_interest1']}</p>
                </div>
                <div className={styles.module_item } style={{backgroundColor: "var(--color-primary)"}}>
                    <p className={styles.module_text}>{userInfo['user_interest2']}</p>
                </div>
                <div className={styles.module_item} style={{backgroundColor: "var(--color-primary)"}}>
                    <p className={styles.module_text}>{userInfo['user_interest3']}</p>
                </div>
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
 
        <div className={styles.modules_wrapper}>
          {this.state.valid_matched || this.state.valid_pending ? <>
          <this.ShowCourses />
          <this.ShowInterests userInfo={this.state.userInfo} /> </> : <></>}
        </div>

      </div>
    </>);
  }
}

export default withRouter(OtherProfile);