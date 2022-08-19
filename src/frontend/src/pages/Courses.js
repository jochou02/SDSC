import React, { Component } from 'react';
// eslint-disable-next-line
import { useLocation } from 'react-router-dom'

import LoggedInTester from '../buttons/LoggedInTester';

const Course = ({ course_dept, course_num }) => (
    <div>
        <p>{course_dept}</p>
        <p>{course_num}</p>
    </div>
);



class Courses extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            foo: [],
        };

        this.GetCourses = this.GetCourses.bind(this);
    }

    componentDidMount() {
        const headers = {"Content-Type": "application/json"};

        console.log('test')
    
        fetch("http://127.0.0.1:8000/tutoring/get_courses_sample/", { headers, })
                    .then(response => response.json())
                    .then((data) => {
                    this.setState({ foo: data })
        })
    }

    GetCourses = ({ foo }) => {
        return (
            <>
                ID: {foo[1]['course_dept']} <br />
                Name: {foo[1]['course_num']} <br />
            </>
        );
    }

    render() {
        console.log('test')
        return (
            <div>
                <p>test</p>
                <this.GetCourses foo={this.state.foo} />
            </div>
        );
    }


  }

  export default Courses

