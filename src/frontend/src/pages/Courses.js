import React, { Component } from 'react';
// eslint-disable-next-line
import { useLocation } from 'react-router-dom'

import LoggedInTester from '../buttons/LoggedInTester';

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

        fetch("http://127.0.0.1:8000/tutoring/find_tutor/BENG/128A", { headers, })
                    .then(response => response.json())
                    .then((data) => {
                    this.setState({ foo: data })
        })
        .catch(console.log)
    }

    render() {
        return (
            <>
            {   
                !localStorage.getItem('auth-token') ? <></> : <>
                    <h1>Current Courses</h1>
                    {this.state.foo?.current_courses?.map((course) => (
                        <Course
                            course_dept={course.course_dept}
                            course_num={course.course_num}
                        />
                    ))}
                    <h1>Past Courses</h1>
                    {this.state.foo?.past_courses?.map((course) => (
                        <Course
                            course_dept={course.course_dept}
                            course_num={course.course_num}
                        />
                    ))}
                    <h1>Tutoring Courses</h1>
                    {this.state.foo?.tutoring_courses?.map((course) => (
                        <Course
                            course_dept={course.course_dept}
                            course_num={course.course_num}
                        />
                    ))}
                </>
            }
            </>
        );
    }


  }

  export default Courses

