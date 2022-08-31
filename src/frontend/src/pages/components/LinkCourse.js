import React, { Component } from 'react'
import styles from '../../styles/LinkProfile.module.css'
import { Link } from 'react-router-dom'

class LinkCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course_dept: '',
      course_num: '',
    };
  }

  render() {
    return (<>
      <Link to={`/reviews/${this.props.course_dept}/${this.props.course_num}`} style={{textDecoration: "none"}}>
      </Link>
     </>);
  }
}

export default LinkCourse