import React, { Component } from 'react';
//import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';

import LoggedInTester from '../buttons/LoggedInTester'
//import Karma from '../pages/Karma'
import LinkCourse from './components/LinkCourse';
import styles from '../styles/Profile.module.css'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            foo: [], 
            pfp: '', 
            courses: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        var headers = {
            "Content-Type": "application/json",};

        if (localStorage.getItem('auth-token')) {
            headers["Authorization"] = localStorage.getItem('auth-token');
        }

        fetch('http://127.0.0.1:8000/connect/get_info/', { headers, })
            .then(response => response.json())
            .then((data) => {
                this.setState({ foo: data });
                console.log();
            })

        fetch('http://127.0.0.1:8000/connect/get_pfp/', {headers}, )
        .then(response => response.json())
        .then((data) => {
            this.setState({ pfp: 
                "http://127.0.0.1:8000/static/" + 
                data.split("/")[2] 
            }, () => console.log(this.state.pfp));
        })

        fetch("http://127.0.0.1:8000/tutoring/get_all_courses/", { headers, })
                    .then(response => response.json())
                    .then((data) => {
                    this.setState({ courses: data }, () => {
                        //console.log(this.state.courses)
                    })
        })
        .catch(console.log)
    }

    handleSubmit(event) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                       'Authorization': localStorage.getItem('auth-token'), },
            body: JSON.stringify({})
        };

        fetch('http://127.0.0.1:8000/account/delete_user/', requestOptions)
        .then(response => response.json())
              .then((data) => {
                this.setState({ token: data['token'] }, () => {
                    window.location.href = 'http://localhost:3000/login';
              })
        })
        .catch(console.log)

        // User should not be logged in account that's no longer exists
        localStorage.removeItem('auth-token')

        event.preventDefault();
    }
    
    //ノート: Change phone number to display in ###-###-#### format
    ShowProfile = ({ foo }) => {
        return (<>
            <div className={styles.profile_wrapper2}>     
                <img src={this.state.pfp} alt="pfp" className={styles.pfp}></img>
                <div className={styles.profile_info_wrapper}>
                    <p>ID: {foo['id']}</p>
                    <p className={styles.name}>
                        {foo['first_name']}
                        {' '}
                        {foo['last_name']}
                    </p>
                    <p>College: {foo['user_college']}</p>
                    <p>Major: {foo['user_major']}</p>
                    <p>Karma: {foo['user_karma']}</p>
                    <hr className={styles.solid}></hr>
                    <div className={styles.contact_info_wrapper}>
                        <div><p className={styles.contact_type}>Email:</p>
                        <this.ShowContactInfo contact={foo['email']}/></div>

                        <div><p className={styles.contact_type}>Phone:</p>
                        <this.ShowContactInfo contact={foo['phone']}/></div>

                        <div><p className={styles.contact_type}>Discord:</p>
                        <this.ShowContactInfo contact={foo['discord']}/></div>

                        <div><p className={styles.contact_type}>Instagram:</p>
                        <this.ShowContactInfo contact={foo['ig']}/></div>
                    </div>
                </div>
            </div>
        </>);
    } 

    ShowContactInfo = (contact) => {
        return (<>
            <p className={styles.contact_info}>{contact['contact']}</p></>)
    }
    
    ShowCourses = () => {
        return (<>
            <div className={styles.module}>
                <p className={styles.module_title}>Courses</p>
                <div className={styles.module_grid}>
                    {this.state.courses?.current_courses?.map((course) => (
                        <div className={styles.module_item } style={{backgroundColor: "var(--color-accent)"}}>
                        <Link to={`/reviews/${course.course_dept}/${course.course_num}`} className={styles.courseLink}>
                            <p className={styles.module_text} style={{fontWeight: "800"}}>
                                {course.course_dept} {course.course_num}
                            </p>
                        </Link>
                        </div>
                    ))}
                    {this.state.courses?.tutoring_courses?.map((course) => (
                        <div className={styles.module_item} style={{backgroundColor: "var(--color-secondary)"}}>
                        <Link to={`/reviews/${course.course_dept}/${course.course_num}`} className={styles.courseLink}>
                            <p className={styles.module_text} style={{fontWeight: "800"}}>
                                {course.course_dept} {course.course_num}
                            </p>
                        </Link>
                        </div>
                    ))}
                    {this.state.courses?.past_courses?.map((course) => (
                        <div className={styles.module_item} style={{opacity: 0.5}}>
                        <Link to={`/reviews/${course.course_dept}/${course.course_num}`} className={styles.courseLink}>
                            <p className={styles.module_text} style={{fontWeight: "800"}}>
                                {course.course_dept} {course.course_num}
                            </p>
                        </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>);
    }

    ShowInterests = ({ foo }) => {
        return (<>
            <div className={styles.module}>
                <p className={styles.module_title}>Interests</p>
                <div className={styles.module_grid}>
                    <div className={styles.module_item} style={{backgroundColor: "var(--color-primary)"}}>
                        <p className={styles.module_text}>{foo['user_interest1']}</p>
                    </div>
                    <div className={styles.module_item } style={{backgroundColor: "var(--color-primary)"}}>
                        <p className={styles.module_text}>{foo['user_interest2']}</p>
                    </div>
                    <div className={styles.module_item} style={{backgroundColor: "var(--color-primary)"}}>
                        <p className={styles.module_text}>{foo['user_interest3']}</p>
                    </div>
                </div>
            </div>
        </>);
    }
    
    render() {
      return (
        <>
        <div className={styles.componentWrapper}>
            <LoggedInTester />
            {/* Sufficient to get whatever info we need from user */}
            { localStorage.getItem('auth-token') }
        </div>

        <div className={styles.wrapper}>
            {/* Example of showing user's information */}
            <div className={styles.profile_wrapper}>
                <this.ShowProfile foo={this.state.foo} />

                <Link to="/user_prefs" state={{ from: "occupation" }}
                className={styles.link}>
                Edit Profile
                </Link>

                {/* Delete user. Only show when user is logged in */}
                { localStorage.getItem('auth-token') ?
                <form onSubmit={this.handleSubmit}>
                    <input type="submit" value="Delete My Account" className={styles.button}/>
                </form> : <>
                </>}
            </div>

            <div className={styles.modules_wrapper}>
                <this.ShowCourses />
                <this.ShowInterests foo={this.state.foo} />
            </div>
        </div>
        </>
      );
    }
  }

  export default Profile