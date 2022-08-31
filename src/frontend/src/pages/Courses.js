import React, { Component } from 'react';
import Navbar from "./Navbar"

//import { useLocation } from 'react-router-dom'

//import LoggedInTester from '../buttons/LoggedInTester';

import '../styles/courses.css';

const Course = ({ course_dept, course_num }) => (
    <div>
        <p>{course_dept} {course_num}</p>
    </div>
);

class Courses extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            foo: [{}],
        };
    }

    componentDidMount() {
        const headers = {"Content-Type": "application/json"};
    
        if (localStorage.getItem('auth-token')) {
            headers["Authorization"] = localStorage.getItem('auth-token');
        }

        fetch("http://127.0.0.1:8000/tutoring/get_all_courses/", { headers, })
                    .then(response => response.json())
                    .then((data) => {
                    this.setState({ foo: data })
        })
        .catch(console.log)
    }

    render() {
        return (
            <>
            <Navbar />
            {   
                !localStorage.getItem('auth-token') ? <></> : <>
                    <h1>Current Courses</h1>
                    <table class="table table-bordered">
                        <tbody>
                            {this.state.foo?.current_courses?.map((course) => (
                                <tr>
                                    <td><Course
                                        course_dept={course.course_dept}
                                        course_num={course.course_num}
                                    /></td>
                                    <td><a>Test1</a></td>
                                    <td>Test</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h1>Past Courses</h1>
                    <table class="table table-hover">
                        <tbody>
                            {this.state.foo?.past_courses?.map((course) => (
                                <tr>
                                    <td><Course
                                        course_dept={course.course_dept}
                                        course_num={course.course_num}
                                    /></td>
                                    <td>Test</td>
                                    <td>Test</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h1>Tutoring Courses</h1>
                    <table class="table table-hover">
                        <tbody>
                            {this.state.foo?.tutoring_courses?.map((course) => (
                                <tr>
                                    <td><Course
                                        course_dept={course.course_dept}
                                        course_num={course.course_num}
                                    /></td>
                                    <td>Test</td>
                                    <td>Test</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            }
            </>
        );
    }


  }

  export default Courses

